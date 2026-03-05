"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServiceItemProps {
    name: string;
    desc: string;
    image: string;
    href?: string;
}

export default function ServiceItem({ name, desc, image, href }: ServiceItemProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;

        // Get mouse position relative to the container block
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition({ x, y });
    };

    return (
        <div
            className="service-item"
            aria-label={`Service: ${name}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if (href) router.push(href);
            }}
        >
            <div className="service-item__bg" aria-hidden="true"></div>
            <div className="service-item__content" style={{ position: "relative", zIndex: 10 }}>
                <h3
                    className="service-item__title"
                    style={{
                        display: "inline-block",
                        width: "fit-content",
                        position: "relative",
                        zIndex: 20
                    }}
                >
                    {name}
                </h3>
                <p className="service-item__desc">{desc}</p>
            </div>
            <div
                className="service-item__image"
                aria-hidden="true"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered
                        ? `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0) scale(1) rotate(-4deg)`
                        : `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0) scale(0.9) rotate(0deg)`,
                    zIndex: 100, // Ensure it's above everything
                    pointerEvents: "none"
                }}
            >
                <Image
                    src={image}
                    alt={`${name}`}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
}
