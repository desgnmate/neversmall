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

export default function SocialManagementPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="sp-hero" aria-label="Social Management hero">
                <div className="sp-hero__bg">
                    <Image
                        src="/images/social-management.jpg"
                        alt="Strategic social media management"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="sp-hero__overlay" />
                <div className="sp-hero__content">
                    <p className="sp-hero__breadcrumb">
                        <a href="/">Home</a> / <a href="/#services">Services</a> / Social Management
                    </p>
                    <h1 className="sp-hero__title">SOCIAL<br />MANAGEMENT</h1>
                    <p className="sp-hero__subtitle">Your brand, always on. Always growing.</p>
                </div>
            </section>

            {/* Overview */}
            <section className="sp-overview" aria-label="Social Management overview">
                <div className="sp-overview__grid">
                    <h2 className="sp-overview__headline">
                        STRATEGIC GROWTH<br />
                        ACROSS PLATFORMS.
                    </h2>
                    <div className="sp-overview__body">
                        <p className="sp-overview__text">
                            We manage your social presence end-to-end — from content calendars and copywriting to publishing, community engagement, and analytics reporting. No templates. No autopilot. Every post is crafted with intent.
                        </p>
                        <p className="sp-overview__text">
                            We work across Instagram, TikTok, LinkedIn, Facebook, and X to build consistent, scroll-stopping presences that convert followers into customers.
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
                            <h3 className="sp-deliver__item-title">Content Strategy</h3>
                            <p className="sp-deliver__item-desc">
                                Monthly content calendars aligned to your business goals, audience insights, and platform trends.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">02</span>
                            <h3 className="sp-deliver__item-title">Community Management</h3>
                            <p className="sp-deliver__item-desc">
                                Daily engagement, DM management, and comment moderation to build authentic relationships with your audience.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">03</span>
                            <h3 className="sp-deliver__item-title">Analytics &amp; Reporting</h3>
                            <p className="sp-deliver__item-desc">
                                Weekly and monthly performance reports with actionable insights to continuously refine your strategy.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">04</span>
                            <h3 className="sp-deliver__item-title">Copywriting</h3>
                            <p className="sp-deliver__item-desc">
                                On-brand captions, hashtag strategy, and platform-optimized copy that drives engagement and clicks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="sp-cta" aria-label="Start a project">
                <h2 className="sp-cta__headline">
                    READY TO<br />OWN YOUR FEED?
                </h2>
                <p className="sp-cta__sub">Stop posting. Start building a presence.</p>
                <AnimatedLink href="/#cta" className="sp-cta__button" text="START A PROJECT" />
            </section>
        </>
    );
}
