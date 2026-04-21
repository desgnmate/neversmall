"use client";

import React from "react";
import Link from "next/link";

interface ArrowButtonProps {
    href?: string;
    text: string;
    variant?: "primary" | "light" | "dark";
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

/**
 * ArrowButton — A premium CTA button with a sliding arrow icon on hover.
 */
export default function ArrowButton({
    href,
    text,
    variant = "primary",
    className = "",
    style,
    onClick,
    type,
    disabled = false
}: ArrowButtonProps) {
    const content = (
        <>
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
        </>
    );

    const commonProps = {
        className: `ns-arrow-btn ns-arrow-btn--${variant} ${className}`,
        style,
        onClick
    };

    if (type) {
        return (
            <button {...commonProps} type={type} disabled={disabled}>
                {content}
            </button>
        );
    }

    return (
        <Link href={href || "#"} {...commonProps}>
            {content}
        </Link>
    );
}
