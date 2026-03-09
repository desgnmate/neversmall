import { fetchProjectBySlug } from "../../lib/supabase";
import { PROJECTS } from "../../data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedLink from "../../components/AnimatedLink";
import Footer from "../../components/Footer";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
    const { slug } = await params;

    // First try CMS data
    let project = await fetchProjectBySlug(slug);

    // Fallback to static data if not in CMS yet
    if (!project) {
        project = PROJECTS.find((p) => p.slug === slug) as any;
    }

    if (!project) {
        notFound();
    }

    return (
        <main className="page-wrapper home-wrapper">
            {/* Hero Section */}
            <section className="project-detail-hero">
                <div className="project-detail__container">
                    <span className="project-detail__category">
                        {project.category}
                    </span>
                    <h1 className="project-detail__title">
                        {project.title.split(' ').map((word, i) => (
                            <span key={i}>{word}<br /></span>
                        ))}
                    </h1>

                    <div className="project-detail__info-grid">
                        <p className="project-detail__desc">
                            {project.description}
                        </p>
                        <div className="project-detail__meta">
                            <div className="project-detail__meta-divider" />
                            <p className="project-detail__meta-text">PROJECT ARCHIVE / 2024</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Feature Image */}
            <section className="project-detail__main-image">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </section>

            {/* Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="project-detail__gallery">
                    <div className="project-detail__container">
                        <h2 className="project-detail__gallery-title">GALLERY</h2>
                        <div className="project-detail__gallery-grid">
                            {project.gallery.map((img, idx) => (
                                <div key={idx} className="project-detail__gallery-item" style={{ aspectRatio: "1/1" }}>
                                    <Image
                                        src={img}
                                        alt={`${project.title} gallery ${idx + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="cta" aria-label="Call to action">
                <h2 className="cta__headline">
                    INSPIRED BY<br />THIS PROJECT?
                </h2>
                <div className="cta__content">
                    <p className="cta__subhead">Let&apos;s build yours next.</p>
                    <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
                </div>
            </section>

            {/* Back to Projects */}
            <section className="project-detail__back">
                <div className="project-detail__container">
                    <AnimatedLink href="/projects" text="BACK TO PROJECTS" className="cta__button" />
                </div>
            </section>
        </main>
    );
}

// Generate static params for faster loading
export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}
