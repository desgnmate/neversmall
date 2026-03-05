import React from 'react';
import Link from 'next/link';

const AnimatedLink = ({ href, text, className, style }: { href: string; text: string; className?: string; style?: React.CSSProperties }) => {
    return (
        <Link href={href} className={`animated-link ${className || ""}`} style={style}>
            <span className="span-mother" aria-hidden="true">
                {text.split("").map((char, index) => (
                    <span key={index} style={{ transition: `${0.2 + index * 0.05}s` }}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className="span-mother2" aria-hidden="true">
                {text.split("").map((char, index) => (
                    <span key={index} style={{ transition: `${0.2 + index * 0.05}s` }}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className="sr-only">{text}</span>
        </Link>
    );
};

export default AnimatedLink;
