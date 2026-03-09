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
    fontSize: "16px",
    color: "var(--color-black)",
    outline: "none",
    boxShadow: "none",
    marginTop: "8px",
};

const labelStyle = {
    fontFamily: "var(--font-subheader)",
    fontSize: "20px",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "var(--color-black)",
    display: "block"
};

export default function Contact() {
    const { contactSettings } = useCMS();
    return (
        <main className="page-wrapper contact-page" style={{ backgroundColor: "#F6F6F6", paddingBottom: "120px" }}>

            {/* ── Header Section ── */}
            <section style={{ padding: "120px 40px 75px", position: "relative" }} className="contact-page__header">
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: "80px",
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
                            fontSize: "clamp(48px, 10vw, 100px)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.04em",
                            color: "var(--color-black)",
                            textTransform: "uppercase",
                            margin: 0
                        }}>
                            Contact Us
                        </h1>
                    </motion.div>
                    <motion.div style={{ justifySelf: "start" }} variants={fadeInUp}>
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "20px",
                            lineHeight: 1.5,
                            color: "var(--color-black)",
                            margin: 0,
                            textAlign: "left",
                            maxWidth: "480px"
                        }}>
                            Tell us about your project and we&apos;ll confirm availability within 24 hours.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Content Section: Form & Image ── */}
            <section style={{ padding: "0 40px 80px" }}>
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: "80px",
                        alignItems: "stretch"
                    }}
                    className="contact-page__content-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >

                    {/* Form Area */}
                    <motion.div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="contact-form" variants={fadeInUp}>
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
                                <label style={labelStyle as any}>Select Service</label>
                                <select style={{ ...inputStyle, appearance: "none", borderRadius: 0 }}>
                                    <option>Video Production</option>
                                    <option>Photography</option>
                                    <option>Brand Identity</option>
                                    <option>Social Media</option>
                                    <option>Meta Ads</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="contact-form__row">
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Preferred Date</label>
                                <input type="date" style={inputStyle} />
                            </div>
                            <div className="contact-form__group">
                                <label style={labelStyle as any}>Project Budget</label>
                                <input type="text" placeholder="$5k - $10k" style={inputStyle} />
                            </div>
                        </div>

                        <div className="contact-form__group">
                            <label style={labelStyle as any}>Message / Special Requests</label>
                            <textarea
                                placeholder="Anything else we should know?"
                                style={{ ...inputStyle, minHeight: "160px", resize: "vertical" }}
                            />
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <AnimatedLink
                                href={contactSettings?.cta_link || "/contact"}
                                className="cta__button"
                                text={contactSettings?.cta_text || "START A PROJECT"}
                            />
                        </div>
                    </motion.div>

                    {/* Image Area */}
                    <motion.div
                        variants={fadeInUp}
                        style={{ position: "relative", width: "100%", aspectRatio: "3.2/2", overflow: "hidden" }}>
                        <Image
                            src="/images/about_image.jpg" // Using an existing project image
                            alt="Contact Us Journey"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Contact Info Tri-Column ── */}
            <section style={{ padding: "60px 40px" }}>
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "40px",
                        textAlign: "center",
                        borderTop: "1px solid rgba(0,0,0,0.1)",
                        paddingTop: "60px"
                    }}
                    className="contact-page__info-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >

                    {/* Block 1 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} variants={fadeInUp}>
                        <div style={{ width: "40px", height: "40px", border: "1px solid var(--color-black)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "16px" }}>☎</span>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Call & WhatsApp</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.5, margin: 0, opacity: 0.8 }}>
                            {contactSettings?.phone || "0432 300 709"}
                        </p>
                    </motion.div>

                    {/* Block 2 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} variants={fadeInUp}>
                        <div style={{ width: "40px", height: "40px", border: "1px solid var(--color-black)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "16px" }}>⌂</span>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Location</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.5, margin: 0, opacity: 0.8, whiteSpace: "pre-line" }}>
                            {contactSettings?.location || "Melbourne, VIC\nAustralia"}
                        </p>
                    </motion.div>

                    {/* Block 3 */}
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} variants={fadeInUp}>
                        <div style={{ width: "40px", height: "40px", border: "1px solid var(--color-black)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "16px" }}>✉</span>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-subheader)", fontSize: "24px", fontWeight: 700, margin: 0 }}>Write to Us</h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.5, margin: 0, opacity: 0.8 }}>
                            {contactSettings?.email || "hello@neversmall.studio"}
                        </p>
                    </motion.div>

                </motion.div>
            </section>

        </main>
    );
}
