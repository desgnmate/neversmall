"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SERVICES_ITEMS = [
    { label: "VIDEOGRAPHY", href: "/services/videography", desc: "High-impact video production for brands, campaigns, and short-form content.", image: "/images/videography.jpg" },
    { label: "PHOTOGRAPHY", href: "/services/photography", desc: "Clean, professional imagery for products, lifestyle, and storytelling.", image: "/images/photography-service.jpg" },
    { label: "SOCIAL MANAGEMENT", href: "/services/social-management", desc: "Strategic content planning and growth across social platforms.", image: "/images/social.jpg" },
    { label: "META ADS", href: "/services/meta-ads", desc: "Targeted campaigns focused on reach and measurable results.", image: "/images/ads.jpg" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPageScrolled, setIsPageScrolled] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Close menu on navigation 
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Scroll listener for detail pages transparency transition and general scroll bg
    useEffect(() => {
        const handleScroll = (customScrollY?: number) => {
            const scrollY = typeof customScrollY === 'number' ? customScrollY : window.scrollY;

            // Threshold for detail pages (transparent to white)
            const detailThreshold = window.innerHeight * 0.9;
            setIsScrolled(scrollY > detailThreshold);

            // Threshold for white background on scroll (homepage/about)
            setIsPageScrolled(scrollY > 10);
        };

        // Check for lightbox
        const checkLightbox = () => {
            const lightbox = document.querySelector('.lightbox');
            setIsLightboxOpen(!!lightbox);
        };

        const interval = setInterval(checkLightbox, 500);

        // For Lenis compatibility, we also listen to the lenis scroll event if available
        const checkLenis = setInterval(() => {
            const lenis = (window as any).lenis;
            if (lenis) {
                lenis.on('scroll', (e: any) => {
                    handleScroll(e.scroll);
                });
                // Initial check in case it's already scrolled
                handleScroll(lenis.scroll);
                clearInterval(checkLenis);
            }
        }, 500);

        window.addEventListener('scroll', () => handleScroll(), { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', () => handleScroll());
            clearInterval(interval);
            clearInterval(checkLenis);
            const lenis = (window as any).lenis;
            if (lenis) {
                lenis.off('scroll', handleScroll);
            }
        };
    }, []);

    const isDetailPage = pathname.includes('/projects/') || pathname.includes('/services/');

    // Only apply transparent logic if on a detail page AND not scrolled past detail threshold
    const showTransparent = isDetailPage && !isScrolled;

    return (
        <>
            <button
                className={`navbar__hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                style={{
                    position: 'fixed',
                    right: 'var(--grid-margin, 40px)',
                    top: '25px',
                    zIndex: 30000,
                    display: isLightboxOpen ? 'none' : 'flex'
                }}
            >
                <div className="navbar__hamburger-box">
                    <span className="navbar__hamburger-inner" style={{
                        backgroundColor: (showTransparent && !isMenuOpen) ? 'var(--color-white)' : 'var(--color-black)',
                        '--bar-color': (showTransparent && !isMenuOpen) ? 'var(--color-white)' : 'var(--color-black)'
                    } as any}></span>
                </div>
            </button>

            <nav
                className={`navbar ${showTransparent ? 'navbar--transparent' : ''} ${isPageScrolled ? 'navbar--scrolled' : 'navbar--at-top'}`}
                role="navigation"
                aria-label="Main navigation"
                style={{
                    backgroundColor: showTransparent ? 'transparent' : '#FFFFFF',
                    borderBottom: isPageScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="navbar__logo-wrapper">
                    <Link href="/" className="navbar__logo" aria-label="Neversmall Studios home">
                        <Image
                            src="/images/logo.png"
                            alt="Neversmall Studios logo"
                            width={180}
                            height={36}
                            priority
                        />
                    </Link>
                </div>

                <div className="navbar__spacer"></div>

                <div className="navbar__actions">
                    <Link href="/#about" className="navbar__item navbar__item--no-border">ABOUT</Link>
                    <Link href="/#projects" className="navbar__item navbar__item--no-border">PROJECTS</Link>

                    <div
                        className="navbar__item-wrapper"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <Link href="/#services" className={`navbar__item navbar__item--no-border ${isDropdownOpen ? 'navbar__item--active' : ''}`}>
                            SERVICES
                        </Link>
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
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="navbar__dropdown-link"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/contact" className="navbar__item navbar__item--cta">GET IN TOUCH</Link>

                    <div className="navbar__end-cap"></div>
                </div>
            </nav>


            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="navbar__mobile-menu"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >

                        <div className="navbar__mobile-items">
                            <Link href="/#about" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
                            <Link href="/#projects" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>PROJECTS</Link>
                            <Link href="/#services" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>SERVICES</Link>
                            <Link href="/contact" className="navbar__mobile-link navbar__mobile-link--cta" onClick={() => setIsMenuOpen(false)}>START A PROJECT</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
