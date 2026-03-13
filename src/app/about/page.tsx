"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedLink from "../components/AnimatedLink";
import BrandsSection from "../components/BrandsSection";
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
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export default function About() {
    return (
        <main className="page-wrapper about-page" style={{ backgroundColor: "#F6F6F6" }}>
            {/* ── Hero Section ── */}
            {/* ── Recreated Hero Section ── */}
            <section className="about-page__hero">
                <div className="about-page__hero-split">
                    <div className="about-page__hero-left">
                        <Image
                            src="/images/about/about-hero-bg.jpg"
                            alt="Neversmall Team"
                            fill
                            style={{ objectFit: "cover" }}
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
                                style={{ margin: 0 }}
                            >
                                ABOUT US
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

            {/* ── Info & Testimonial Section ── */}
            <section className="about-page__info">
                <motion.div
                    className="about-page__info-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >

                    {/* Column 1: Follow Us */}
                    <motion.div
                        variants={fadeInUp}
                        className="about-page__follow-us"
                        style={{ display: "flex", flexDirection: "column", gap: "32px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "24px" }}
                    >
                        <h4 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Follow Us
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(0,0,0,0.05)",
                                paddingBottom: "12px",
                                color: "var(--color-black)",
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(16px, 1.5vw, 20px)"
                            }}>
                                Instagram
                                <span style={{ fontSize: "16px" }}>↗</span>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(0,0,0,0.05)",
                                paddingBottom: "12px",
                                color: "var(--color-black)",
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(16px, 1.5vw, 20px)"
                            }}>
                                Youtube
                                <span style={{ fontSize: "16px" }}>↗</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2: Body Text with Drop Cap */}
                    <motion.div
                        variants={fadeInUp}
                        style={{ display: "flex", flexDirection: "column", gap: "40px" }}
                    >
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(16px, 1.6vw, 20px)",
                            lineHeight: 1.6,
                            color: "var(--color-black)",
                            position: "relative",
                            textAlign: "justify"
                        }}>
                            <span style={{
                                float: "left",
                                fontSize: "clamp(64px, 8vw, 84px)",
                                lineHeight: "0.8",
                                paddingRight: "16px",
                                fontFamily: "var(--font-header)",
                                fontWeight: 700,
                                color: "var(--color-black)"
                            }}>W</span>
                            ith years of experience in the creative industry, our team is driven by a passion for visual excellence and a deep love for storytelling. We believe every project deserves a unique lens. Neversmall Studios was created with a clear purpose: to make every brand journey impactful, seamless, and memorable.
                        </p>

                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(16px, 1.6vw, 20px)",
                            lineHeight: 1.6,
                            color: "var(--color-black)",
                            opacity: 0.8,
                            textAlign: "justify"
                        }}>
                            We prioritize communication and quality above all else. From the first discovery session to final delivery, your vision is our blueprint. Our creatives aren&apos;t just here to execute tasks; they&apos;re professionals who prioritize your brand&apos;s story and impact on the global stage.
                        </p>
                    </motion.div>

                    {/* Column 3: Testimonial Quote */}
                    <motion.div
                        variants={fadeInUp}
                        style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
                    >
                        <div style={{ fontSize: "64px", color: "var(--color-blue)", lineHeight: 1, fontFamily: "serif", marginBottom: "-40px" }}>&ldquo;</div>
                        <p style={{
                            fontFamily: "var(--font-header)",
                            fontSize: "24px",
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: "var(--color-black)"
                        }}>
                            Working with Neversmall was a transformation for our brand. They didn&apos;t just create content; they built an entire aesthetic that reflects exactly who we are.
                        </p>
                        <div style={{ fontSize: "64px", color: "var(--color-blue)", lineHeight: 1, fontFamily: "serif", textAlign: "right", marginTop: "-10px" }}>&rdquo;</div>

                        <div style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "24px" }}>
                            <div style={{ position: "relative", width: "48px", height: "48px", borderRadius: "4px", overflow: "hidden" }}>
                                <Image
                                    src="/images/testimonial-top.jpg"
                                    alt="Cynthia Summer"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div>
                                <h5 style={{ fontFamily: "var(--font-subheader)", fontSize: "14px", fontWeight: 700, textTransform: "uppercase" }}>Testimonial By</h5>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(0,0,0,0.5)" }}>Harold Lim</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>


            {/* ── Brands Section ── */}
            <section className="about-page__brands" style={{ padding: "80px 0" }}>
                {/* Visual - Brands */}
                <motion.div
                    className="about-page__brands-visual"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
                >
                    <Image
                        src="/images/about/brands-visual.jpg"
                        alt="Brands We've Worked With"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </motion.div>
            </section>


            {/* ── Team Section ── */}
            <TeamSection />

            {/* CTA section structured to match others */}
            <section className="cta" aria-label="Call to action">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.h2 className="cta__headline" variants={fadeInUp}>
                        LET&apos;S SCALE YOUR <br /> BRAND TOGETHER.
                    </motion.h2>
                    <motion.div className="cta__content" variants={fadeInUp}>
                        <p className="cta__subhead">Your vision, our support.</p>
                        <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
