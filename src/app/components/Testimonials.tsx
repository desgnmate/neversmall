"use client";

import { useState } from "react";

const BASE_TESTIMONIALS = [
    {
        id: "top",
        image: "/images/testimonial-top.jpg",
        headline: "INCREDIBLE ROI AND SEAMLESS EXECUTION.",
        body: "Working with Neversmall felt like a true partnership. They handled everything perfectly from start to finish.",
        name: "MATTHEW HARRIS",
        role: "CEO & Founder",
    },
    {
        id: "mid",
        image: "/images/testimonial-mid.jpg",
        headline: "OUR CAMPAIGNS FINALLY REACH THE RIGHT AUDIENCE.",
        body: "Trust her work, that the words that she delivered completely transformed our brand presence.",
        name: "AMANDA STEVENS",
        role: "Marketing Manager",
    },
    {
        id: "bot",
        image: "/images/testimonial-bot.jpg",
        headline: "THE DESIGN AND AESTHETICS ARE ON ANOTHER LEVEL.",
        body: "Their attention to detail and creative direction revolutionized how our customers perceive us globally.",
        name: "MICHAEL CHEN",
        role: "Creative Director",
    }
];

// Create an effectively infinite list by duplicating the items many times
export const TESTIMONIALS = Array(150).fill(BASE_TESTIMONIALS).flat().map((t, idx) => ({
    ...t,
    uniqueId: `${t.id}-${idx}`,
}));

export default function Testimonials() {
    // Start strictly in the middle of our large duplicated array (150 * 3 = 450 items)
    // index 225 corresponds to ID top. index 226 is ID mid.
    const [activeIndex, setActiveIndex] = useState(226);

    const handleUp = () => {
        setActiveIndex((prev) => prev - 1);
    };

    const handleDown = () => {
        setActiveIndex((prev) => prev + 1);
    };

    const activeTestimonial = TESTIMONIALS[activeIndex];

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
                        <div
                            className="testimonials__avatar-track"
                            style={{
                                // Top of track is at 50% of container (260px).
                                // Top of active item is (activeIndex * (110 + 24)) = activeIndex * 134.
                                // Distance to perfectly center the 252px tall active item: 252 / 2 = 126px.
                                transform: `translateY(-${activeIndex * 134 + 126}px)`
                            }}
                        >
                            {TESTIMONIALS.map((t, idx) => {
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
                        </div>
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
                    <h3 className="testimonials__card-headline" key={`headline-${activeTestimonial.id}`}>
                        {activeTestimonial.headline}
                    </h3>
                    <p className="testimonials__card-body" key={`body-${activeTestimonial.id}`}>
                        {activeTestimonial.body}
                    </p>

                    <div className="testimonials__card-footer" key={`footer-${activeTestimonial.id}`}>
                        <div className="testimonials__author">
                            <span className="testimonials__author-name">{activeTestimonial.name}</span>
                            <span className="testimonials__author-role">{activeTestimonial.role}</span>
                        </div>
                        <div className="testimonials__stars" aria-label="5 out of 5 stars">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-yellow)">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
