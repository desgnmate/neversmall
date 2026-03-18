"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLink from "./AnimatedLink";
import { useCMS } from "./cms/CMSProvider";

const SERVICES_ITEMS = [
    { label: "VIDEOGRAPHY", href: "/services/videography", desc: "High-impact video production for brands, campaigns, and short-form content.", image: "/images/videography.jpg" },
    { label: "PHOTOGRAPHY", href: "/services/photography", desc: "Clean, professional imagery for products, lifestyle, and storytelling.", image: "/images/photography-service.jpg" },
    { label: "SOCIAL MANAGEMENT", href: "/services/social-management", desc: "Strategic content planning and growth across social platforms.", image: "/images/social.jpg" },
    { label: "META ADS", href: "/services/meta-ads", desc: "Targeted campaigns focused on reach and measurable results.", image: "/images/ads.jpg" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar__logo-wrapper">
                <a href="/" className="navbar__logo" aria-label="Neversmall Studios home">
                    <Image
                        src="/images/logo.png"
                        alt="Neversmall Studios logo"
                        width={180}
                        height={36}
                        priority
                    />
                </a>
            </div>

            <div className="navbar__spacer"></div>

            <div className="navbar__actions">
                <a href="/#about" className="navbar__item navbar__item--no-border">ABOUT</a>
                <a href="/#projects" className="navbar__item navbar__item--no-border">PROJECTS</a>

                <div
                    className="navbar__item-wrapper"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <a href="/#services" className={`navbar__item navbar__item--no-border ${isDropdownOpen ? 'navbar__item--active' : ''}`}>
                        SERVICES
                    </a>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className="navbar__dropdown"
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                exit={{ opacity: 0, scaleY: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ transformOrigin: 'top' }}
                            >
                                <div className="navbar__dropdown-items">
                                    {SERVICES_ITEMS.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="navbar__dropdown-link"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <a href="/contact" className="navbar__item navbar__item--cta">GET IN TOUCH</a>
                <div className="navbar__end-cap"></div>
            </div>
        </nav>
    );
}
