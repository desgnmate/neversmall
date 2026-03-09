"use client";

import { useState } from "react";
import { useCMS } from "./CMSProvider";
import CMSImageUpload from "./CMSImageUpload";
import type { Testimonial } from "../../lib/supabase";

export default function CMSTestimonialsTab() {
    const { testimonials, saveTestimonial, deleteTestimonial, reorderTestimonials, uploadImageFile, showConfirm } = useCMS();
    const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);
    const [dragIdx, setDragIdx] = useState<number | null>(null);

    const handleNew = () => {
        setEditing({ image: "", headline: "", body: "", name: "", role: "", rating: 5 });
        setIsNew(true);
    };

    const handleEdit = (t: Testimonial) => {
        setEditing({ ...t });
        setIsNew(false);
    };

    const handleSave = async () => {
        if (!editing?.name || !editing?.headline) return;
        setSaving(true);
        try {
            await saveTestimonial(editing as Partial<Testimonial> & { id?: string });
            setEditing(null);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id: string) => {
        showConfirm("Delete this testimonial?", () => {
            deleteTestimonial(id);
        });
    };

    const handleDragStart = (idx: number) => setDragIdx(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (dragIdx === null || dragIdx === idx) return;
        const newOrder = [...testimonials];
        const [moved] = newOrder.splice(dragIdx, 1);
        newOrder.splice(idx, 0, moved);
        reorderTestimonials(newOrder.map(t => t.id));
        setDragIdx(idx);
    };
    const handleDragEnd = () => setDragIdx(null);

    const handleImageUpload = async (file: File): Promise<string> => {
        const url = await uploadImageFile(file, "testimonials");
        if (editing) setEditing(prev => prev ? { ...prev, image: url } : prev);
        return url;
    };

    if (editing) {
        return (
            <div className="cms-tab-form">
                <div className="cms-tab-form__header">
                    <h3>{isNew ? "New Testimonial" : "Edit Testimonial"}</h3>
                    <button className="cms-btn cms-btn--ghost" onClick={() => setEditing(null)}>← Back</button>
                </div>

                <CMSImageUpload currentImage={editing.image ?? ""} onUpload={handleImageUpload} label="Avatar" />

                <label className="cms-form-label">Client Name</label>
                <input className="cms-input" value={editing.name ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, name: e.target.value } : prev)} placeholder="JOHN DOE" />

                <label className="cms-form-label">Role / Title</label>
                <input className="cms-input" value={editing.role ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, role: e.target.value } : prev)} placeholder="CEO & Founder" />

                <label className="cms-form-label">Headline</label>
                <input className="cms-input" value={editing.headline ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, headline: e.target.value } : prev)} placeholder="INCREDIBLE ROI AND..." />

                <label className="cms-form-label">Body</label>
                <textarea className="cms-input cms-textarea" value={editing.body ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, body: e.target.value } : prev)} placeholder="Full testimonial text..." rows={3} />

                <label className="cms-form-label">Review Rating</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', width: 'fit-content' }}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => setEditing(prev => prev ? { ...prev, rating: num } : prev)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                color: (editing.rating || 5) >= num ? 'var(--color-yellow)' : 'rgba(255,255,255,0.1)'
                            }}
                            type="button"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </button>
                    ))}
                    <span style={{ marginLeft: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>
                        {editing.rating || 5} Stars
                    </span>
                </div>

                <label className="cms-form-label">Image URL (or upload above)</label>
                <input className="cms-input" value={editing.image ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, image: e.target.value } : prev)} placeholder="/images/testimonial.jpg" />

                <div className="cms-tab-form__actions">
                    <button className="cms-btn cms-btn--primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                    <button className="cms-btn cms-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cms-tab-list">
            <div className="cms-tab-list__header">
                <h3 className="cms-tab-list__title">Testimonials ({testimonials.length})</h3>
                <button className="cms-btn cms-btn--primary" onClick={handleNew}>+ Add</button>
            </div>
            <div className="cms-tab-list__items">
                {testimonials.map((t, idx) => (
                    <div key={t.id} className={`cms-list-item ${dragIdx === idx ? "cms-list-item--dragging" : ""}`} draggable onDragStart={() => handleDragStart(idx)} onDragOver={(e) => handleDragOver(e, idx)} onDragEnd={handleDragEnd}>
                        <div className="cms-list-item__drag">⠿</div>
                        <div className="cms-list-item__thumb cms-list-item__thumb--round">{t.image && <img src={t.image} alt="" />}</div>
                        <div className="cms-list-item__info">
                            <span className="cms-list-item__name">{t.name}</span>
                            <span className="cms-list-item__meta">{t.role}</span>
                        </div>
                        <div className="cms-list-item__actions">
                            <button className="cms-btn cms-btn--sm" onClick={() => handleEdit(t)} aria-label={`Edit ${t.name}`}>Edit</button>
                            <button className="cms-btn cms-btn--sm cms-btn--danger" onClick={() => handleDelete(t.id)} aria-label={`Delete ${t.name}`}>✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
