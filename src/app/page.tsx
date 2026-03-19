"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ServiceItem from "./components/ServiceItem";
import ProjectGallery from "./components/ProjectGallery";
import AnimatedLink from "./components/AnimatedLink";
import BrandsSection from "./components/BrandsSection";
import TeamSection from "./components/TeamSection";

const MARQUEE_WORDS = [
  "VIDEOGRAPHY",
  "PHOTOGRAPHY",
  "SOCIAL MANAGEMENT",
  "META ADS",
];

const SERVICES = [
  { name: "VIDEOGRAPHY", description: "High-impact video production for brands, campaigns, events, and short-form content.", video: "/videos/videography.mp4", href: "/services/videography" },
  { name: "PHOTOGRAPHY", description: "Clean, professional imagery for products, campaigns, lifestyle, and brand storytelling.", video: "/videos/photography.mp4", href: "/services/photography" },
  { name: "SOCIAL MANAGEMENT", description: "Strategic content planning, publishing, and growth management across social platforms.", video: "/videos/social-management.mp4", href: "/services/social-management" },
  { name: "META ADS", description: "Targeted ad campaigns focused on reach, engagement, and measurable performance.", video: "/videos/meta-ads.mp4", href: "/services/meta-ads" }
];

const NAV_LINKS = ["ABOUT", "PROJECTS", "SERVICES"];

import { useCMS } from "./components/cms/CMSProvider";
import { PROJECTS as BACKUP_PROJECTS } from "./data/projects";

// Animation Variants
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
      delayChildren: 0.2
    }
  }
};


export default function Home() {
  const { projects: cmsProjects, services: cmsServices, contactSettings, isLoading } = useCMS();
  const [mounted, setMounted] = useState(false);
  const [displayServices, setDisplayServices] = useState<any[]>(SERVICES);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smart merge logic moved to useEffect for stability
  useEffect(() => {
    if (!mounted) return;

    // Use CMS data exclusively if it exists and is populated
    if (cmsServices && cmsServices.length > 0) {
      const sorted = [...cmsServices].sort((a, b) => {
        const orderA = (a as any).sort_order ?? 999;
        const orderB = (b as any).sort_order ?? 999;
        return orderA - orderB;
      });

      setDisplayServices(sorted);
    } else {
      // Basic fallback if CMS data completely fails or before initial seed
      setDisplayServices(SERVICES);
    }
  }, [cmsServices, mounted]);

  const displayProjects = cmsProjects.length > 0 ? cmsProjects : BACKUP_PROJECTS;

  // Duplicate the marquee items 4× so the animation loops seamlessly
  const marqueeItems = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <main className="page-wrapper home-wrapper">
      <section className="hero" aria-label="Hero section">
        <div className="hero__top-bar">
        </div>

        <motion.div
          className="hero__banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 1. Underlying blue background layer (via CSS) */}

          {/* 2. The masked logo image (Desktop) */}
          <div className="hero__masked-logo-wrapper hero__masked-logo-wrapper--desktop">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
              className="hero__masked-logo"
            >
              <Image
                src="/images/hero-masked-logo.png"
                alt=""
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'right' }}
              />
            </motion.div>
          </div>

          {/* 2b. The masked logo image (Mobile) */}
          <div className="hero__masked-logo-wrapper hero__masked-logo-wrapper--mobile">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="hero__masked-logo"
            >
              <Image
                src="/images/herobglogomobile.png"
                alt=""
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </motion.div>
          </div>

          <div className="hero__content">
            <motion.h1
              className="hero__headline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
            >
              DONT SELL
              <br />
              YOURSELF
              <br />
              SHORT.
            </motion.h1>

            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Were a team of creatives, storytellers, and marketers delivering full-service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="/contact" className="hero__button">START A PROJECT</a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee" aria-label="Services marquee">
        <div className="marquee__track">
          {marqueeItems.map((word, idx) => (
            <div className="marquee__item" key={`${word}-${idx}`}>
              <span className="marquee__text">{word}</span>
              <Image
                className="marquee__icon"
                src="/images/marquee-icon.png"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── About Section ── */}
      <section id="about" className="about" aria-label="About section">
        <motion.h2
          className="about__headline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          About Us <span className="about__arrow">↘</span>
        </motion.h2>

        <motion.div
          className="about__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="about__image-container" variants={fadeInUp}>
            <Image
              src="/images/about_section_team.jpg"
              alt="Neversmall Studio creative team portrait"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </motion.div>

          <motion.div className="about__content" variants={fadeInUp}>
            <h3 className="about__subhead">
              OFFICIAL WEBSITE OF<br />
              NEVERSMALL STUDIO.
            </h3>
            <p className="about__body">
              We&apos;re a team of creatives, storytellers, and marketers
              delivering full-service support: content, production, and
              strategy. All in one place.
              <br />
              <br />
              From brand campaigns and video production to photography, social media management, and paid advertising, we help businesses communicate clearly and grow with purpose.
              <br />
              <br />
              Our approach blends creativity with strategy, ensuring every project not only looks great but performs across modern digital platforms.
              <br />
            </p>
            <AnimatedLink href="/about" className="about__button" text="LEARN MORE" />
          </motion.div>
        </motion.div>
      </section>


      {/* ── Projects Section ── */}
      <section id="projects" className="projects" aria-label="Our projects">
        <motion.div
          className="projects__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="projects__title">
            G*llery <span className="projects__arrow">↘</span>
          </h2>
          <div className="projects__header-right">
            <p className="projects__desc">
              A selection of campaigns and creative work produced for brands across video, photography, and digital marketing.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <ProjectGallery projects={displayProjects} />
        </motion.div>

        <motion.div
          className="projects__footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <AnimatedLink href="/projects" className="projects__view-all" text="view all projects." />
        </motion.div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="services" aria-label="Our services">
        <div className="services__pattern-overlay" />

        <div className="services__container">
          <motion.div
            className="services__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
          >
            <h2 className="services__headline">
              Services <span className="services__arrow">↘</span>
            </h2>
            <div className="services__header-right">
              <p className="services__desc">
                Strategy, production, and performance marketing - all handled in one place.
              </p>
            </div>
          </motion.div>

          <div className="services__grid">
            {displayServices.filter(Boolean).map((srv: any, idx: number) => {
              const dynamicHref = srv.slug ? `/services/${srv.slug}` : srv.href;
              return (
                <motion.div
                  key={srv.id || srv.name || `srv-${idx}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1, margin: "100px" }}
                  variants={fadeInUp}
                >
                  <Link href={dynamicHref} className="service-card">
                    <div className="service-card__inner">
                      {/* Front Face */}
                      <div className="service-card__front">
                        <video
                          src={srv.video || `/videos/${srv.name.toLowerCase().replace(/\s+/g, '-')}.mp4`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="service-card__video"
                        />
                        <div className="service-card__color-boost" />
                        <div className="service-card__overlay" />
                        <h3 className="service-card__title">
                          {srv.name} <span className="service-card__arrow">↗</span>
                        </h3>
                      </div>

                      {/* Back Face */}
                      <div className="service-card__back">
                        <span className="service-card__back-title">{srv.name}</span>
                        <p className="service-card__back-desc">{srv.description || srv.desc}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <TeamSection />

      {/* ── CTA Section ── */}
      <section id="cta" className="cta" aria-label="Call to action">
        <motion.h2
          className="cta__headline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          LET&apos;S BUILD<br />
          SOMETHING THAT<br />
          STANDS OUT.
        </motion.h2>

        <motion.div
          className="cta__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p className="cta__subhead" variants={fadeInUp}>Don&apos;t sell yourself short.</motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/contact" className="cta__button">START A PROJECT</Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
