"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM } from "../data/team";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export default function TeamSection() {
    return (
        <section className="team-section" aria-label="Our Team">
            <div className="section-container">
                <motion.div
                    className="team-section__header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h2 className="team-section__title" style={{ textTransform: "none" }}>Our Team <span style={{ fontSize: "0.8em" }}>↘</span></h2>
                </motion.div>

                <motion.div
                    className="team-section__grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {TEAM.map((member) => (
                        <motion.div key={member.id} className="team-section__member" variants={fadeInUp}>
                            <div className="team-section__image-wrapper">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="team-section__image"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 300px"
                                />
                            </div>
                            <div className="team-section__info">
                                <div className="team-section__name-box">
                                    <h3 className="team-section__member-name">{member.name}</h3>
                                </div>
                                <div className="team-section__details">
                                    <span className="team-section__member-role">{member.role}</span>
                                    <a href={`mailto:${member.email}`} className="team-section__member-email">
                                        {member.email}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
