import Image from "next/image";
import AnimatedLink from "../../components/AnimatedLink";

export default function VideographyPage() {
    return (
        <main className="service-wrapper">
            {/* Hero */}
            <section className="sp-hero" aria-label="Videography hero">
                <div className="sp-hero__bg">
                    <Image
                        src="/images/videography-full.jpg"
                        alt="High-impact videography production"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="sp-hero__overlay" />
                <div className="sp-hero__content">
                    <p className="sp-hero__breadcrumb">
                        <a href="/">Home</a> / <a href="/#services">Services</a> / Videography
                    </p>
                    <h1 className="sp-hero__title">VIDEOGRAPHY</h1>
                    <p className="sp-hero__subtitle">Stories that move. Content that converts.</p>
                </div>
            </section>

            {/* Overview */}
            <section className="sp-overview" aria-label="Videography overview">
                <div className="sp-overview__grid">
                    <h2 className="sp-overview__headline">
                        VIDEO PRODUCTION<br />
                        BUILT FOR BRANDS.
                    </h2>
                    <div className="sp-overview__body">
                        <p className="sp-overview__text">
                            From concept to final cut, we produce video content that captures attention and drives action. Whether it&apos;s a brand film, social-first short, event recap, or campaign hero — every frame is intentional.
                        </p>
                        <p className="sp-overview__text">
                            We handle scripting, shooting, editing, color grading, and motion graphics. You bring the vision; we make it move.
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
                            <h3 className="sp-deliver__item-title">Brand Films</h3>
                            <p className="sp-deliver__item-desc">
                                Cinematic brand stories designed to communicate your identity, values, and vision to your audience.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">02</span>
                            <h3 className="sp-deliver__item-title">Short-Form Content</h3>
                            <p className="sp-deliver__item-desc">
                                Vertical, scroll-stopping video for Reels, TikTok, and Stories — optimized for engagement and reach.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">03</span>
                            <h3 className="sp-deliver__item-title">Event Coverage</h3>
                            <p className="sp-deliver__item-desc">
                                Multi-camera event capture with same-day highlight reels and full post-production editing.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">04</span>
                            <h3 className="sp-deliver__item-title">Motion Graphics</h3>
                            <p className="sp-deliver__item-desc">
                                Animated titles, lower thirds, transitions, and visual effects that elevate production quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="sp-cta" aria-label="Start a project">
                <h2 className="sp-cta__headline">
                    READY TO<br />HIT RECORD?
                </h2>
                <p className="sp-cta__sub">Let&apos;s create something worth watching.</p>
                <AnimatedLink href="/#cta" className="sp-cta__button" text="START A PROJECT" />
            </section>
        </main>
    );
}
