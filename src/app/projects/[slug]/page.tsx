"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { fetchProjectBySlug, type Project } from "../../lib/supabase";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function load() {
            // First try CMS data
            let data = await fetchProjectBySlug(slug);

            // Fallback to static data
            if (!data) {
                data = PROJECTS.find((p) => p.slug === slug) as any;
            }

            setProject(data);
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) return (
        <div className="service-loading" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f6f6' }}>
            <p style={{ fontFamily: 'var(--font-header)', fontSize: '24px' }}>LOADING PROJECT...</p>
        </div>
    );

    if (!project) {
        notFound();
    }

    return (
        <main className="page-wrapper project-wrapper" style={{ background: 'var(--color-white)' }}>
            {/* Cinematic Hero Section - Matching Service Pages 100vh Layout */}
            <section className="sp-hero" aria-label={`${project.title} hero`}>
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
                <div className="sp-hero__overlay" />
                <motion.div
                    className="sp-hero__content"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <p className="sp-hero__breadcrumb">
                        <Link href="/">HOME</Link> / <Link href="/projects">PROJECTS</Link> / {project.category.toUpperCase()}
                    </p>
                    <h1 className="sp-hero__title" style={{ color: 'var(--color-white)' }}>
                        {project.title.split(' ').map((word, i) => (
                            <span key={i}>{word.toUpperCase()}<br /></span>
                        ))}
                    </h1>
                    <p className="sp-hero__subtitle" style={{ maxWidth: '600px', color: 'rgba(246, 246, 246, 0.8)' }}>
                        {project.description}
                    </p>
                </motion.div>
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
