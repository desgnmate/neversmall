"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProjectBySlug, fetchProjects, type Project } from "../../lib/supabase";
import Link from "next/link";
import { PROJECTS } from "../../data/projects";
import AnimatedLink from "../../components/AnimatedLink";
import ArrowButton from "../../components/ArrowButton";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

// Animation Variants matching homepage
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function ProjectDetail() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isHoveringClose, setIsHoveringClose] = useState(false);
    const [arrowDir, setArrowDir] = useState<'left' | 'right'>('right');
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [thumbsX, setThumbsX] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Smooth Cursor Physics
    const mouseX = useSpring(0, { stiffness: 450, damping: 50 });
    const mouseY = useSpring(0, { stiffness: 450, damping: 50 });

    // Parallax Scroll logic
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 1000], [0, 200]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (typeof window !== 'undefined') {
            setArrowDir(e.clientX < window.innerWidth / 2 ? 'left' : 'right');
        }
    };

    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.classList.add('lightbox-open');
        } else {
            document.body.classList.remove('lightbox-open');
        }
        return () => document.body.classList.remove('lightbox-open');
    }, [lightboxIndex]);

    useEffect(() => {
        const calculateMaxScroll = () => {
            if (containerRef.current && contentRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = contentRef.current.scrollWidth;
                // Add minor padding to prevent tight edge clipping
                const max = Math.min(0, containerWidth - contentWidth);
                setMaxScroll(max);
                // Snap back if we resized and current position is out of bounds
                setThumbsX(prev => Math.max(max, prev));
            }
        };

        // Delay slightly to ensure measurements after render/layout
        const timer = setTimeout(calculateMaxScroll, 100);
        window.addEventListener('resize', calculateMaxScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateMaxScroll);
        };
    }, [allProjects, loading, isMobile]);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function load() {
            // Find static data immediately for zero-delay feel
            const staticData = PROJECTS.find((p) => p.slug === slug) as any;
            if (staticData) setProject(staticData);

            // Fetch current project from CMS for latest
            const cmsData = await fetchProjectBySlug(slug);
            if (cmsData) setProject(cmsData);

            // Fetch all projects for the thumbs strip
            const projectsData = await fetchProjects();
            setAllProjects(projectsData.length > 0 ? projectsData : PROJECTS as any);

            // Device detection - Match CSS 1024px breakpoint
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 1024);
            };
            checkMobile();
            window.addEventListener('resize', checkMobile);

            setLoading(false);
            return () => window.removeEventListener('resize', checkMobile);
        }
        load();
    }, [slug]);

    if (!project && !loading) {
        notFound();
    }

    if (!project) return null;

    return (
        <main className="page-wrapper project-wrapper" style={{ background: 'var(--color-white)' }} onMouseMove={handleMouseMove}>
            {/* Cinematic Hero Section - Exact Match Refinement */}
            <section className="sp-hero sp-hero--redesign" aria-label={`${project.title} hero`}>
                <motion.div
                    className="sp-hero__bg"
                    style={{ y: bgY }}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                    />
                </motion.div>

                {/* Cinematic Gradients */}
                <div className="sp-hero__gradient sp-hero__gradient--top" />
                <div className="sp-hero__gradient sp-hero__gradient--bottom" />

                {/* Top Meta Area */}
                <div className="sp-hero__top-meta">
                    <div className="sp-hero__meta-left">
                        <motion.p
                            className="sp-hero__breadcrumb"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link href="/">HOME</Link> / <Link href="/projects">PROJECTS</Link> / {project.category.toUpperCase()}
                        </motion.p>
                        <motion.h1
                            className="sp-hero__title sp-hero__title--refined"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            {project.title.toUpperCase()}
                        </motion.h1>
                    </div>

                    <motion.div
                        className="sp-hero__meta-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="sp-hero__top-desc">
                            {project.description}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Strip: Other Projects */}
                {/* Bottom Strip: Other Projects */}
                <div
                    ref={containerRef}
                    className="sp-hero__bottom-strip"
                    style={{ position: 'relative', zIndex: 10, width: '100%', marginBottom: '-20px' }}
                >
                    {/* Discovery Label & Nav Buttons */}
                    <motion.div
                        className="sp-hero__strip-header"
                        style={{ padding: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '16px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <span style={{ fontFamily: 'var(--font-header)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.4em', color: '#FFF', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                            EXPLORE MORE WORKS
                        </span>
                        <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

                        {/* Small Rectangular Nav Buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                                className="thumbs-nav thumbs-nav--prev"
                                style={{
                                    width: isMobile ? '36px' : '44px',
                                    height: isMobile ? '28px' : '32px',
                                    opacity: thumbsX >= 0 ? 0.2 : 1,
                                    pointerEvents: thumbsX >= 0 ? 'none' : 'auto',
                                    backgroundColor: '#011EE6',
                                    border: 'none',
                                    color: '#FFF',
                                    borderRadius: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setThumbsX(prev => Math.min(prev + (isMobile ? 250 : 480), 0));
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                            <button
                                className="thumbs-nav thumbs-nav--next"
                                style={{
                                    width: isMobile ? '36px' : '44px',
                                    height: isMobile ? '28px' : '32px',
                                    opacity: thumbsX <= maxScroll ? 0.2 : 1,
                                    pointerEvents: thumbsX <= maxScroll ? 'none' : 'auto',
                                    backgroundColor: '#011EE6',
                                    border: 'none',
                                    color: '#FFF',
                                    borderRadius: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setThumbsX(prev => Math.max(prev - (isMobile ? 250 : 480), maxScroll));
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        ref={contentRef}
                        className="sp-hero__thumbs-container"
                        drag="x"
                        dragConstraints={{ left: maxScroll, right: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, x: thumbsX }}
                        transition={{ duration: 0.8, delay: 0.5, x: { type: 'spring', stiffness: 300, damping: 30 } }}
                        style={{ position: 'relative' }}
                        onDragEnd={(_e, info) => {
                            setThumbsX(prev => {
                                const next = prev + info.offset.x;
                                return Math.max(maxScroll, Math.min(0, next));
                            });
                        }}
                    >
                        {allProjects.filter(p => p.slug !== slug).map((p, idx) => (
                            <Link key={p.id || idx} href={`/projects/${p.slug}`} className="sp-hero__thumb-link">
                                <motion.div
                                    className="sp-hero__thumb"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + (idx * 0.1), duration: 0.8 }}
                                    whileHover="hover"
                                    style={{ cursor: 'pointer', border: '1px solid rgba(255,255,255,0.4)', overflow: 'hidden' }}
                                >
                                    <motion.div
                                        style={{ width: '100%', height: '100%', position: 'relative' }}
                                        variants={{
                                            hover: { scale: 1.1 }
                                        }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                        <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                                    </motion.div>
                                    <div className="sp-hero__thumb-overlay" />
                                </motion.div>
                            </Link>
                        ))}
                        {/* Thumbs Edge Hover Zones moved to bottom-strip for stability */}
                    </motion.div>
                </div>

            </section>

            {/* Overview Headline */}
            <section className="sp-overview-headline" style={{ padding: '60px 0 0', background: 'var(--color-white)' }}>
                <motion.h2
                    className="about-section-headline"
                    style={{ marginBottom: '40px', textAlign: 'center', color: 'var(--color-blue)', fontSize: 'clamp(32px, 5vw, 64px)' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Project Overview <span className="about-section-headline__arrow">↘</span>
                </motion.h2>
            </section>

            {/* Overview Section - Separate Cards */}
            <section className="sp-overview-section" style={{ padding: '40px 0 120px', background: 'var(--color-white)' }}>
                <div className="about-purpose__grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <motion.div
                        className="overview-card"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{
                            background: 'var(--color-blue)',
                            padding: '60px',
                            color: 'white',
                            boxShadow: '0 20px 60px rgba(1, 30, 230, 0.1)'
                        }}
                    >
                        <h3 style={{ fontSize: 'clamp(28px, 2.5vw, 36px)', color: 'white', marginBottom: '24px', fontFamily: 'var(--font-header)', textTransform: 'uppercase' }}>Project Context</h3>
                        <p style={{ fontSize: '18px', lineHeight: '1.7', opacity: 0.9 }}>
                            {project.project_context || project.description}
                        </p>
                    </motion.div>

                    <motion.div
                        className="overview-card"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{
                            background: 'var(--color-blue)',
                            padding: '60px',
                            color: 'white',
                            boxShadow: '0 20px 60px rgba(1, 30, 230, 0.1)'
                        }}
                    >
                        <h3 style={{ fontSize: 'clamp(28px, 2.5vw, 36px)', color: 'white', marginBottom: '24px', fontFamily: 'var(--font-header)', textTransform: 'uppercase' }}>Creative Approach</h3>
                        <p style={{ fontSize: '18px', lineHeight: '1.7', opacity: 0.9 }}>
                            {project.creative_approach || project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid - Refined Spacing & Animation */}
            {
                project.gallery && project.gallery.length > 0 && (
                    <section className="project-detail__gallery" style={{ background: '#E6E6E6', padding: '120px 0' }}>
                        <div className="gallery-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                            <motion.h2
                                className="about-section-headline"
                                style={{ marginBottom: '60px', color: 'var(--color-blue)', fontSize: 'clamp(32px, 5vw, 64px)' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInUp}
                            >
                                Project Gallery <span className="about-section-headline__arrow">↘</span>
                            </motion.h2>
                            <motion.div
                                className="project-detail__gallery-grid"
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={staggerContainer}
                            >
                                {project.gallery.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="project-detail__gallery-item"
                                        style={{ position: 'relative', aspectRatio: "1/1", overflow: 'hidden', cursor: 'pointer', boxSizing: 'border-box' }}
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setLightboxIndex(idx)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} gallery ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )
            }

            {/* Back Navigation - Moved just under gallery */}
            <section className="project-detail__back" style={{ padding: '60px 0', textAlign: 'center' }}>
                <motion.div
                    className="project-detail__container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInUp}
                >
                    <ArrowButton href="/projects" text="BACK TO PROJECTS" variant="dark" />
                </motion.div>
            </section>

            {/* CTA Section - Restored Default Styles for Visibility */}
            <section className="cta" aria-label="Call to action">
                <motion.h2
                    className="cta__headline"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInUp}
                >
                    INSPIRED BY<br />THIS PROJECT?
                </motion.h2>
                <motion.div
                    className="cta__content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                >
                    <motion.p className="cta__subhead" variants={fadeInUp}>Your project deserves Neversmall quality.</motion.p>
                    <motion.div variants={fadeInUp}>
                        <ArrowButton href="/contact" text="START A PROJECT" variant="primary" />
                    </motion.div>
                </motion.div>
            </section>


            {/* Global Custom Cursor — renders for Lightbox */}
            {!isMobile && (lightboxIndex !== null) && (
                <motion.div
                    style={{
                        position: 'fixed',
                        left: mouseX,
                        top: mouseY,
                        width: isHoveringClose ? '80px' : '60px',
                        height: isHoveringClose ? '80px' : '60px',
                        pointerEvents: 'none',
                        zIndex: 100001,
                        backgroundColor: 'var(--color-blue)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        mixBlendMode: 'normal'
                    }}
                    className="lightbox-cursor"
                    animate={{
                        opacity: 1,
                        scale: isClicking ? 0.8 : (isHoveringClose ? 0.5 : 1)
                    }}
                    transition={{
                        opacity: { duration: 0.2 },
                        scale: { type: 'spring', stiffness: 500, damping: 25 }
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isHoveringClose ? (
                            <motion.span
                                key="close"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                ✕
                            </motion.span>
                        ) : (
                            <motion.span
                                key="arrow"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                style={{ fontSize: '16px' }}
                            >
                                {arrowDir === 'left' ? '←' : '→'}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Lightbox - Improved Navigation & On-Brand Interaction */}
            <AnimatePresence>
                {lightboxIndex !== null && project.gallery && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            backgroundColor: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                            cursor: 'none'
                        }}
                    >

                        <div
                            style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', zIndex: 99998, cursor: isMobile ? 'auto' : 'none' }}
                            onMouseEnter={() => setArrowDir('left')}
                            onMouseLeave={() => setIsClicking(false)}
                            onMouseDown={() => setIsClicking(true)}
                            onMouseUp={() => setIsClicking(false)}
                            onMouseMove={(e) => {
                                if (!isMobile) {
                                    mouseX.set(e.clientX);
                                    mouseY.set(e.clientY);
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(prev => (prev! - 1 + project.gallery!.length) % project.gallery!.length);
                            }}
                        />
                        <div
                            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', zIndex: 99998, cursor: isMobile ? 'auto' : 'none' }}
                            onMouseEnter={() => setArrowDir('right')}
                            onMouseLeave={() => setIsClicking(false)}
                            onMouseDown={() => setIsClicking(true)}
                            onMouseUp={() => setIsClicking(false)}
                            onMouseMove={(e) => {
                                if (!isMobile) {
                                    mouseX.set(e.clientX);
                                    mouseY.set(e.clientY);
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(prev => (prev! + 1) % project.gallery!.length);
                            }}
                        />

                        <motion.div
                            className="lightbox__content"
                            key={lightboxIndex}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            style={{ position: 'relative', width: '100%', height: '100%', zIndex: 99997, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x > 100) {
                                    setLightboxIndex(prev => (prev! - 1 + project.gallery!.length) % project.gallery!.length);
                                } else if (info.offset.x < -100) {
                                    setLightboxIndex(prev => (prev! + 1) % project.gallery!.length);
                                }
                            }}
                        >
                            <div className="lightbox__image-wrapper" style={{ position: 'relative', width: '90vw', height: '100%' }}>
                                <Image
                                    src={project.gallery[lightboxIndex]}
                                    alt="Project detail view"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Visible Nav Buttons for Mobile */}
                        <div className="lightbox__mobile-nav">
                            <button
                                className="lightbox__nav lightbox__nav--prev"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(prev => (prev! - 1 + project.gallery!.length) % project.gallery!.length);
                                }}
                            >
                                ←
                            </button>
                            <button
                                className="lightbox__nav lightbox__nav--next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(prev => (prev! + 1) % project.gallery!.length);
                                }}
                            >
                                →
                            </button>
                        </div>

                        {/* Close Action */}
                        <motion.button
                            onMouseEnter={() => setIsHoveringClose(true)}
                            onMouseLeave={() => setIsHoveringClose(false)}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--color-blue)', borderColor: 'var(--color-blue)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setLightboxIndex(null);
                                setIsHoveringClose(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '40px',
                                right: '40px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                cursor: 'pointer',
                                zIndex: 99999,
                                background: '#000',
                                padding: '12px 32px',
                                borderRadius: '0',
                                border: '1px solid #FFF',
                                backdropFilter: 'none'
                            }}
                        >
                            CLOSE
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main >
    );
}
