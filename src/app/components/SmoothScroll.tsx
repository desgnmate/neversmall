"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Expose lenis globally for other components to access (like ScrollToTop)
        (window as any).lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const handleScrollLock = (e: any) => {
            if (e.detail?.lock) {
                lenis.stop();
            } else {
                lenis.start();
            }
        };

        window.addEventListener('cms:scroll-lock' as any, handleScrollLock);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
            window.removeEventListener('cms:scroll-lock' as any, handleScrollLock);
        };
    }, []);

    // Master Interceptor for Hash Links (Both Same-Page & Cross-Page)
    useEffect(() => {
        if (!lenisRef.current) return;

        const handleHashClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href) return;

            if (href.includes('#')) {
                const hashIndex = href.indexOf('#');
                const hashPart = href.substring(hashIndex);
                const pathPart = href.substring(0, hashIndex);

                const isSamePage = pathPart === '' || pathPart === window.location.pathname;

                if (isSamePage) {
                    const el = document.querySelector(hashPart);
                    if (el instanceof HTMLElement) {
                        e.preventDefault(); // Stop native jump

                        // Let Next.js handle URL history without native scroll
                        if (window.history.pushState) {
                            window.history.pushState(null, '', href);
                        }

                        // Use Lenis for buttery smooth scrolling
                        lenisRef.current?.scrollTo(el, {
                            offset: 0,
                            duration: 1.5,
                            immediate: false
                        });
                    }
                } else {
                    e.preventDefault(); // Block Next.js instant hash jump behavior

                    // Store intent to scroll upon landing
                    sessionStorage.setItem('pendingLenisHash', hashPart);

                    // Navigate to the base route cleanly (no hash) so it lands at the top first
                    window.location.href = pathPart || '/';
                }
            }
        };

        // Attach listener specifically for internal routing clicks
        // Use capture true so we can prevent Next.js Link from triggering!
        document.addEventListener('click', handleHashClick, { capture: true });
        return () => document.removeEventListener('click', handleHashClick, { capture: true });
    }, []);

    // Handle cross-page hash navigations
    useEffect(() => {
        if (!lenisRef.current) return;

        const pendingHash = sessionStorage.getItem('pendingLenisHash');
        if (pendingHash) {
            sessionStorage.removeItem('pendingLenisHash');
            const timer = setTimeout(() => {
                const target = document.querySelector(pendingHash);
                if (target instanceof HTMLElement) {
                    lenisRef.current?.scrollTo(target, {
                        offset: 0,
                        duration: 1.5, // Always smooth scroll, even across pages!
                        immediate: false
                    });

                    if (window.history.replaceState) {
                        window.history.replaceState(null, '', window.location.pathname + pendingHash);
                    }
                }
            }, 300);
            return () => clearTimeout(timer);
        } else {
            const hash = window.location.hash;
            if (hash) {
                // Direct visits
                const timer = setTimeout(() => {
                    const target = document.querySelector(hash);
                    if (target instanceof HTMLElement) {
                        lenisRef.current?.scrollTo(target, { offset: 0, duration: 1.5, immediate: false });
                    }
                }, 300);
                return () => clearTimeout(timer);
            }
        }
    }, [pathname]);


    return <>{children}</>;
}
