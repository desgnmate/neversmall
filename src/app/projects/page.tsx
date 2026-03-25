"use client";

import { PROJECTS, type Project as StaticProject } from "../data/projects";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedLink from "../components/AnimatedLink";
import ArrowButton from "../components/ArrowButton";
import { useCMS } from "../components/cms/CMSProvider";
import { type Project } from "../lib/supabase";

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
            delayChildren: 0.1
        }
    }
};

function ProjectCard({ project, offsetClass }: { project: any; offsetClass: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect: moves smoothly while scrolling to feel like it's floating
    const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <motion.div
            ref={ref}
            className={`projects-page__item ${offsetClass}`}
            variants={fadeInUp}
        >
            <motion.div style={{ y: yParallax, display: "flex", flexDirection: "column", flex: 1 }}>
                <div className="projects-page__image-wrapper" style={{ aspectRatio: "1/1" }}>
                    <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="projects-page__item-content">
                    <h3 className="projects-page__item-title">{project.title}</h3>
                    <p className="projects-page__item-desc">{project.description}</p>
                    <AnimatedLink href={`/projects/${project.slug}`} text="VIEW PROJECT" />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const { projects: cmsProjects, isLoading } = useCMS();

    // Smart merge: Use CMS projects and fill in missing ones from static data
    // to ensure the page doesn't look empty during CMS setup.
    const displayProjects = cmsProjects.length > 0 ? cmsProjects : PROJECTS;

    // Sort by sort_order if available, or just keep as merged
    const sortedProjects = [...displayProjects].sort((a, b) => {
        const orderA = (a as any).sort_order ?? 999;
        const orderB = (b as any).sort_order ?? 999;
        return orderA - orderB;
    });

    return (
        <main className="page-wrapper projects-page">
            {/* Header Section */}
            <section className="projects-page__header">
                <motion.div
                    className="projects-page__header-grid"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp}>
                        <h1 className="projects-page__title">
                            SELECTED<br />WORKS
                        </h1>
                    </motion.div>

                    <motion.div className="projects-page__header-desc-col" variants={fadeInUp}>
                        <p className="projects-page__desc">
                            A selection of campaigns, content, and creative work produced for brands across video, photography, and digital marketing.
                        </p>
                    </motion.div>

                    <motion.div className="projects-page__header-cta" variants={fadeInUp}>
                        <ArrowButton href="/contact" text="START A PROJECT" variant="primary" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Projects Grid Section */}
            <section className="projects-page__grid-section">
                <motion.div
                    className="projects-page__grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {sortedProjects.map((project: any, idx: number) => {
                        const isLargeOffset = idx % 4 === 1;
                        const isSmallOffset = idx % 4 === 2;

                        let offsetClass = "";
                        if (isLargeOffset) offsetClass = "projects-page__item--offset-large";
                        else if (isSmallOffset) offsetClass = "projects-page__item--offset-small";

                        return <ProjectCard key={project.id || project.slug || project.title} project={project} offsetClass={offsetClass} />;
                    })}
                </motion.div>
            </section>
        </main>
    );
}
