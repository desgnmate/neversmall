"use client";

import { useState, useEffect } from "react";
import { useCMS } from "./CMSProvider";
import type { ContactSettings } from "../../lib/supabase";

export default function CMSContactTab() {
    const { contactSettings, saveContactSettings } = useCMS();
    const [form, setForm] = useState<Partial<ContactSettings>>({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (contactSettings) setForm({ ...contactSettings });
    }, [contactSettings]);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            await saveContactSettings(form);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof ContactSettings, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="cms-tab-form">
            <div className="cms-tab-form__header">
                <h3>Contact Details</h3>
            </div>

            <label className="cms-form-label">Phone Number</label>
            <input className="cms-input" value={form.phone ?? ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="0432 300 709" />

            <label className="cms-form-label">Email</label>
            <input className="cms-input" value={form.email ?? ""} onChange={(e) => updateField("email", e.target.value)} placeholder="hello@neversmall.studio" />

            <label className="cms-form-label">Location</label>
            <input className="cms-input" value={form.location ?? ""} onChange={(e) => updateField("location", e.target.value)} placeholder="Melbourne, VIC" />

            <div className="cms-form-divider" />

            <label className="cms-form-label">Instagram URL</label>
            <input className="cms-input" value={form.instagram_url ?? ""} onChange={(e) => updateField("instagram_url", e.target.value)} placeholder="https://instagram.com/..." />

            <label className="cms-form-label">TikTok URL</label>
            <input className="cms-input" value={form.tiktok_url ?? ""} onChange={(e) => updateField("tiktok_url", e.target.value)} placeholder="https://tiktok.com/..." />

            <label className="cms-form-label">LinkedIn URL</label>
            <input className="cms-input" value={form.linkedin_url ?? ""} onChange={(e) => updateField("linkedin_url", e.target.value)} placeholder="https://linkedin.com/..." />

            <div className="cms-form-divider" />

            <label className="cms-form-label">Contact Page Button Text</label>
            <input className="cms-input" value={form.cta_text ?? ""} onChange={(e) => updateField("cta_text", e.target.value)} placeholder="START A PROJECT" />

            <label className="cms-form-label">Contact Page Button Link</label>
            <input className="cms-input" value={form.cta_link ?? ""} onChange={(e) => updateField("cta_link", e.target.value)} placeholder="/contact" />

            <div className="cms-tab-form__actions">
                <button className="cms-btn cms-btn--primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
