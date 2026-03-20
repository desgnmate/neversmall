"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { fetchServiceBySlug, type Service } from "../../lib/supabase";
import Link from "next/link";
import AnimatedLink from "../../components/AnimatedLink";
import ArrowButton from "../../components/ArrowButton";
import Footer from "../../components/Footer";

// We'll use a client component here because CMS data might change and we want to see it immediately
// or we can use a server component if we don't care about real-time without re-deploy.
// Given the user is in dev, and CMS is active, live fetching is better.

export default function DynamicServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchServiceBySlug(slug);
            setService(data);
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) return null;

    if (!service) {
        notFound();
    }

    return (
        <main className="service-wrapper">
            {/* Hero */}
            <section className="sp-hero" aria-label={`${service.name} hero`}>
                <div className="sp-hero__bg">
                    <video
                        src={service.video || `/videos/${service.name.toLowerCase().replace(/\s+/g, '-')}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="sp-hero__overlay" />
                <div className="sp-hero__content">
                    <p className="sp-hero__breadcrumb">
                        <Link href="/">HOME</Link> / <Link href="/#services">SERVICES</Link> / {service.name}
                    </p>
                    <h1 className="sp-hero__title">
                        {service.page_headline ? service.page_headline.toUpperCase() : service.name.toUpperCase()}
                    </h1>
                    <p className="sp-hero__subtitle">
                        {service.page_subheadline || service.description}
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="sp-overview" aria-label="Overview">
                <div className="sp-overview__grid">
                    <h2 className="sp-overview__headline" style={{ whiteSpace: 'pre-line' }}>
                        {service.page_overview_title
                            ? service.page_overview_title.toUpperCase()
                            : `${service.name.toUpperCase()}\nSOLUTIONS.`}
                    </h2>
                    <div className="sp-overview__body">
                        {service.page_overview_content ? (
                            <div
                                className="sp-overview__text"
                                style={{ whiteSpace: "pre-wrap", opacity: 0.8 }}
                            >
                                {service.page_overview_content}
                            </div>
                        ) : service.content ? (
                            <div
                                className="sp-overview__text"
                                style={{ whiteSpace: "pre-wrap", opacity: 0.8 }}
                            >
                                {service.content}
                            </div>
                        ) : (
                            <p className="sp-overview__text" style={{ opacity: 0.8 }}>
                                {service.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            {service.page_deliverables && service.page_deliverables.length > 0 && (
                <section className="sp-deliver" aria-label="What we deliver">
                    <div className="sp-deliver__inner">
                        <h2 className="sp-deliver__headline">WHAT WE DELIVER</h2>
                        <div className="sp-deliver__grid">
                            {service.page_deliverables.map((del, idx) => (
                                <div key={idx} className="sp-deliver__item">
                                    <span className="sp-deliver__number">{(idx + 1).toString().padStart(2, '0')}</span>
                                    <h3 className="sp-deliver__item-title">{del.title}</h3>
                                    <p className="sp-deliver__item-desc">
                                        {del.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="cta" aria-label="Start a project">
                <h2 className="cta__headline">
                    LET&apos;S WORK<br />TOGETHER.
                </h2>
                <div className="cta__content">
                    <p className="cta__subhead">Your project deserves Neversmall quality.</p>
                    <ArrowButton href="/contact" text="START A PROJECT" variant="primary" />
                </div>
            </section>
        </main>
    );
}
