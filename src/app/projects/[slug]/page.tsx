import { PROJECTS } from "../../data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedLink from "../../components/AnimatedLink";
import Footer from "../../components/Footer";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export default function ProjectDetail({ params }: ProjectPageProps) {
    const project = PROJECTS.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="page-wrapper">
            {/* Hero Section */}
            <section className="project-detail-hero" style={{ paddingBottom: "100px" }}>
                <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ fontFamily: "var(--font-subheader)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>
                            {project.category}
                        </span>
                    </div>
                    <h1 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(48px, 9vw, 130px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", marginBottom: "40px", color: "var(--color-black)" }}>
                        {project.title.split(' ').map((word, i) => (
                            <span key={i}>{word}<br /></span>
                        ))}
                    </h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "80px" }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.4, color: "var(--color-black)", maxWidth: "600px" }}>
                            {project.description}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "end" }}>
                            <div style={{ height: "1px", width: "100%", backgroundColor: "var(--color-black)" }}></div>
                            <p style={{ fontFamily: "var(--font-subheader)", fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>PROJECT ARCHIVE / 2024</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Feature Image */}
            <section style={{ width: "100%" }}>
                <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            </section>

            {/* Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
                <section style={{ padding: "100px 0", background: "#E6E6E6" }}>
                    <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
                        <h2 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(32px, 5vw, 64px)", textTransform: "uppercase", marginBottom: "64px" }}>GALLERY</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                            {project.gallery.map((img, idx) => (
                                <div key={idx} style={{ position: "relative", width: "100%", aspectRatio: idx === 0 ? "16/9" : "1/1", gridColumn: idx === 0 ? "span 2" : "auto", overflow: "hidden" }}>
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

            {/* Back to Projects */}
            <section style={{ padding: "80px 0", borderTop: "1px solid var(--color-black)" }}>
                <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
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
