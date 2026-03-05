import Image from "next/image";
import Navbar from "../../components/Navbar";

const AnimatedLink = ({ href, text, className }: { href: string; text: string; className?: string }) => {
    return (
        <a href={href} className={`animated-link ${className || ""}`}>
            <span className="span-mother" aria-hidden="true">
                {text.split("").map((char, index) => (
                    <span key={index} style={{ transition: `${0.2 + index * 0.05}s` }}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className="span-mother2" aria-hidden="true">
                {text.split("").map((char, index) => (
                    <span key={index} style={{ transition: `${0.2 + index * 0.05}s` }}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className="sr-only">{text}</span>
        </a>
    );
};

export default function PhotographyPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="sp-hero" aria-label="Photography hero">
                <div className="sp-hero__bg">
                    <Image
                        src="/images/photography.jpg"
                        alt="Professional photography production"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="sp-hero__overlay" />
                <div className="sp-hero__content">
                    <p className="sp-hero__breadcrumb">
                        <a href="/">Home</a> / <a href="/#services">Services</a> / Photography
                    </p>
                    <h1 className="sp-hero__title">PHOTOGRAPHY</h1>
                    <p className="sp-hero__subtitle">Every frame tells your story.</p>
                </div>
            </section>

            {/* Overview */}
            <section className="sp-overview" aria-label="Photography overview">
                <div className="sp-overview__grid">
                    <h2 className="sp-overview__headline">
                        IMAGERY THAT<br />
                        SPEAKS VOLUMES.
                    </h2>
                    <div className="sp-overview__body">
                        <p className="sp-overview__text">
                            We deliver clean, professional imagery across products, campaigns, lifestyle, and brand storytelling. Every shoot is art-directed to align with your brand identity and marketing goals.
                        </p>
                        <p className="sp-overview__text">
                            From studio setups to on-location shoots, we handle lighting, composition, retouching, and post-production to ensure every image is print and digital ready.
                        </p>
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="sp-deliver" aria-label="What we deliver">
                <div className="sp-deliver__inner">
                    <h2 className="sp-deliver__headline">WHAT WE DELIVER</h2>
                    <div className="sp-deliver__grid">
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">01</span>
                            <h3 className="sp-deliver__item-title">Product Photography</h3>
                            <p className="sp-deliver__item-desc">
                                High-quality product shots for e-commerce, catalogues, and social — styled and lit for maximum impact.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">02</span>
                            <h3 className="sp-deliver__item-title">Campaign Shoots</h3>
                            <p className="sp-deliver__item-desc">
                                Art-directed photography for advertising campaigns, seasonal collections, and brand launches.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">03</span>
                            <h3 className="sp-deliver__item-title">Lifestyle &amp; Portrait</h3>
                            <p className="sp-deliver__item-desc">
                                Authentic, editorial-style imagery that connects your brand to real moments and real people.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">04</span>
                            <h3 className="sp-deliver__item-title">Post-Production</h3>
                            <p className="sp-deliver__item-desc">
                                Professional retouching, color correction, and compositing to take raw captures to polished assets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="sp-cta" aria-label="Start a project">
                <h2 className="sp-cta__headline">
                    LET&apos;S CAPTURE<br />SOMETHING REAL.
                </h2>
                <p className="sp-cta__sub">Your brand deserves more than stock photos.</p>
                <AnimatedLink href="/#cta" className="sp-cta__button" text="START A PROJECT" />
            </section>
        </>
    );
}
