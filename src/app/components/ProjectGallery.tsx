"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Project {
    title: string;
    category: string;
    image: string;
    slug?: string;
}

interface ProjectGalleryProps {
    projects: Project[];
    className?: string;
}

export default function ProjectGallery({ projects, className }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = useCallback((index: number) => {
        setSelectedIndex(index);
        document.body.style.overflow = "hidden";
    }, []);

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
        document.body.style.overflow = "";
    }, []);

    const goNext = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % projects.length : null
        );
    }, [projects.length]);

    const goPrev = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + projects.length) % projects.length : null
        );
    }, [projects.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, closeModal, goNext, goPrev]);

    const selected = selectedIndex !== null ? projects[selectedIndex] : null;

    return (
        <>
            <div className={className || "projects__grid"}>
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="projects__item"
                        aria-label={project.title}
                        onClick={() => project.slug ? (window.location.href = `/projects/${project.slug}`) : openModal(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                project.slug ? (window.location.href = `/projects/${project.slug}`) : openModal(i);
                            }
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                        />
                        <div className="projects__overlay">
                            <span className="projects__overlay-category">
                                {project.category}
                            </span>
                            <h3 className="projects__overlay-title">{project.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selected && (
                <div
                    className="lightbox"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selected.title} — ${selected.category}`}
                >
                    <div
                        className="lightbox__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="lightbox__close"
                            onClick={closeModal}
                            aria-label="Close lightbox"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Previous */}
                        <button
                            className="lightbox__nav lightbox__nav--prev"
                            onClick={goPrev}
                            aria-label="Previous project"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        {/* Image */}
                        <div className="lightbox__image-wrapper">
                            <Image
                                src={selected.image}
                                alt={selected.title}
                                fill
                                style={{ objectFit: "contain" }}
                                sizes="90vw"
                                priority
                            />
                        </div>

                        {/* Next */}
                        <button
                            className="lightbox__nav lightbox__nav--next"
                            onClick={goNext}
                            aria-label="Next project"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Info bar */}
                        <div className="lightbox__info">
                            <span className="lightbox__info-category">
                                {selected.category}
                            </span>
                            <h3 className="lightbox__info-title">{selected.title}</h3>
                            <span className="lightbox__info-count">
                                {(selectedIndex ?? 0) + 1} / {projects.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
