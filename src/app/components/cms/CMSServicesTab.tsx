"use client";

import { useState } from "react";
import { useCMS } from "./CMSProvider";
import CMSImageUpload from "./CMSImageUpload";
import type { Service } from "../../lib/supabase";

export default function CMSServicesTab() {
    const { services, saveService, deleteService, reorderServices, uploadImageFile, showConfirm } = useCMS();
    const [editing, setEditing] = useState<(Partial<Service> & { showDedicated?: boolean }) | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);
    const [dragIdx, setDragIdx] = useState<number | null>(null);

    const handleNew = () => {
        setEditing({ name: "", description: "", image: "", href: "", slug: "", content: "", showDedicated: false });
        setIsNew(true);
    };

    const handleEdit = (service: Service) => {
        setEditing({ ...service, showDedicated: false });
        setIsNew(false);
    };

    const handleSave = async () => {
        if (!editing?.name) return;
        setSaving(true);
        try {
            // Clean up temporary UI fields before saving
            const { showDedicated, ...dataToSave } = editing as any;
            await saveService(dataToSave);
            setEditing(null);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id: string) => {
        showConfirm("Delete this service? This will remove it from the site immediately.", () => {
            deleteService(id);
        });
    };

    const handleDragStart = (idx: number) => setDragIdx(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (dragIdx === null || dragIdx === idx) return;
        const newOrder = [...services];
        const [moved] = newOrder.splice(dragIdx, 1);
        newOrder.splice(idx, 0, moved);
        reorderServices(newOrder.map(s => s.id));
        setDragIdx(idx);
    };
    const handleDragEnd = () => setDragIdx(null);

    const handleImageUpload = async (file: File): Promise<string> => {
        const url = await uploadImageFile(file, "services");
        if (editing) setEditing(prev => prev ? { ...prev, image: url } : prev);
        return url;
    };

    if (editing) {
        return (
            <div className="cms-tab-form">
                <div className="cms-tab-form__header" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="cms-btn cms-btn--ghost" onClick={() => setEditing(null)} style={{ padding: '4px 8px' }}>←</button>
                        <h3 style={{ margin: 0 }}>{isNew ? "New Service" : "Edit Service"}</h3>
                    </div>
                </div>

                <div className="cms-tab-form__tabs">
                    <button
                        className={`cms-tab-btn ${!editing.showDedicated ? 'active' : ''}`}
                        onClick={() => setEditing(prev => ({ ...prev, showDedicated: false }))}
                    >
                        BASIC INFO
                    </button>
                    <button
                        className={`cms-tab-btn ${editing.showDedicated ? 'active' : ''}`}
                        onClick={() => setEditing(prev => ({ ...prev, showDedicated: true }))}
                    >
                        DEDICATED PAGE
                    </button>
                </div>

                {!editing.showDedicated ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <CMSImageUpload currentImage={editing.image ?? ""} onUpload={handleImageUpload} label="Service Image" />

                        <label className="cms-form-label">Name</label>
                        <input
                            className="cms-input"
                            value={editing.name ?? ""}
                            onChange={(e) => setEditing(prev => {
                                if (!prev) return prev;
                                const newName = e.target.value;
                                const slugified = newName.toLowerCase().trim().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
                                const updates: any = {
                                    name: newName,
                                    slug: slugified,
                                    href: `/services/${slugified}`
                                };

                                return { ...prev, ...updates };
                            })}
                            placeholder="Service name"
                        />

                        <label className="cms-form-label">Description (Listing summary)</label>
                        <textarea className="cms-input cms-textarea" value={editing.description ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, description: e.target.value } : prev)} placeholder="Service description..." rows={3} />

                        <label className="cms-form-label">Image URL (Optional)</label>
                        <input className="cms-input" value={editing.image ?? ""} onChange={(e) => setEditing(prev => prev ? { ...prev, image: e.target.value } : prev)} placeholder="/images/service.jpg" />

                        <label className="cms-form-label">URL Slug (Auto-generated)</label>
                        <input
                            className="cms-input"
                            value={editing.slug ?? ""}
                            readOnly
                            disabled
                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        />

                        <label className="cms-form-label">Link (Auto-generated)</label>
                        <input
                            className="cms-input"
                            value={editing.href ?? ""}
                            readOnly
                            disabled
                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        />
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h4 className="cms-form-section-title">Hero Section</h4>
                        <label className="cms-form-label">Hero Headline</label>
                        <input
                            className="cms-input"
                            value={editing.page_headline ?? ""}
                            onChange={(e) => setEditing(prev => prev ? { ...prev, page_headline: e.target.value } : prev)}
                            placeholder={editing.name ? editing.name.toUpperCase() : "TITLE"}
                        />

                        <label className="cms-form-label">Hero Subheadline</label>
                        <textarea
                            className="cms-input cms-textarea"
                            value={editing.page_subheadline ?? ""}
                            onChange={(e) => setEditing(prev => prev ? { ...prev, page_subheadline: e.target.value } : prev)}
                            placeholder={editing.description || "Subtext for the hero banner..."}
                            rows={2}
                        />

                        <h4 className="cms-form-section-title">Overview Layout</h4>
                        <label className="cms-form-label">Overview Title</label>
                        <input
                            className="cms-input"
                            value={editing.page_overview_title ?? ""}
                            onChange={(e) => setEditing(prev => prev ? { ...prev, page_overview_title: e.target.value } : prev)}
                            placeholder="THE SOLUTIONS"
                        />

                        <label className="cms-form-label">Overview Content</label>
                        <textarea
                            className="cms-input cms-textarea"
                            style={{ minHeight: '150px' }}
                            value={editing.page_overview_content ?? ""}
                            onChange={(e) => setEditing(prev => prev ? { ...prev, page_overview_content: e.target.value } : prev)}
                            placeholder="Detailed overview section..."
                        />

                        {editing.content && (
                            <>
                                <label className="cms-form-label">Legacy/Imported Content (Reference only)</label>
                                <textarea
                                    className="cms-input cms-textarea"
                                    readOnly
                                    value={editing.content}
                                    style={{ opacity: 0.6, fontSize: '12px' }}
                                    rows={3}
                                />
                                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '-8px' }}>
                                    This content is currently being used as a fallback. Please copy it to the fields above to organize it.
                                </p>
                            </>
                        )}

                        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.05)' }}>
                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                                Note: If these fields are left empty, the page will default to using the basic Name and Description.
                            </p>
                        </div>

                        <h4 className="cms-form-section-title">What We Deliver (Grid)</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {(editing.page_deliverables || []).map((del, idx) => (
                                <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', position: 'relative' }}>
                                    <button
                                        className="cms-btn cms-btn--danger cms-btn--sm"
                                        style={{ position: 'absolute', top: '12px', right: '12px' }}
                                        onClick={() => {
                                            const arr = [...(editing.page_deliverables || [])];
                                            arr.splice(idx, 1);
                                            setEditing(prev => prev ? { ...prev, page_deliverables: arr } : prev);
                                        }}
                                    >✕</button>
                                    <label className="cms-form-label">Item {idx + 1} - Title</label>
                                    <input
                                        className="cms-input"
                                        style={{ marginBottom: '8px' }}
                                        value={del.title ?? ""}
                                        onChange={(e) => {
                                            const arr = [...(editing.page_deliverables || [])];
                                            arr[idx] = { ...arr[idx], title: e.target.value };
                                            setEditing(prev => prev ? { ...prev, page_deliverables: arr } : prev);
                                        }}
                                        placeholder="e.g. BRAND FILMS"
                                    />
                                    <label className="cms-form-label">Item {idx + 1} - Description</label>
                                    <textarea
                                        className="cms-input cms-textarea"
                                        value={del.text ?? ""}
                                        onChange={(e) => {
                                            const arr = [...(editing.page_deliverables || [])];
                                            arr[idx] = { ...arr[idx], text: e.target.value };
                                            setEditing(prev => prev ? { ...prev, page_deliverables: arr } : prev);
                                        }}
                                        placeholder="Cinematic brand stories..."
                                        rows={2}
                                    />
                                </div>
                            ))}
                            <button
                                className="cms-btn cms-btn--ghost"
                                onClick={() => {
                                    const arr = [...(editing.page_deliverables || [])];
                                    arr.push({ title: '', text: '' });
                                    setEditing(prev => prev ? { ...prev, page_deliverables: arr } : prev);
                                }}
                            >
                                + Add Deliverable Item
                            </button>
                        </div>
                    </div>
                )}

                <div className="cms-tab-form__actions" style={{ marginTop: '12px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button className="cms-btn cms-btn--primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                    <button className="cms-btn cms-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cms-tab-list">
            <div className="cms-tab-list__header">
                <h3 className="cms-tab-list__title">Services ({services.length})</h3>
                <button className="cms-btn cms-btn--primary" onClick={handleNew}>+ Add</button>
            </div>
            <div className="cms-tab-list__items">
                {services.map((service, idx) => (
                    <div key={service.id} className={`cms-list-item ${dragIdx === idx ? "cms-list-item--dragging" : ""}`} draggable onDragStart={() => handleDragStart(idx)} onDragOver={(e) => handleDragOver(e, idx)} onDragEnd={handleDragEnd}>
                        <div className="cms-list-item__drag">⠿</div>
                        <div className="cms-list-item__thumb">{service.image && <img src={service.image} alt="" />}</div>
                        <div className="cms-list-item__info">
                            <span className="cms-list-item__name">{service.name}</span>
                            <span className="cms-list-item__meta">{service.href}</span>
                        </div>
                        <div className="cms-list-item__actions">
                            <button className="cms-btn cms-btn--sm" onClick={() => handleEdit(service)} aria-label={`Edit ${service.name}`}>Edit</button>
                            <button className="cms-btn cms-btn--sm cms-btn--danger" onClick={() => handleDelete(service.id)} aria-label={`Delete ${service.name}`}>✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
