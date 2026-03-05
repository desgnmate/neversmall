import React from 'react';

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
    return (
        <span className={`animated-text ${className || ""}`}>
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
        </span>
    );
};

export default AnimatedText;
