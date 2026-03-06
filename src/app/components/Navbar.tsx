"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES_ITEMS = [
    { label: "VIDEOGRAPHY", href: "/services/videography", desc: "High-impact video production for brands, campaigns, and short-form content.", image: "/images/videography-service.jpg" },
    { label: "PHOTOGRAPHY", href: "/services/photography", desc: "Clean, professional imagery for products, lifestyle, and storytelling.", image: "/images/photography.jpg" },
    { label: "SOCIAL MANAGEMENT", href: "/services/social-management", desc: "Strategic content planning and growth across social platforms.", image: "/images/social-management.jpg" },
    { label: "META ADS", href: "/services/meta-ads", desc: "Targeted campaigns focused on reach and measurable results.", image: "/images/meta-ads.jpg" },
];

const SplitText = ({ text }: { text: string }) => (
    <>
        <span className="span-mother" aria-hidden="true">
            {text.split("").map((c, i) => (
                <span key={i} style={{ transition: `${0.2 + i * 0.05}s` }}>
                    {c === " " ? "\u00A0" : c}
                </span>
            ))}
        </span>
        <span className="span-mother2" aria-hidden="true">
            {text.split("").map((c, i) => (
                <span key={i} style={{ transition: `${0.2 + i * 0.05}s` }}>
                    {c === " " ? "\u00A0" : c}
                </span>
            ))}
        </span>
        <span className="sr-only">{text}</span>
    </>
);

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const isServicePage = pathname.startsWith("/services/");
    const isOverlayPage = isServicePage; // Only service pages are overlay now

    const [isOpen, setIsOpen] = useState(false);
    const [activeService, setActiveService] = useState(0);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) close();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, close]);

    return (
        <>
            <nav className={`navbar ${isOverlayPage ? 'navbar--overlay' : 'navbar--solid'} ${isServicePage ? 'navbar--light' : ''}`} role="navigation" aria-label="Main navigation">
                <a href="/" className="navbar__logo" aria-label="Neversmall Studios home">
                    <Image
                        src="/images/logo.png"
                        alt="Neversmall Studios logo"
                        width={180}
                        height={36}
                        priority
                    />
                </a>

                <div className="navbar__actions">
                    <div className="navbar__links">
                        <a href="/#about" className="navbar__link animated-link">
                            <SplitText text="ABOUT" />
                        </a>
                        <a href="/projects" className="navbar__link animated-link">
                            <SplitText text="PROJECTS" />
                        </a>
                        <a href="/#services" className="navbar__link animated-link">
                            <SplitText text="SERVICES" />
                        </a>
                        <a href="/#testimonials" className="navbar__link animated-link">
                            <SplitText text="TESTIMONIALS" />
                        </a>
                    </div>
                    <a href="/contact" className="navbar__cta-link animated-link">
                        <SplitText text="GET IN TOUCH" />
                    </a>
                    <button
                        className={`navbar__hamburger ${isOpen ? "navbar__hamburger--active" : ""}`}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        type="button"
                        onClick={toggle}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <div
                className={`menu-overlay ${isOpen ? "menu-overlay--open" : ""} ${isHomePage ? "menu-overlay--home" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="menu-overlay__header">
                    <a href="/" className="menu-overlay__logo" aria-label="Neversmall Studios home" onClick={close}>
                        <Image
                            src="/images/logo.png"
                            alt="Neversmall Studios logo"
                            width={180}
                            height={36}
                        />
                    </a>
                    <button
                        className="menu-overlay__close"
                        aria-label="Close menu"
                        type="button"
                        onClick={close}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <nav className="menu-overlay__content">
                    {/* Desktop: Services View */}
                    <div className="menu-overlay__services-desktop">
                        <div className="menu-overlay__services-list">
                            {SERVICES_ITEMS.map((item, idx) => {
                                const isMarquee = item.label === "SOCIAL MANAGEMENT";
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={`menu-overlay__service-link animated-link ${activeService === idx ? 'menu-overlay__service-link--active' : ''} ${isMarquee ? 'menu-overlay__service-link--marquee' : ''}`}
                                        onClick={close}
                                        onMouseEnter={() => setActiveService(idx)}
                                        style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                                    >
                                        <div className="menu-overlay__service-label-wrapper">
                                            <span className="menu-overlay__service-label">
                                                <SplitText text={item.label} />
                                            </span>
                                            {isMarquee && (
                                                <span className="menu-overlay__service-label" aria-hidden="true">
                                                    <SplitText text={item.label} />
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="menu-overlay__details">
                            {SERVICES_ITEMS.map((item, idx) => (
                                <div key={idx} className={`menu-overlay__detail-card ${activeService === idx ? 'menu-overlay__detail-card--active' : ''}`}>
                                    <div className="menu-overlay__detail-image">
                                        <Image src={item.image} alt={item.label} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="menu-overlay__detail-info">
                                        <p className="menu-overlay__detail-desc">{item.desc}</p>
                                        <a href={item.href} className="menu-overlay__detail-btn animated-link" onClick={close}>
                                            <SplitText text="EXPLORE SERVICE" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: Page Navigation */}
                    <div className="menu-overlay__navigation-mobile">
                        <a href="/#about" className="menu-overlay__nav-link animated-link" onClick={close}>
                            <SplitText text="ABOUT" />
                        </a>
                        <a href="/projects" className="menu-overlay__nav-link animated-link" onClick={close}>
                            <SplitText text="PROJECTS" />
                        </a>
                        <a href="/#services" className="menu-overlay__nav-link animated-link" onClick={close}>
                            <SplitText text="SERVICES" />
                        </a>
                        <a href="/#testimonials" className="menu-overlay__nav-link animated-link" onClick={close}>
                            <SplitText text="TESTIMONIALS" />
                        </a>
                        <a href="/contact" className="menu-overlay__nav-link animated-link" onClick={close}>
                            <SplitText text="CONTACT" />
                        </a>
                    </div>
                </nav>

                <div className="menu-overlay__footer">
                    <div className="menu-overlay__socials">
                        <a href="https://www.instagram.com/neversmall.studios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#menuIg)">
                                    <path d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70313 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3313 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2813 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z" fill="currentColor" />
                                    <path d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z" fill="currentColor" />
                                    <path d="M39.6937 11.1843C39.6937 12.778 38.4 14.0624 36.8156 14.0624C35.2219 14.0624 33.9375 12.7687 33.9375 11.1843C33.9375 9.59054 35.2313 8.30616 36.8156 8.30616C38.4 8.30616 39.6937 9.59991 39.6937 11.1843Z" fill="currentColor" />
                                </g>
                                <defs><clipPath id="menuIg"><rect width="48" height="48" fill="white" /></clipPath></defs>
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@neversmall.studios" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/neversmall-studios/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#menuLi)">
                                    <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4063 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4063 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39063 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39063 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z" fill="currentColor" />
                                </g>
                                <defs><clipPath id="menuLi"><rect width="48" height="48" fill="white" /></clipPath></defs>
                            </svg>
                        </a>
                    </div>
                    <span className="menu-overlay__email">hello@neversmall.studio</span>
                </div>
            </div>
        </>
    );
}
