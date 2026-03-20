"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import AnimatedLink from "../components/AnimatedLink";
import TeamSection from "../components/TeamSection";

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
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const approachCards = [
    {
        id: 1,
        title: "CLARITY",
        text: "EVERY PROJECT STARTS WITH UNDERSTANDING THE BRAND STORY. STRONG IDEAS CREATE STRONG VISUALS.",
        rotation: -4
    },
    {
        id: 2,
        title: "CRAFT",
        text: "WE OBSESS OVER DETAILS, COMPOSITION, AND STORYTELLING TO MAKE EVERY PIECE MEANINGFUL.",
        rotation: -4
    },
    {
        id: 3,
        title: "IMPACT",
        text: "CREATIVE WORK SHOULD MOVE PEOPLE, SPARK EMOTION, AND ELEVATE BRANDS.",
        rotation: -4
    }
];

const philosophyText = "Small thinking creates forgettable work. We believe in bold visuals, clear direction, and storytelling that connects brands with real people. Neversmall is about building creative work that stands out today and still matters tomorrow.";

interface WordProps {
    children: string;
    progress: any;
    range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [10, 0]);

    return (
        <span style={{ position: "relative", display: "inline-block", marginRight: "0.25em" }}>
            <motion.span style={{ opacity, y, display: "inline-block" }}>
                {children}
            </motion.span>
        </span>
    );
}

export default function About() {
    const approachRef = useRef<HTMLElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);

    // Approach Scroll progress
    const { scrollYProgress: approachScroll } = useScroll({
        target: approachRef,
        offset: ["start end", "end start"]
    });

    const approachSpring = useSpring(approachScroll, { stiffness: 150, damping: 25 });

    // Philosophy Scroll progress (tracking the entire long section)
    const { scrollYProgress: philosophyScroll } = useScroll({
        target: philosophyRef,
        offset: ["start start", "end end"]
    });

    const words = philosophyText.split(" ");

    return (
        <main className="page-wrapper about-page" style={{ backgroundColor: "#F6F6F6" }}>
            {/* ── Hero Section ── */}
            <section className="about-page__hero">
                <div className="about-page__hero-split">
                    <div className="about-page__hero-left" style={{ position: "relative" }}>
                        <Image
                            src="/images/about/about-hero-bg.jpg"
                            alt="Neversmall Team"
                            fill
                            style={{ objectFit: "cover", objectPosition: "top center" }}
                            priority
                        />
                    </div>
                    <div className="about-page__hero-right">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                width: "100%"
                            }}
                        >
                            <motion.h1
                                variants={fadeInUp}
                                className="about-page__hero-title"
                                style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0" }}
                            >
                                <span style={{ display: "block" }}>About Us  <span style={{ fontSize: "0.85em" }}>↘</span></span>
                            </motion.h1>

                            <motion.div
                                variants={fadeInUp}
                                className="about-page__hero-logo"
                                style={{ alignSelf: "center" }}
                            >
                                <Image
                                    src="/images/about/about-hero-logo.png"
                                    alt="Neversmall Icon"
                                    width={400}
                                    height={400}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                className="about-page__hero-paragraph"
                                style={{ margin: 0 }}
                            >
                                NEVERSMALL STUDIOS IS A CREATIVE PRODUCTION + SOCIAL STRATEGY STUDIO THAT BLENDS HIGH-END, EDITORIAL VISUALS WITH PLATFORM-NATIVE STORYTELLING TO HELP BRANDS GROW. UTILISING THE DIVERSE SKILL SETS OF OUR SPECIALISED TEAM MEMBERS. WE TURN BRAND IDENTITY INTO SHAREABLE CONTENT AND SCALABLE MARKETING.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Our Approach Section ── */}
            <section ref={approachRef} className="about-approach">
                <div style={{ textAlign: "center" }}>
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="about-section-headline"
                    >
                        Our Approach <span className="about-section-headline__arrow">↘</span>
                    </motion.h2>

                    <div className="about-approach__grid">
                        {approachCards.map((card, idx) => {
                            const start = 0.05 + (idx * 0.08);
                            const end = 0.25 + (idx * 0.08);
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const x = useTransform(approachSpring, [start, end], [400, 0]);
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const rotate = useTransform(approachSpring, [start + 0.1, end], [0, card.rotation]);

                            return (
                                <motion.div
                                    key={card.id}
                                    style={{
                                        x,
                                        rotate,
                                        backgroundColor: "var(--color-blue)",
                                        backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                                        // padding moved to CSS for responsive control
                                        color: "var(--color-white)",
                                        textAlign: "left",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "24px",
                                        transformOrigin: "center center",
                                        boxShadow: "0 30px 60px rgba(1, 40, 255, 0.2)",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                    className="about-approach__card"
                                >
                                    <div style={{
                                        position: "absolute",
                                        top: "-10%",
                                        left: "-10%",
                                        width: "120%",
                                        height: "120%",
                                        background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), linear-gradient(35deg, rgba(0,0,0,0.15) 0%, transparent 60%)",
                                        pointerEvents: "none",
                                        filter: "blur(2px)"
                                    }} />

                                    <h3 style={{
                                        fontFamily: "var(--font-header)",
                                        fontSize: "42px",
                                        fontWeight: 700,
                                        margin: 0,
                                        letterSpacing: "0.08em",
                                        position: "relative"
                                    }}>
                                        {card.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "16px",
                                        lineHeight: 1.4,
                                        margin: 0,
                                        opacity: 0.95,
                                        fontWeight: 600,
                                        position: "relative",
                                        maxWidth: "90%"
                                    }}>
                                        {card.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Our Philosophy Section (Sticky Wrapper) ── */}
            <div ref={philosophyRef} className="philosophy-scroll-container" style={{ height: "400vh", position: "relative", display: "block", zIndex: 10 }}>
                <section className="philosophy-section">
                    <div className="philosophy-card">
                        {/* Quote Icons */}
                        <div className="philosophy-quote philosophy-quote--top">
                            <Image src="/images/about/topquote.png" alt="Quote" width={60} height={60} />
                        </div>
                        <div className="philosophy-quote philosophy-quote--bottom">
                            <Image src="/images/about/bottomquote.png" alt="Quote" width={60} height={60} />
                        </div>

                        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                            <h2 className="about-section-headline" style={{ marginBottom: '40px' }}>
                                Our Philosophy <span className="about-section-headline__arrow">↘</span>
                            </h2>

                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(20px, 2.5vw, 32px)",
                                lineHeight: 1.3,
                                color: "var(--color-black)",
                                fontWeight: 700,
                                margin: "0 auto",
                                maxWidth: "900px",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            }}>
                                {words.map((word, i) => {
                                    const start = i / words.length;
                                    const end = (i + 1) / words.length;
                                    return <Word key={i} progress={philosophyScroll} range={[start, end]}>{word}</Word>
                                })}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Our Purpose Section ── */}
            <section className="about-purpose">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    style={{ maxWidth: "1200px", margin: "0 auto" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "100px" }}>
                        <motion.h2
                            variants={fadeInUp}
                            className="about-section-headline"
                        >
                            Our Purpose <span className="about-section-headline__arrow">↘</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "var(--color-black)",
                                opacity: 0.8
                            }}
                        >
                            What drives our work and where we are going.
                        </motion.p>
                    </div>

                    <div className="about-purpose__grid">
                        {/* Vision Column */}
                        <motion.div variants={fadeInUp} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <h3 style={{
                                fontFamily: "var(--font-header)",
                                fontSize: "42px",
                                fontWeight: 700,
                                color: "var(--color-black)",
                                letterSpacing: "0.05em",
                                margin: 0
                            }}>
                                VISION
                            </h3>
                            <div className="about-purpose__line" />
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "20px",
                                lineHeight: 1.5,
                                color: "var(--color-black)",
                                fontWeight: 500,
                                margin: 0,
                                opacity: 0.9
                            }}>
                                To create bold visual stories that help brands stand out, connect with people, and leave a lasting impression through thoughtful creative direction, production, and storytelling.
                            </p>
                        </motion.div>

                        {/* Mission Column */}
                        <motion.div variants={fadeInUp} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <h3 style={{
                                fontFamily: "var(--font-header)",
                                fontSize: "42px",
                                fontWeight: 700,
                                color: "var(--color-black)",
                                letterSpacing: "0.05em",
                                margin: 0
                            }}>
                                MISSION
                            </h3>
                            <div className="about-purpose__line" />
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "20px",
                                lineHeight: 1.5,
                                color: "var(--color-black)",
                                fontWeight: 500,
                                margin: 0,
                                opacity: 0.9
                            }}>
                                To become a globally recognized creative studio known for impactful visuals, meaningful storytelling, and creative work that pushes brands beyond the ordinary.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ── Brands Section ── */}
            <section className="about-brands" style={{
                position: "relative",
                width: "100%",
                backgroundColor: "#F6F6F6"
            }}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "hidden"
                }}>
                    <div style={{ width: "100%", position: "relative" }}>
                        {/* Overlay headline on the image's blue top area */}
                        <div className="brands-headline-wrapper">
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="about-section-headline"
                                style={{ color: 'var(--color-white)' }}
                            >
                                Brands we&apos;ve worked with <span className="about-section-headline__arrow">↘</span>
                            </motion.h2>
                        </div>

                        <Image
                            src="/images/about/brands.png"
                            alt="Brands we've worked with"
                            width={1920}
                            height={600}
                            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* ── Team Section ── */}
            <TeamSection />

            <section id="cta" className="cta" aria-label="Call to action">
                <motion.h2
                    className="cta__headline"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    LET&apos;S SCALE YOUR <br /> BRAND TOGETHER.
                </motion.h2>

                <motion.div
                    className="cta__content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.p className="cta__subhead" variants={fadeInUp}>Your vision, our support.</motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link href="/contact" className="cta__button">START A PROJECT</Link>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
