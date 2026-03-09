"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "./cms/CMSProvider";

const BASE_TESTIMONIALS = [
    {
        id: "top",
        image: "/images/testimonial-top.jpg",
        headline: "INCREDIBLE ROI AND SEAMLESS EXECUTION.",
        body: "Working with Neversmall felt like a true partnership. They handled everything perfectly from start to finish.",
        name: "MATTHEW HARRIS",
        role: "CEO & Founder",
        rating: 5,
    },
    {
        id: "mid",
        image: "/images/testimonial-mid.jpg",
        headline: "OUR CAMPAIGNS FINALLY REACH THE RIGHT AUDIENCE.",
        body: "Trust her work, that the words that she delivered completely transformed our brand presence.",
        name: "AMANDA STEVENS",
        role: "Marketing Manager",
        rating: 5,
    },
    {
        id: "bot",
        image: "/images/testimonial-bot.jpg",
        headline: "THE DESIGN AND AESTHETICS ARE ON ANOTHER LEVEL.",
        body: "Their attention to detail and creative direction revolutionized how our customers perceive us globally.",
        name: "MICHAEL CHEN",
        role: "Creative Director",
        rating: 5,
    }
];

export default function Testimonials() {
    const { testimonials: cmsTestimonials } = useCMS();
    const baseTestimonials = cmsTestimonials.length > 0 ? cmsTestimonials : BASE_TESTIMONIALS;

    const displayTestimonials = useMemo(() => {
        return Array(150).fill(baseTestimonials).flat().map((t, idx) => ({
            ...t,
            uniqueId: `${t.id || idx}-${idx}`,
        }));
    }, [baseTestimonials]);

    const midIndex = Math.floor((150 * baseTestimonials.length) / 2);
    const [activeIndex, setActiveIndex] = useState(midIndex);

    useEffect(() => {
        setActiveIndex(Math.floor((150 * baseTestimonials.length) / 2));
    }, [baseTestimonials.length]);

    const handleUp = () => setActiveIndex((prev) => prev - 1);
    const handleDown = () => setActiveIndex((prev) => prev + 1);

    const safeActiveIndex = activeIndex < displayTestimonials.length ? activeIndex : 0;
    const activeTestimonial = displayTestimonials[safeActiveIndex];

    return (
        <section id="testimonials" className="testimonials" aria-label="Client testimonials">
            <div className="testimonials__bg" aria-hidden="true" />

            <div className="testimonials__header">
                <h2 className="testimonials__headline">
                    REAL WORDS FROM<br />OUR CLIENTS.
                </h2>
                <p className="testimonials__desc">
                    Trusted by brands that value strategy,<br />
                    creativity, and results.
                </p>
            </div>

            <div className="testimonials__content">
                {/* Left Side: Avatar Slider */}
                <div className="testimonials__slider">
                    <button
                        className="testimonials__nav-btn"
                        onClick={handleUp}
                        aria-label="Previous testimonial"
                    >
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 15L20 5L35 15" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="testimonials__avatar-container">
                        <motion.div
                            className="testimonials__avatar-track"
                            animate={{
                                y: -(activeIndex * 134 + 126)
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 120
                            }}
                        >
                            {displayTestimonials.map((t: any, idx: number) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={t.uniqueId}
                                        className={`testimonials__avatar ${isActive ? "is-active" : ""}`}
                                        onClick={() => setActiveIndex(idx)}
                                        aria-pressed={isActive}
                                        aria-label={`View testimonial from ${t.name}`}
                                    >
                                        <img
                                            src={t.image}
                                            alt={`${t.name} avatar`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </button>
                                );
                            })}
                        </motion.div>
                    </div>

                    <button
                        className="testimonials__nav-btn"
                        onClick={handleDown}
                        aria-label="Next testimonial"
                    >
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 5L20 15L35 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Right Side: Review Card */}
                <div className="testimonials__card">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTestimonial.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        >
                            <h3 className="testimonials__card-headline">
                                {activeTestimonial.headline}
                            </h3>
                            <p className="testimonials__card-body">
                                {activeTestimonial.body}
                            </p>

                            <div className="testimonials__card-footer">
                                <div className="testimonials__author">
                                    <span className="testimonials__author-name">{activeTestimonial.name}</span>
                                    <span className="testimonials__author-role">{activeTestimonial.role}</span>
                                </div>
                                <div className="testimonials__stars" aria-label={`${activeTestimonial.rating || 5} out of 5 stars`}>
                                    {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-yellow)">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
