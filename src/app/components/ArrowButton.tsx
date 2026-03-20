"use client";

import React from "react";
import Link from "next/link";

interface ArrowButtonProps {
    href: string;
    text: string;
    variant?: "primary" | "light" | "dark";
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

/**
 * ArrowButton — A premium CTA button with a sliding arrow icon on hover.
 * Adapted from the Neversmall design language.
 *
 * Variants:
 *  - primary: Blue background, white text (default)
 *  - light: White background, blue text (for dark hero backgrounds)
 *  - dark: Black background, white text
 */
export default function ArrowButton({
    href,
    text,
    variant = "primary",
    className = "",
    style,
    onClick,
}: ArrowButtonProps) {
    return (
        <Link
            href={href}
            className={`ns-arrow-btn ns-arrow-btn--${variant} ${className}`}
            style={style}
            onClick={onClick}
        >
            <span className="ns-arrow-btn__text">{text}</span>
            <span className="ns-arrow-btn__icon" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </span>
        </Link>
    );
}
