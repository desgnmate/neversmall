"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItemProps {
    name: string;
    desc: string;
    image: string;
    href?: string;
}

export default function ServiceItem({ name = "", desc = "", image = "", href }: ServiceItemProps) {
    if (!name && !desc) return null; // Defensive check for completely empty data
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Store mouse position in state for the "snap-on-enter" logic
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update position BEFORE showing the image to ensure it snaps to cursor
        setMousePos({ x, y });
        setIsHovered(true);
    };

    return (
        <motion.div
            className="service-item"
            aria-label={`Service: ${name}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if (href) router.push(href);
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="service-item__bg" aria-hidden="true"></div>
            <div className="service-item__content">
                <h3 className="service-item__title">
                    {name}
                </h3>
                <p className="service-item__desc">{desc}</p>
            </div>
        </motion.div>
    );
}
