"use client";

import { useState } from "react";
import { useCMS } from "./CMSProvider";
import CMSImageUpload from "./CMSImageUpload";
import type { Project } from "../../lib/supabase";

export default function CMSProjectsTab() {
    const { projects, saveProject, deleteProject, reorderProjects, uploadImageFile, showConfirm } = useCMS();
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);
    const [dragIdx, setDragIdx] = useState<number | null>(null);

    const handleNew = () => {
        setEditingProject({ title: "", category: "", description: "", image: "", slug: "", gallery: [] });
        setIsNew(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject({ ...project });
        setIsNew(false);
    };

    const handleSave = async () => {
        if (!editingProject?.title || !editingProject?.slug) return;
        setSaving(true);
        try {
            await saveProject(editingProject as Partial<Project> & { id?: string });
            setEditingProject(null);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id: string) => {
        showConfirm("Delete this project? This will remove it from the site immediately.", () => {
            deleteProject(id);
        });
    };

    const handleDragStart = (idx: number) => setDragIdx(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (dragIdx === null || dragIdx === idx) return;
        const newOrder = [...projects];
        const [moved] = newOrder.splice(dragIdx, 1);
        newOrder.splice(idx, 0, moved);
        reorderProjects(newOrder.map(p => p.id));
        setDragIdx(idx);
    };
    const handleDragEnd = () => setDragIdx(null);

    const handleImageUpload = async (file: File): Promise<string> => {
        const url = await uploadImageFile(file, "projects");
        if (editingProject) {
            setEditingProject(prev => prev ? { ...prev, image: url } : prev);
        }
        return url;
    };

    // Show edit form
    if (editingProject) {
        return (
            <div className="cms-tab-form">
                <div className="cms-tab-form__header">
                    <h3>{isNew ? "New Project" : "Edit Project"}</h3>
                    <button className="cms-btn cms-btn--ghost" onClick={() => setEditingProject(null)}>← Back</button>
                </div>

                <CMSImageUpload
                    currentImage={editingProject.image ?? ""}
                    onUpload={handleImageUpload}
                    label="Cover Image"
                />

                <label className="cms-form-label">Title</label>
                <input
                    className="cms-input"
                    value={editingProject.title ?? ""}
                    onChange={(e) => setEditingProject(prev => {
                        if (!prev) return prev;
                        const newTitle = e.target.value;
                        const updates: any = { title: newTitle };
                        // Auto-slugify if slug is empty
                        if (!prev.slug) {
                            updates.slug = newTitle.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
                        }
                        return { ...prev, ...updates };
                    })}
                    placeholder="Project title"
                />

                <label className="cms-form-label">Slug</label>
                <input
                    className="cms-input"
                    value={editingProject.slug ?? ""}
                    onChange={(e) => setEditingProject(prev => prev ? { ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") } : prev)}
                    placeholder="project-slug"
                />

                <label className="cms-form-label">Category</label>
                <input
                    className="cms-input"
                    value={editingProject.category ?? ""}
                    onChange={(e) => setEditingProject(prev => prev ? { ...prev, category: e.target.value } : prev)}
                    placeholder="e.g. Visual Arts"
                />

                <label className="cms-form-label">Description</label>
                <textarea
                    className="cms-input cms-textarea"
                    value={editingProject.description ?? ""}
                    onChange={(e) => setEditingProject(prev => prev ? { ...prev, description: e.target.value } : prev)}
                    placeholder="Project description..."
                    rows={3}
                />

                <label className="cms-form-label">Image URL (or upload above)</label>
                <input
                    className="cms-input"
                    value={editingProject.image ?? ""}
                    onChange={(e) => setEditingProject(prev => prev ? { ...prev, image: e.target.value } : prev)}
                    placeholder="/images/project-1.png"
                />

                <label className="cms-form-label">Gallery Images</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (!files.length) return;

                        setSaving(true);
                        try {
                            const urls = await Promise.all(files.map(f => uploadImageFile(f, "projects")));
                            setEditingProject(prev => {
                                if (!prev) return prev;
                                return { ...prev, gallery: [...(prev.gallery || []), ...urls] };
                            });
                        } catch (err) {
                            console.error("Upload failed", err);
                        } finally {
                            setSaving(false);
                            e.target.value = '';
                        }
                    }}
                    style={{ marginBottom: '12px', display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}
                />

                {editingProject.gallery && editingProject.gallery.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                        {editingProject.gallery.map((img, i) => (
                            <div key={i} style={{ position: 'relative', width: '60px', height: '60px' }}>
                                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                <button
                                    onClick={() => setEditingProject(p => p ? { ...p, gallery: p.gallery?.filter((_, idx) => idx !== i) } : p)}
                                    style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="cms-tab-form__actions">
                    <button className="cms-btn cms-btn--primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button className="cms-btn cms-btn--ghost" onClick={() => setEditingProject(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    // List view
    return (
        <div className="cms-tab-list">
            <div className="cms-tab-list__header">
                <h3 className="cms-tab-list__title">Projects ({projects.length})</h3>
                <button className="cms-btn cms-btn--primary" onClick={handleNew}>+ Add</button>
            </div>

            <div className="cms-tab-list__items">
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        className={`cms-list-item ${dragIdx === idx ? "cms-list-item--dragging" : ""}`}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="cms-list-item__drag" aria-label="Drag to reorder">⠿</div>
                        <div className="cms-list-item__thumb">
                            {project.image && <img src={project.image} alt="" />}
                        </div>
                        <div className="cms-list-item__info">
                            <span className="cms-list-item__name">{project.title}</span>
                            <span className="cms-list-item__meta">{project.category}</span>
                        </div>
                        <div className="cms-list-item__actions">
                            <button className="cms-btn cms-btn--sm" onClick={() => handleEdit(project)} aria-label={`Edit ${project.title}`}>Edit</button>
                            <button className="cms-btn cms-btn--sm cms-btn--danger" onClick={() => handleDelete(project.id)} aria-label={`Delete ${project.title}`}>✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
