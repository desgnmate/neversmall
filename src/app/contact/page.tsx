"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedLink from "../components/AnimatedLink";
import { useCMS } from "../components/cms/CMSProvider";

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

const inputStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,0.1)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    color: "var(--color-black)",
    outline: "none",
    boxShadow: "none",
    marginTop: "8px",
};

const labelStyle = {
    fontFamily: "var(--font-subheader)",
    fontSize: "16px",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "var(--color-black)",
    display: "block",
    letterSpacing: "0.05em"
};

export default function Contact() {
    const { contactSettings } = useCMS();

    return (
        <main className="page-wrapper contact-page" style={{ backgroundColor: "#F6F6F6", paddingBottom: "120px" }}>

            {/* ── Header Section ── */}
            <section style={{ padding: "140px 60px 80px" }} className="contact-page__header">
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr",
                        gap: "60px",
                        alignItems: "end"
                    }}
                    className="contact-page__header-grid"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp}>
                        <h1 style={{
                            fontFamily: "var(--font-header)",
                            fontSize: "clamp(60px, 12vw, 140px)",
                            lineHeight: 0.85,
                            letterSpacing: "-0.04em",
                            color: "var(--color-blue)",
                            fontWeight: 700,
                            margin: 0,
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "20px"
                        }}>
                            Contact Us <span style={{ fontSize: "0.8em" }}>↘</span>
                        </h1>
                    </motion.div>
                    <motion.div style={{ justifySelf: "end" }} variants={fadeInUp}>
                        <p style={{
                            fontFamily: "var(--font-header)",
                            fontSize: "clamp(18px, 1.8vw, 24px)",
                            lineHeight: 1.25,
                            color: "var(--color-black)",
                            margin: 0,
                            textAlign: "right",
                            maxWidth: "400px",
                            fontWeight: 600
                        }}>
                            Tell us about your project and we&apos;ll confirm availability within 24 hours.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Content Section: Form & Image ── */}
            <section style={{ padding: "0 60px 100px" }}>
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: "80px",
                        alignItems: "start"
                    }}
                    className="contact-page__content-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >

                    {/* Form Area */}
                    <motion.div style={{ display: "flex", flexDirection: "column", gap: "32px" }} className="contact-form" variants={fadeInUp}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="contact-form__row">
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Name</label>
                                <input type="text" placeholder="Your full name" style={inputStyle} />
                            </div>
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Email</label>
                                <input type="email" placeholder="you@example.com" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="contact-form__row">
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Phone Number</label>
                                <input type="tel" placeholder="+1 234 567 8900" style={inputStyle} />
                            </div>
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Your Website / Instagram</label>
                                <input type="text" placeholder="www.website.com/@yourname" style={inputStyle} />
                            </div>
                        </div>

                        <div className="contact-form__group">
                            <label style={labelStyle as any}>Tell Us More</label>
                            <textarea
                                placeholder="Drop the details here - what you need, the vision, timelines, and anything else we should know."
                                style={{ ...inputStyle, minHeight: "200px", resize: "none" }}
                            />
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <AnimatedLink
                                href={contactSettings?.cta_link || "/contact"}
                                className="cta__button"
                                text={contactSettings?.cta_text || "START A PROJECT"}
                                style={{
                                    backgroundColor: "var(--color-blue)",
                                    padding: "20px 40px",
                                    fontSize: "14px",
                                    letterSpacing: "0.1em"
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Image Area */}
                    <motion.div
                        variants={fadeInUp}
                        style={{ position: "relative", width: "100%", height: "100%", minHeight: "600px", overflow: "hidden" }}>
                        <Image
                            src="/images/about_section_team.jpg" // Using the team portrait
                            alt="Contact Us Journey"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Contact Info Tri-Column ── */}
            <section style={{ padding: "60px 60px" }}>
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "60px",
                        textAlign: "center",
                        borderTop: "1px solid rgba(0,0,0,0.1)",
                        paddingTop: "100px"
                    }}
                    className="contact-page__info-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >

                    {/* Block 1 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }} variants={fadeInUp}>
                        <div style={{ width: "48px", height: "48px", border: "1px solid rgba(0,0,0,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-header)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Call & WhatsApp</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", margin: 0, opacity: 0.8, letterSpacing: "0.2em" }}>
                            {contactSettings?.phone || "0432 300 709"}
                        </p>
                    </motion.div>

                    {/* Block 2 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }} variants={fadeInUp}>
                        <div style={{ width: "48px", height: "48px", border: "1px solid rgba(0,0,0,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-header)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Location</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", margin: 0, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {contactSettings?.location || "Melbourne, VIC"}
                        </p>
                    </motion.div>

                    {/* Block 3 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }} variants={fadeInUp}>
                        <div style={{ width: "48px", height: "48px", border: "1px solid rgba(0,0,0,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-header)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Write to Us</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", margin: 0, opacity: 0.8, letterSpacing: "0.05em" }}>
                            {contactSettings?.email || "hello@neversmall.studio"}
                        </p>
                    </motion.div>

                </motion.div>
            </section>

        </main>
    );
}
