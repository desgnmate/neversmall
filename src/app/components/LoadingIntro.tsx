"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LoadingIntro() {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Only show the main intro on the homepage (initial entry or refresh)
        if (pathname !== '/') {
            setLoading(false);
            return;
        }

        // Lock scrolling while loading
        document.body.style.overflow = 'hidden';

        // 1.8s duration for the whole sequence
        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = 'auto';
        }, 1800);

        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, [pathname]);

    // Shared container variant for coordinated fade out
    // Added fixed x/y positioning to prevent shifting during transform/exit
    const containerVariants = {
        exit: {
            opacity: 0,
            scale: 0.95,
            x: "-50%", // Keep centered
            y: "-50%", // Keep centered
            transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as any }
        }
    };

    // Grid configuration
    const rows = 12;
    const cols = 20;
    const totalTiles = rows * cols;

    const calculateDelay = (index: number) => {
        const r = Math.floor(index / cols);
        const c = index % cols;
        const centerX = (cols - 1) / 2;
        const centerY = (rows - 1) / 2;
        const distance = Math.sqrt(Math.pow(c - centerX, 2) + Math.pow(r - centerY, 2));
        return 1.1 + (distance * 0.035);
    };

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    id="loading-intro"
                    className="loading-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 99999,
                    }}
                >
                    {/* Tile Grid */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    }}>
                        {[...Array(totalTiles)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1.05 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.1,
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.65, 0, 0.35, 1],
                                        delay: calculateDelay(i) - 1.1
                                    }
                                }}
                                style={{
                                    backgroundColor: '#0026FF',
                                    width: '100.5%',
                                    height: '100.5%',
                                }}
                            />
                        ))}
                    </div>

                    {/* Logo Reveal Sequence - Wrapped for Coordinated Exit */}
                    <motion.div
                        variants={containerVariants}
                        initial={{ opacity: 1, x: "-50%", y: "-50%" }}
                        animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                        exit="exit"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            zIndex: 100000,
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'min(24px, 3vw)',
                            width: 'auto'
                        }}>
                            {/* ICON */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.1, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{
                                    position: 'relative',
                                    width: 'min(100px, 12vw)',
                                    height: 'min(100px, 12vw)',
                                    filter: 'brightness(0) invert(1)'
                                }}
                            >
                                <Image src="/images/logo/logo-icon.png" alt="Icon" fill priority style={{ objectFit: 'contain' }} />
                            </motion.div>

                            {/* TEXT */}
                            <motion.div
                                initial={{ width: 0, opacity: 0, x: -10 }}
                                animate={{ width: "min(300px, 55vw)", opacity: 1, x: 0 }}
                                transition={{
                                    width: { duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] },
                                    opacity: { duration: 0.4, delay: 0.4 },
                                    x: { duration: 0.6, delay: 0.4 }
                                }}
                                style={{
                                    position: 'relative',
                                    height: 'min(64px, 12vw)',
                                    overflow: 'hidden',
                                    filter: 'brightness(0) invert(1)',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Image src="/images/logo/logo-text.png" alt="Logo Text" fill priority style={{ objectFit: 'contain', objectPosition: 'left' }} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
