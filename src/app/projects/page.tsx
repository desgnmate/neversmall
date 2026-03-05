import Image from "next/image";
import Link from "next/link";
import AnimatedLink from "../components/AnimatedLink";

const ALL_PROJECTS = [
    {
        title: "Veiled Motion",
        description: "A study in ethereal movement — where form meets emotion in soft, dreamlike light.",
        category: "Visual Arts",
        image: "/images/project-1.png",
        slug: "veiled-motion"
    },
    {
        title: "Endless Path",
        description: "An exploration of solitude and journey, winding through the stillness of nature.",
        category: "Landscape",
        image: "/images/project-2.png",
        slug: "endless-path"
    },
    {
        title: "Celestial Drift",
        description: "A vision of the unknown — light, gravity, and silence colliding beyond the stars.",
        category: "Fine Art",
        image: "/images/project-3.png",
        slug: "celestial-drift"
    },
    {
        title: "Shadow Gaze",
        description: "An intimate portrait that blurs the line between mystery and clarity.",
        category: "Portraiture",
        image: "/images/project-4.png",
        slug: "shadow-gaze"
    },
];

export default function Projects() {
    return (
        <main className="page-wrapper projects-page">
            {/* Header Section */}
            <section className="projects-page__header">
                <div className="projects-page__header-grid">
                    {/* Title Column */}
                    <div>
                        <h1 style={{
                            fontFamily: "var(--font-header)",
                            fontSize: "clamp(48px, 6vw, 100px)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase",
                            color: "var(--color-black)"
                        }}>
                            Selected<br />Works
                        </h1>
                    </div>

                    {/* Description Column (Center) */}
                    <div>
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(16px, 1.4vw, 20px)",
                            lineHeight: 1.5,
                            color: "var(--color-black)",
                            maxWidth: "480px"
                        }}>
                            A selection of campaigns, content, and creative work produced for brands across video, photography, and digital marketing.
                        </p>
                    </div>

                    {/* Button Column (Right) */}
                    <div className="projects-page__header-cta">
                        <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="projects-page__grid-section">
                <div className="projects-page__grid">

                    {/* Col 1: Veiled Motion */}
                    <div className="projects-page__item">
                        <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
                            <Image
                                src={ALL_PROJECTS[0].image}
                                alt={ALL_PROJECTS[0].title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="projects-page__item-content">
                            <h3 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>{ALL_PROJECTS[0].title}</h3>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.5, color: "var(--color-black)", marginBottom: "16px" }}>{ALL_PROJECTS[0].description}</p>
                            <AnimatedLink
                                href={`/projects/${ALL_PROJECTS[0].slug}`}
                                text="View Project"
                                style={{ fontFamily: "var(--font-subheader)", fontSize: "15px", fontWeight: 700, textTransform: "uppercase", textDecoration: "none", color: "var(--color-black)" }}
                            />
                        </div>
                    </div>

                    {/* Col 2: Endless Path (Offset) */}
                    <div className="projects-page__item projects-page__item-offset projects-page__item-offset--large">
                        <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                            <Image
                                src={ALL_PROJECTS[1].image}
                                alt={ALL_PROJECTS[1].title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="projects-page__item-content">
                            <h3 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>{ALL_PROJECTS[1].title}</h3>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.5, color: "var(--color-black)", marginBottom: "16px" }}>{ALL_PROJECTS[1].description}</p>
                            <AnimatedLink
                                href={`/projects/${ALL_PROJECTS[1].slug}`}
                                text="View Project"
                                style={{ fontFamily: "var(--font-subheader)", fontSize: "15px", fontWeight: 700, textTransform: "uppercase", textDecoration: "none", color: "var(--color-black)" }}
                            />
                        </div>
                    </div>

                    {/* Col 3: Celestial Drift (Offset) */}
                    <div className="projects-page__item projects-page__item-offset projects-page__item-offset--medium">
                        <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden" }}>
                            <Image
                                src={ALL_PROJECTS[2].image}
                                alt={ALL_PROJECTS[2].title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="projects-page__item-content">
                            <h3 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>{ALL_PROJECTS[2].title}</h3>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.5, color: "var(--color-black)", marginBottom: "16px" }}>{ALL_PROJECTS[2].description}</p>
                            <AnimatedLink
                                href={`/projects/${ALL_PROJECTS[2].slug}`}
                                text="View Project"
                                style={{ fontFamily: "var(--font-subheader)", fontSize: "15px", fontWeight: 700, textTransform: "uppercase", textDecoration: "none", color: "var(--color-black)" }}
                            />
                        </div>
                    </div>

                    {/* Col 4: Shadow Gaze */}
                    <div className="projects-page__item">
                        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
                            <Image
                                src={ALL_PROJECTS[3].image}
                                alt={ALL_PROJECTS[3].title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="projects-page__item-content">
                            <h3 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>{ALL_PROJECTS[3].title}</h3>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.5, color: "var(--color-black)", marginBottom: "16px" }}>{ALL_PROJECTS[3].description}</p>
                            <AnimatedLink
                                href={`/projects/${ALL_PROJECTS[3].slug}`}
                                text="View Project"
                                style={{ fontFamily: "var(--font-subheader)", fontSize: "15px", fontWeight: 700, textTransform: "uppercase", textDecoration: "none", color: "var(--color-black)" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
