"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ServiceItem from "./components/ServiceItem";
import Testimonials from "./components/Testimonials";
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
  { name: "VIDEOGRAPHY", description: "High-impact video production for brands, campaigns, events, and short-form content.", image: "/images/videography.jpg", href: "/services/videography" },
  { name: "PHOTOGRAPHY", description: "Clean, professional imagery for products, campaigns, lifestyle, and brand storytelling.", image: "/images/photography-service.jpg", href: "/services/photography" },
  { name: "SOCIAL MANAGEMENT", description: "Strategic content planning, publishing, and growth management across social platforms.", image: "/images/social.jpg", href: "/services/social-management" },
  { name: "META ADS", description: "Targeted ad campaigns focused on reach, engagement, and measurable performance.", image: "/images/ads.jpg", href: "/services/meta-ads" }
];

const NAV_LINKS = ["ABOUT", "PROJECTS", "SERVICES", "TESTIMONIALS"];

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
      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero section">
        <motion.h1
          className="hero__headline"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.5 }}
        >
          DON'T SELL
          <br />
          YOURSELF SHORT.
        </motion.h1>

        <motion.div
          className="hero__meta"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span className="hero__tagline" variants={fadeInUp}>
            NEVERSMALL STUDIOS • SOCIAL-FIRST CREATIVE AGENCY
          </motion.span>

          <nav className="hero__nav" aria-label="Section navigation">
            {NAV_LINKS.map((link, idx) => (
              <motion.span key={link} className="hero__nav-link-wrapper" style={{ display: "flex", alignItems: "center" }} variants={fadeInUp}>
                {idx > 0 && <span className="hero__nav-dot" aria-hidden="true" />}
                <AnimatedLink href={`#${link.toLowerCase()}`} className="hero__nav-link" text={link} />
              </motion.span>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="hero__image-container"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        >
          <Image
            src="/images/herobg.jpg"
            alt="Neversmall Studios creative event — aerial view of a vibrant crowd"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee" aria-label="Services marquee">
        <div className="marquee__track">
          {marqueeItems.map((word, idx) => (
            <div className="marquee__item" key={`${word}-${idx}`}>
              <Image
                className="marquee__icon"
                src="/images/marquee-icon.png"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
              <span className="marquee__text">{word}</span>
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
          BUILDING NEXT-LEVEL<br />
          BRANDS THAT REFUSE<br />
          TO STAY SMALL.
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

      {/* ── Team Section ── */}
      {/* Moved below Testimonials */}

      {/* ── Projects Section ── */}
      <section id="projects" className="projects" aria-label="Our projects">
        <motion.div
          className="projects__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="projects__title">PROJECTS</h2>
          <p className="projects__desc">
            A selection of campaigns, content, and creative work produced for brands across video, photography, and digital marketing.
          </p>
          <span className="projects__tag">(featured work)</span>
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
        <motion.div
          className="services__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className="services__headline">
            FULL-SERVICE<br />
            CREATIVE SUPPORT.
          </h2>
          <p className="services__desc">
            Strategy, production, and performance marketing - all handled in one place.
          </p>
        </motion.div>

        <div className="services__list">
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
                <ServiceItem
                  name={srv.name}
                  desc={srv.description || srv.desc}
                  image={srv.image}
                  href={dynamicHref}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="services__footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <AnimatedLink href="/contact" className="services__button" text="START A PROJECT" />
        </motion.div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* ── Team Section (Moved) ── */}
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
            <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
