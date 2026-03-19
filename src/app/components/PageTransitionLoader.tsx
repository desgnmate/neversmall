"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransitionLoader() {
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);
    const prevPathname = useRef(pathname);

    useEffect(() => {
        // Only trigger transition if the route actually changes
        if (pathname !== prevPathname.current) {
            setIsActive(true);

            // 1s duration as requested
            const timer = setTimeout(() => {
                setIsActive(false);
            }, 1000);

            prevPathname.current = pathname;
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    // Grid Configuration (Same as Initial Loader for consistency)
    const rows = 12;
    const cols = 20;
    const totalTiles = rows * cols;

    // Center-Out staggered calculation (faster for 1s)
    const calculateDelay = (index: number) => {
        const r = Math.floor(index / cols);
        const c = index % cols;
        const centerX = (cols - 1) / 2;
        const centerY = (rows - 1) / 2;
        const distance = Math.sqrt(Math.pow(c - centerX, 2) + Math.pow(r - centerY, 2));

        // Higher speed factor for the 1s transition
        return distance * 0.02;
    };

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    id="page-transition-loader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }} // Exit starts after tiles begin revealing
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 99998, // Just below initial loader but above everything else
                        pointerEvents: 'none',
                    }}
                >
                    {/* Tile Grid Transition */}
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
                                    scale: 0.2,
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.65, 0, 0.35, 1],
                                        delay: calculateDelay(i)
                                    }
                                }}
                                style={{
                                    backgroundColor: '#FFFFFF', // White for page transitions
                                    width: '100.5%',
                                    height: '100.5%',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
