"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { fetchProjectBySlug, fetchProjects, type Project } from "../../lib/supabase";
import Link from "next/link";
import { PROJECTS } from "../../data/projects";
import AnimatedLink from "../../components/AnimatedLink";
import { motion, AnimatePresence } from "framer-motion";

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
    const slug = params.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

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

            setLoading(false);
        }
        load();
    }, [slug]);

    if (!project && !loading) {
        notFound();
    }

    if (!project) return null;

    return (
        <main className="page-wrapper project-wrapper" style={{ background: 'var(--color-white)' }}>
            {/* Cinematic Hero Section - Exact Match Refinement */}
            <section className="sp-hero sp-hero--redesign" aria-label={`${project.title} hero`}>
                <div className="sp-hero__bg">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                    />
                </div>

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
                <div className="sp-hero__bottom-strip">
                    <div className="sp-hero__thumbs-container">
                        {allProjects.filter(p => p.slug !== slug).slice(0, 10).map((p, idx) => (
                            <Link key={p.id || idx} href={`/projects/${p.slug}`} className="sp-hero__thumb-link">
                                <motion.div
                                    className="sp-hero__thumb"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + (idx * 0.1) }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                                    <div className="sp-hero__thumb-overlay" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview / Context Section - Refined Grid & Spacing */}
            <section className="sp-overview" aria-label="Project Overview" style={{ padding: '120px 40px' }}>
                <div className="sp-overview__grid" style={{ gap: '60px', alignItems: 'flex-start' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInUp}
                    >
                        <h2 className="sp-overview__headline">
                            {project.category.toUpperCase()}<br />ARCHIVE.
                        </h2>
                    </motion.div>

                    <motion.div
                        className="sp-overview__body"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInUp}
                    >
                        <div className="sp-overview__text" style={{ whiteSpace: "pre-wrap", color: 'var(--color-black)' }}>
                            {project.description}
                        </div>
                        <div className="project-detail__meta" style={{ alignSelf: 'flex-start', marginTop: '40px' }}>
                            <div className="project-detail__meta-divider" style={{ opacity: 0.2, backgroundColor: 'var(--color-black)', height: '1px', width: '100%', marginBottom: '16px' }} />
                            <p className="project-detail__meta-text" style={{ opacity: 0.6, fontSize: '14px', letterSpacing: '0.1em' }}>PROJECT ARCHIVE / 2024</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid - Refined Spacing & Animation */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="project-detail__gallery" style={{ background: '#E6E6E6', padding: '100px 40px' }}>
                    <div className="gallery-container">
                        <motion.h2
                            className="project-detail__gallery-title"
                            style={{ marginBottom: '60px' }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInUp}
                        >
                            GALLERY
                        </motion.h2>
                        <motion.div
                            className="project-detail__gallery-grid"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                        >
                            {project.gallery.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className="project-detail__gallery-item"
                                    style={{ position: 'relative', aspectRatio: "1/1", overflow: 'hidden' }}
                                    variants={fadeInUp}
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
            )}

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
                        <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Back Navigation - Cinematic Footer Spacing */}
            <section className="project-detail__back" style={{ padding: '120px 0', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <motion.div
                    className="project-detail__container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInUp}
                >
                    <AnimatedLink href="/projects" text="BACK TO PROJECTS" className="cta__button" />
                </motion.div>
            </section>
        </main>
    );
}
