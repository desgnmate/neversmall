"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import {
    supabase,
    verifyPin,
    changePin as changePinApi,
    invalidateCache,
    fetchProjects,
    fetchServices,
    fetchTestimonials,
    fetchContactSettings,
    uploadImage,
    setSupabaseToken,
    type Project,
    type Service,
    type Testimonial,
    type ContactSettings,
} from "../../lib/supabase";

// ── Context Types ──
interface CMSContextType {
    // Auth state
    isAuthenticated: boolean;
    isCMSOpen: boolean;
    isCMSMinimized: boolean;
    isPinModalOpen: boolean;
    openPinModal: () => void;
    closePinModal: () => void;
    minimizeCMS: () => void;
    reopenCMS: () => void;
    authenticate: (pin: string) => Promise<{ valid: boolean; error?: string; locked?: boolean; attemptsRemaining?: number }>;
    logout: () => void;
    changePin: (currentPin: string, newPin: string) => Promise<{ success?: boolean; error?: string }>;

    // Data
    projects: Project[];
    services: Service[];
    testimonials: Testimonial[];
    contactSettings: ContactSettings | null;
    isLoading: boolean;
    notification: { message: string; type: "success" | "error" } | null;
    confirmDialog: { message: string; onConfirm: () => void; onCancel: () => void } | null;
    showConfirm: (message: string, onConfirm: () => void) => void;

    // CRUD
    refreshData: (table?: string) => Promise<void>;
    saveProject: (project: Partial<Project> & { id?: string }) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    reorderProjects: (ids: string[]) => Promise<void>;
    saveService: (service: Partial<Service> & { id?: string }) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
    reorderServices: (ids: string[]) => Promise<void>;
    saveTestimonial: (testimonial: Partial<Testimonial> & { id?: string }) => Promise<void>;
    deleteTestimonial: (id: string) => Promise<void>;
    reorderTestimonials: (ids: string[]) => Promise<void>;
    saveContactSettings: (settings: Partial<ContactSettings>) => Promise<void>;
    uploadImageFile: (file: File, folder: string) => Promise<string>;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function useCMS() {
    const ctx = useContext(CMSContext);
    if (!ctx) throw new Error("useCMS must be used within CMSProvider");
    return ctx;
}

// ── Provider ──
export default function CMSProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCMSOpen, setIsCMSOpen] = useState(false);
    const [isCMSMinimized, setIsCMSMinimized] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void; onCancel: () => void } | null>(null);
    const sessionTokenRef = useRef<string | null>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Check session on mount
    // Handled in combined useEffect below.

    // Scroll Lock
    useEffect(() => {
        const lock = isAuthenticated && isCMSOpen && !isCMSMinimized;
        const body = document.body;
        const html = document.documentElement;

        if (lock) {
            const scrollY = window.scrollY;
            body.dataset.scrollY = scrollY.toString();
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
            body.style.overflowY = 'hidden';
            html.classList.add('hide-main-scrollbar');
            html.style.scrollBehavior = 'auto'; // Prevent smooth scroll on unlock jump
            window.dispatchEvent(new CustomEvent('cms:scroll-lock', { detail: { lock: true } }));
        } else {
            const scrollY = body.dataset.scrollY;
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflowY = '';
            html.classList.remove('hide-main-scrollbar');
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0'));
            }
            html.style.scrollBehavior = '';
            window.dispatchEvent(new CustomEvent('cms:scroll-lock', { detail: { lock: false } }));
        }

        return () => {
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflowY = '';
            html.classList.remove('hide-main-scrollbar');
            window.dispatchEvent(new CustomEvent('cms:scroll-lock', { detail: { lock: false } }));
        };
    }, [isAuthenticated, isCMSOpen, isCMSMinimized]);

    // Notification helper
    const showNotification = useCallback((message: string, type: "success" | "error" = "success") => {
        setNotification({ message, type });
        if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = setTimeout(() => {
            setNotification(null);
        }, 3000);
    }, []);

    const showConfirm = useCallback((message: string, onConfirm: () => void) => {
        setConfirmDialog({
            message,
            onConfirm: () => {
                onConfirm();
                setConfirmDialog(null);
            },
            onCancel: () => setConfirmDialog(null)
        });
    }, []);

    // Idle Auto Logout (5 minutes)
    useEffect(() => {
        if (!isAuthenticated) return;

        const logoutCallback = () => {
            console.log("CMS: Idle for 5 minutes, auto-logging out.");
            logout();
        };

        const resetIdleTimer = () => {
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(logoutCallback, 5 * 60 * 1000);
        };

        resetIdleTimer();

        const activityEvents = ["mousemove", "keydown", "touchstart", "click", "scroll"];
        activityEvents.forEach((event) => window.addEventListener(event, resetIdleTimer));

        return () => {
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
            activityEvents.forEach((event) => window.removeEventListener(event, resetIdleTimer));
        };
    }, [isAuthenticated]);

    // Initial Mount Load (Consolidated)
    useEffect(() => {
        const initCMS = async () => {
            const storedToken = sessionStorage.getItem("cms_token");
            if (storedToken) {
                // If we have a token (JWT or hex), attempt to restore session
                console.log("CMS v2.2: Attempting to restore session from storage...");
                sessionTokenRef.current = storedToken;
                setSupabaseToken(storedToken);
                setIsAuthenticated(true);
                setIsCMSOpen(true);
                setIsCMSMinimized(true);

                try {
                    await refreshData();
                } catch (err: any) {
                    console.error("CMS v2.2: Session recovery failed. Resetting auth state.", err);
                    // Explicitly reset everything to null/false so fallback fetch doesn't inherit the bad token
                    sessionTokenRef.current = null;
                    setSupabaseToken(null);
                    sessionStorage.removeItem("cms_token");
                    setIsAuthenticated(false);
                    await loadAllData();
                }
            } else {
                await loadAllData();
            }
        };
        initCMS();
    }, []);

    const loadAllData = useCallback(async () => {
        setIsLoading(true);
        // Safety: Ensure no token is attached for the public-facing fetch call
        setSupabaseToken(null);
        try {
            const [p, s, t, c] = await Promise.all([
                fetchProjects(true),    // Bypass cache for CMS accuracy
                fetchServices(true),    // Bypass cache for CMS accuracy
                fetchTestimonials(true), // Bypass cache for CMS accuracy
                fetchContactSettings(true), // Bypass cache for CMS accuracy
            ]);
            setProjects(p);
            setServices(s);
            setTestimonials(t);
            setContactSettings(c);
        } catch (err: any) {
            const message = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
            console.error(`CMS v2.2: Failed to load public data: ${message}`, err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshData = useCallback(async (table?: string) => {
        try {
            const promises: Promise<void>[] = [];
            if (!table || table === "projects") {
                promises.push((async () => {
                    const data = await fetchProjects(true);
                    setProjects(data);
                    invalidateCache("projects");
                })());
            }
            if (!table || table === "services") {
                promises.push((async () => {
                    const data = await fetchServices(true);
                    setServices(data);
                    invalidateCache("services");
                })());
            }
            if (!table || table === "testimonials") {
                promises.push((async () => {
                    const data = await fetchTestimonials(true);
                    setTestimonials(data);
                    invalidateCache("testimonials");
                })());
            }
            if (!table || table === "contact_settings") {
                promises.push((async () => {
                    const data = await fetchContactSettings(true);
                    setContactSettings(data);
                    invalidateCache("contact_settings");
                })());
            }
            await Promise.all(promises);
        } catch (err: any) {
            const message = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
            console.error(`CMS v2.2: Refresh failed: ${message}`, err);
            throw err; // rethrow so initCMS can fallback
        }
    }, []);

    // ── Auth ──
    const openPinModal = useCallback(() => setIsPinModalOpen(true), []);
    const closePinModal = useCallback(() => setIsPinModalOpen(false), []);
    const minimizeCMS = useCallback(() => setIsCMSMinimized(true), []);
    const reopenCMS = useCallback(() => setIsCMSMinimized(false), []);

    const authenticate = useCallback(async (pin: string) => {
        const result = await verifyPin(pin);
        if (result.valid && result.token) {
            sessionTokenRef.current = result.token;
            setSupabaseToken(result.token);
            sessionStorage.setItem("cms_token", result.token);
            setIsAuthenticated(true);
            setIsPinModalOpen(false);
            setIsCMSOpen(true);
            setIsCMSMinimized(false);
            // Refresh data on login to get latest
            refreshData();
        }
        return result;
    }, [refreshData]);

    const logout = useCallback(() => {
        sessionTokenRef.current = null;
        setSupabaseToken(null);
        sessionStorage.removeItem("cms_token");
        setIsAuthenticated(false);
        setIsCMSOpen(false);
        setIsCMSMinimized(false);
    }, []);

    const changePinHandler = useCallback(async (currentPin: string, newPin: string) => {
        return changePinApi(currentPin, newPin);
    }, []);

    // ── Projects CRUD (optimistic) ──
    const saveProject = useCallback(async (project: Partial<Project> & { id?: string }) => {
        try {
            if (project.id) {
                // Optimistic update
                setProjects(prev => prev.map(p => p.id === project.id ? { ...p, ...project } as Project : p));

                const { id: _, created_at, updated_at, ...updateData } = project as any;
                const { data, error } = await supabase.from("projects").update(updateData).eq("id", project.id).select().single();

                if (error) {
                    await refreshData("projects");
                    throw error;
                }

                if (data) setProjects(prev => prev.map(p => p.id === project.id ? data : p));
                showNotification("Project updated successfully");
            } else {
                const sortOrder = projects.length;
                const { data, error } = await supabase.from("projects").insert({ ...project, sort_order: sortOrder }).select().single();
                if (error) throw error;
                if (data) setProjects(prev => [...prev, data]);
                showNotification("Project created successfully");
            }
            invalidateCache("projects");
        } catch (err: any) {
            console.error("CMS Save Project Error:", err);
            showNotification(err?.message || "Failed to save project", "error");
            throw err;
        }
    }, [projects.length, refreshData, showNotification]);

    const deleteProject = useCallback(async (id: string) => {
        try {
            setProjects(prev => prev.filter(p => p.id !== id));
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) { await refreshData("projects"); throw error; }
            invalidateCache("projects");
            showNotification("Project deleted successfully");
        } catch (err: any) {
            showNotification(err?.message || "Delete failed", "error");
            await refreshData("projects");
        }
    }, [refreshData, showNotification]);

    const reorderProjects = useCallback(async (ids: string[]) => {
        try {
            // Optimistic reorder
            const reordered = ids.map((id, idx) => {
                const p = projects.find(proj => proj.id === id);
                return p ? { ...p, sort_order: idx } : null;
            }).filter(Boolean) as Project[];
            setProjects(reordered);

            // Batch update
            const updates = ids.map((id, idx) => supabase.from("projects").update({ sort_order: idx }).eq("id", id));
            const results = await Promise.all(updates);
            const error = results.find(r => r.error)?.error;
            if (error) throw error;

            invalidateCache("projects");
            showNotification("Order updated");
        } catch (err: any) {
            console.error("Reorder projects failed:", err);
            showNotification(err?.message || "Reorder failed", "error");
            await refreshData("projects");
        }
    }, [projects, showNotification, refreshData]);

    // ── Services CRUD (optimistic) ──
    const saveService = useCallback(async (service: Partial<Service> & { id?: string }) => {
        try {
            if (service.id) {
                setServices(prev => prev.map(s => s.id === service.id ? { ...s, ...service } as Service : s));
                const { id: _, created_at, updated_at, ...updateData } = service as any;
                const { data, error } = await supabase.from("services").update(updateData).eq("id", service.id).select().single();
                if (error) { await refreshData("services"); throw error; }
                if (data) setServices(prev => prev.map(s => s.id === service.id ? data : s));
                showNotification("Service updated successfully");
            } else {
                const sortOrder = services.length;
                const { data, error } = await supabase.from("services").insert({ ...service, sort_order: sortOrder }).select().single();
                if (error) throw error;
                if (data) setServices(prev => [...prev, data]);
                showNotification("Service created successfully");
            }
            invalidateCache("services");
        } catch (err: any) {
            console.error("CMS save service error:", err);
            showNotification(err?.message || "Failed to save service", "error");
        }
    }, [services.length, refreshData, showNotification]);

    const deleteService = useCallback(async (id: string) => {
        try {
            setServices(prev => prev.filter(s => s.id !== id));
            const { error } = await supabase.from("services").delete().eq("id", id);
            if (error) { await refreshData("services"); throw error; }
            invalidateCache("services");
            showNotification("Service deleted successfully");
        } catch (err: any) {
            showNotification(err?.message || "Delete failed", "error");
            await refreshData("services");
        }
    }, [refreshData, showNotification]);

    const reorderServices = useCallback(async (ids: string[]) => {
        try {
            const reordered = ids.map((id, idx) => {
                const s = services.find(srv => srv.id === id);
                return s ? { ...s, sort_order: idx } : null;
            }).filter(Boolean) as Service[];
            setServices(reordered);
            const updates = ids.map((id, idx) => supabase.from("services").update({ sort_order: idx }).eq("id", id));
            const results = await Promise.all(updates);
            if (results.some(r => r.error)) throw new Error("Some updates failed");
            invalidateCache("services");
            showNotification("Order updated");
        } catch (err: any) {
            showNotification(err?.message || "Reorder failed", "error");
            await refreshData("services");
        }
    }, [services, showNotification, refreshData]);

    // ── Testimonials CRUD (optimistic) ──
    const saveTestimonial = useCallback(async (testimonial: Partial<Testimonial> & { id?: string }) => {
        try {
            if (testimonial.id) {
                setTestimonials(prev => prev.map(t => t.id === testimonial.id ? { ...t, ...testimonial } as Testimonial : t));
                const { id: _, created_at, updated_at, ...updateData } = testimonial as any;
                const { data, error } = await supabase.from("testimonials").update(updateData).eq("id", testimonial.id).select();
                if (error) { await refreshData("testimonials"); throw error; }
                if (!data || data.length === 0) throw new Error("No rows updated. Check RLS.");
                showNotification("Testimonial updated");
            } else {
                const sortOrder = testimonials.length;
                const { data, error } = await supabase.from("testimonials").insert({ ...testimonial, sort_order: sortOrder }).select().single();
                if (error) throw error;
                if (data) setTestimonials(prev => [...prev, data]);
                showNotification("Testimonial created");
            }
            invalidateCache("testimonials");
        } catch (err: any) {
            showNotification(err?.message || "Failed to save testimonial", "error");
        }
    }, [testimonials.length, refreshData, showNotification]);

    const deleteTestimonial = useCallback(async (id: string) => {
        setTestimonials(prev => prev.filter(t => t.id !== id));
        const { error } = await supabase.from("testimonials").delete().eq("id", id);
        if (error) { await refreshData("testimonials"); throw error; }
        invalidateCache("testimonials");
    }, [refreshData]);

    const reorderTestimonials = useCallback(async (ids: string[]) => {
        try {
            const reordered = ids.map((id, idx) => {
                const t = testimonials.find(test => test.id === id);
                return t ? { ...t, sort_order: idx } : null;
            }).filter(Boolean) as Testimonial[];
            setTestimonials(reordered);
            const updates = ids.map((id, idx) => supabase.from("testimonials").update({ sort_order: idx }).eq("id", id));
            const results = await Promise.all(updates);
            if (results.some(r => r.error)) throw new Error("Some updates failed");
            invalidateCache("testimonials");
            showNotification("Order updated");
        } catch (err: any) {
            showNotification(err?.message || "Reorder failed", "error");
            await refreshData("testimonials");
        }
    }, [testimonials, showNotification, refreshData]);

    // ── Contact Settings ──
    const saveContactSettings = useCallback(async (settings: Partial<ContactSettings>) => {
        try {
            if (contactSettings?.id) {
                setContactSettings(prev => prev ? { ...prev, ...settings } as ContactSettings : prev);
                const { id: _, updated_at, ...updateData } = settings as any;
                const { data, error } = await supabase.from("contact_settings").update(updateData).eq("id", contactSettings.id).select();
                if (error) { await refreshData("contact_settings"); throw error; }
                if (!data || data.length === 0) throw new Error("No updates made. Check RLS.");
                invalidateCache("contact_settings");
                showNotification("Contact settings saved");
            }
        } catch (err: any) {
            showNotification(err?.message || "Failed to save settings", "error");
        }
    }, [contactSettings?.id, refreshData, showNotification]);

    // ── Image Upload ──
    const uploadImageFile = useCallback(async (file: File, folder: string) => {
        return uploadImage(file, folder);
    }, []);

    return (
        <CMSContext.Provider
            value={{
                isAuthenticated, isCMSOpen, isCMSMinimized, isPinModalOpen,
                openPinModal, closePinModal, minimizeCMS, reopenCMS, authenticate, logout,
                changePin: changePinHandler,
                projects, services, testimonials, contactSettings, isLoading, notification,
                confirmDialog, showConfirm,
                refreshData,
                saveProject, deleteProject, reorderProjects,
                saveService, deleteService, reorderServices,
                saveTestimonial, deleteTestimonial, reorderTestimonials,
                saveContactSettings, uploadImageFile,
            }}
        >
            {children}
        </CMSContext.Provider>
    );
}
