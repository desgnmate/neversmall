"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS } from "../data/brands";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function BrandsSection() {
    // Duplicate brands for seamless loop
    const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

    return (
        <section className="brands-section" aria-label="Brands we've worked with" style={{ padding: '80px 0 100px', backgroundColor: '#FFF' }}>
            <div className="section-container" style={{ padding: '0 40px', marginBottom: '60px' }}>
                <div className="brands-section__header">
                    <h2 className="brands-section__title" style={{ fontFamily: 'var(--font-header)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>BRANDS WE&apos;VE WORKED WITH</h2>
                </div>
            </div>

            <div className="brands-section__marquee-wrapper">
                <motion.div
                    className="brands-section__marquee-track"
                    animate={{
                        x: [0, -100 * BRANDS.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedBrands.map((brand, idx) => (
                        <div key={`${brand.id}-${idx}`} className="brands-section__brand">
                            <div className="brands-section__logo-wrapper">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={150}
                                    height={80}
                                    className="brands-section__logo"
                                    sizes="150px"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
