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

export default function MetaAdsPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="sp-hero" aria-label="Meta Ads hero">
                <div className="sp-hero__bg">
                    <Image
                        src="/images/meta-ads.jpg"
                        alt="Targeted Meta advertising campaigns"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="sp-hero__overlay" />
                <div className="sp-hero__content">
                    <p className="sp-hero__breadcrumb">
                        <a href="/">Home</a> / <a href="/#services">Services</a> / Meta Ads
                    </p>
                    <h1 className="sp-hero__title">META ADS</h1>
                    <p className="sp-hero__subtitle">Performance marketing that delivers results.</p>
                </div>
            </section>

            {/* Overview */}
            <section className="sp-overview" aria-label="Meta Ads overview">
                <div className="sp-overview__grid">
                    <h2 className="sp-overview__headline">
                        PAID MEDIA<br />
                        THAT PERFORMS.
                    </h2>
                    <div className="sp-overview__body">
                        <p className="sp-overview__text">
                            We build, manage, and optimize ad campaigns across Facebook and Instagram that are designed to scale. From awareness to conversion — every dollar is tracked, tested, and refined for maximum ROI.
                        </p>
                        <p className="sp-overview__text">
                            Our approach combines creative strategy with data-driven targeting. We don&apos;t just run ads — we build acquisition systems.
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
                            <h3 className="sp-deliver__item-title">Campaign Strategy</h3>
                            <p className="sp-deliver__item-desc">
                                Full-funnel campaign architecture — from cold audience prospecting to retargeting and conversion.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">02</span>
                            <h3 className="sp-deliver__item-title">Ad Creative</h3>
                            <p className="sp-deliver__item-desc">
                                Scroll-stopping ad creatives — static, video, and carousel — designed to outperform and iterate fast.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">03</span>
                            <h3 className="sp-deliver__item-title">Audience Targeting</h3>
                            <p className="sp-deliver__item-desc">
                                Precision audience building using lookalikes, custom audiences, interest stacking, and behavioral signals.
                            </p>
                        </div>
                        <div className="sp-deliver__item">
                            <span className="sp-deliver__number">04</span>
                            <h3 className="sp-deliver__item-title">Reporting &amp; Optimization</h3>
                            <p className="sp-deliver__item-desc">
                                Weekly performance dashboards with CPA, ROAS, and CTR breakdowns. We optimize continuously, not monthly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="sp-cta" aria-label="Start a project">
                <h2 className="sp-cta__headline">
                    READY TO<br />SCALE YOUR REACH?
                </h2>
                <p className="sp-cta__sub">Stop guessing. Start converting.</p>
                <AnimatedLink href="/#cta" className="sp-cta__button" text="START A PROJECT" />
            </section>
        </>
    );
}
