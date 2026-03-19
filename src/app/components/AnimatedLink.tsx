"use client";

import React from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
    href: string;
    text: string;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export default function AnimatedLink({ href, text, className, onClick, style }: AnimatedLinkProps) {
    return (
        <Link
            href={href}
            className={`animated-link ${className ?? ''}`}
            onClick={onClick}
            style={style}
        >
            <span className="sr-only">{text}</span>
            <span className="animated-link__inner" aria-hidden="true">
                <span className="span-mother">
                    {text.split("").map((char, index) => (
                        <span
                            key={index}
                            style={{ transition: `${Math.min(0.2 + (index * 0.1), 0.7)}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
                <span className="span-mother2">
                    {text.split("").map((char, index) => (
                        <span
                            key={index}
                            style={{ transition: `${Math.min(0.2 + (index * 0.1), 0.7)}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
            </span>
        </Link>
    );
}
