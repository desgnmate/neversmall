import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production') {
        console.warn("⚠️ [Supabase] Missing environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel settings.");
    }
}

let sessionToken: string | null = null;
export function setSupabaseToken(token: string | null) {
    sessionToken = token;
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder',
    {
        global: {
            fetch: (url, options) => {
                const h = new Headers(options?.headers);

                // Aggressive Cache-Control to ensure persistence across refreshes
                h.set('Cache-Control', 'no-cache, no-store, must-revalidate');
                h.set('Pragma', 'no-cache');
                h.set('Expires', '0');

                // Supabase PostgREST only accepts 3-part JWTs.
                // Our PIN system returns hex tokens which 401 if sent as 'Bearer'.
                // Verified via DB login records in RLS instead.
                if (sessionToken && sessionToken.split('.').length === 3) {
                    h.set('Authorization', `Bearer ${sessionToken}`);
                }

                // Convert to object for fetch compatibility
                const headers: Record<string, string> = {};
                h.forEach((v, k) => { headers[k] = v; });

                return fetch(url, {
                    ...options,
                    headers,
                    cache: 'no-store'
                });
            }
        }
    });

// ── Types ──
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    slug: string;
    gallery: string[];
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    image: string;
    href: string;
    slug?: string;
    content?: string;
    page_headline?: string;
    page_subheadline?: string;
    page_overview_title?: string;
    page_overview_content?: string;
    page_deliverables?: any[];
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    image: string;
    headline: string;
    body: string;
    name: string;
    role: string;
    rating: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ContactSettings {
    id: string;
    phone: string;
    email: string;
    location: string;
    instagram_url: string;
    tiktok_url: string;
    linkedin_url: string;
    cta_text: string;
    cta_link: string;
    updated_at: string;
}

// ── Data Cache ──
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    etag?: string;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL) {
        cache.delete(key);
        return null;
    }
    return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() });
}

export function invalidateCache(key?: string): void {
    if (key) {
        cache.delete(key);
    } else {
        cache.clear();
    }
}

// ── Data Fetchers with Cache ──
export async function fetchProjects(bypassCache = false): Promise<Project[]> {
    try {
        if (!bypassCache) {
            const cached = getCached<Project[]>('projects');
            if (cached) return cached;
        }
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) {
            console.error("Error fetching projects:", error);
            return [];
        }
        const result = data ?? [];
        setCache('projects', result);
        return result;
    } catch (e) {
        console.error("Fetch Exception (projects):", e);
        return [];
    }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .maybeSingle();
        if (error) {
            console.error('fetchProjectBySlug error:', error);
            return null;
        }
        return data as Project;
    } catch (e) {
        console.error(`Fetch Exception (project slug ${slug}):`, e);
        return null;
    }
}

export async function fetchServices(bypassCache = false): Promise<Service[]> {
    try {
        if (!bypassCache) {
            const cached = getCached<Service[]>('services');
            if (cached) return cached;
        }
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) {
            console.error("Error fetching services:", error);
            return [];
        }
        const result = data ?? [];
        setCache('services', result);
        return result;
    } catch (e) {
        console.error("Fetch Exception (services):", e);
        return [];
    }
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
    // Try slug column first, then fuzzy match on name or href
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .or(`slug.eq.${slug},name.ilike.%${slug}%,href.ilike.%${slug}%`)
        .order('sort_order', { ascending: true })
        .limit(1)
        .maybeSingle();
    if (error) {
        console.error('fetchServiceBySlug error:', error);
        return null;
    }
    return data as Service;
}

export async function fetchTestimonials(bypassCache = false): Promise<Testimonial[]> {
    try {
        if (!bypassCache) {
            const cached = getCached<Testimonial[]>('testimonials');
            if (cached) return cached;
        }
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) {
            console.error("Error fetching testimonials:", error);
            return [];
        }
        const result = data ?? [];
        setCache('testimonials', result);
        return result;
    } catch (e) {
        console.error("Fetch Exception (testimonials):", e);
        return [];
    }
}

export async function fetchContactSettings(bypassCache = false): Promise<ContactSettings | null> {
    try {
        if (!bypassCache) {
            const cached = getCached<ContactSettings>('contact_settings');
            if (cached) return cached;
        }
        const { data, error } = await supabase
            .from('contact_settings')
            .select('*')
            .limit(1)
            .maybeSingle();
        if (error) {
            console.error("Error fetching contact settings:", error);
            return null;
        }
        if (data) setCache('contact_settings', data);
        return data;
    } catch (e) {
        console.error("Fetch Exception (contact_settings):", e);
        return null;
    }
}

// ── Image Upload ──
export async function uploadImage(file: File, folder: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage
        .from('cms-uploads')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage
        .from('cms-uploads')
        .getPublicUrl(fileName);

    return urlData.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
    // Extract file path from URL
    const match = url.match(/cms-uploads\/(.+)$/);
    if (!match) return;
    await supabase.storage.from('cms-uploads').remove([match[1]]);
}

// ── PIN Auth ──
export async function verifyPin(pin: string): Promise<{ valid: boolean; token?: string; error?: string; locked?: boolean; attemptsRemaining?: number }> {
    const res = await fetch(
        `${supabaseUrl}/functions/v1/verify-pin`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': supabaseAnonKey },
            body: JSON.stringify({ pin }),
        }
    );
    return res.json();
}

export async function changePin(currentPin: string, newPin: string): Promise<{ success?: boolean; error?: string }> {
    const res = await fetch(
        `${supabaseUrl}/functions/v1/change-pin`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': supabaseAnonKey },
            body: JSON.stringify({ currentPin, newPin }),
        }
    );
    return res.json();
}
