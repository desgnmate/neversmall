import Image from "next/image";
import ServiceItem from "./components/ServiceItem";
import Testimonials from "./components/Testimonials";
import ProjectGallery from "./components/ProjectGallery";
import AnimatedLink from "./components/AnimatedLink";

const MARQUEE_WORDS = [
  "VIDEOGRAPHY",
  "PHOTOGRAPHY",
  "SOCIAL MANAGEMENT",
  "META ADS",
];

const SERVICES = [
  { name: "VIDEOGRAPHY", desc: "High-impact video production for brands, campaigns, events, and short-form content.", image: "/images/videography-service.jpg", href: "/services/videography" },
  { name: "PHOTOGRAPHY", desc: "Clean, professional imagery for products, campaigns, lifestyle, and brand storytelling.", image: "/images/photography.jpg", href: "/services/photography" },
  { name: "SOCIAL MANAGEMENT", desc: "Strategic content planning, publishing, and growth management across social platforms.", image: "/images/social-management.jpg", href: "/services/social-management" },
  { name: "META ADS", desc: "Targeted ad campaigns focused on reach, engagement, and measurable performance.", image: "/images/meta-ads.jpg", href: "/services/meta-ads" }
];

const NAV_LINKS = ["ABOUT", "PROJECTS", "SERVICES", "TESTIMONIALS"];

const PROJECTS = [
  { title: "URBAN EDGE", category: "Fashion Campaign", image: "/images/project-1.png" },
  { title: "BEHIND THE LENS", category: "Videography", image: "/images/project-2.png" },
  { title: "PURE GLOW", category: "Product Photography", image: "/images/project-3.png" },
  { title: "AFTER DARK", category: "Event Coverage", image: "/images/project-4.png" },
  { title: "SCROLL CULTURE", category: "Social Media", image: "/images/project-5.png" },
  { title: "GOLDEN MILE", category: "Lifestyle Campaign", image: "/images/project-6.png" },
  { title: "BREW & CO", category: "Food & Beverage", image: "/images/project-7.png" },
  { title: "MAIN STAGE", category: "Corporate Event", image: "/images/project-8.png" },
];

export default function Home() {
  // Duplicate the marquee items 4× so the animation loops seamlessly
  const marqueeItems = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <main className="page-wrapper home-wrapper">
      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero section">
        <h1 className="hero__headline">
          DON'T SELL
          <br />
          YOURSELF SHORT.
        </h1>

        <div className="hero__meta">
          <span className="hero__tagline">
            NEVERSMALL STUDIOS • CREATIVE AGENCY
          </span>

          <nav className="hero__nav" aria-label="Section navigation">
            {NAV_LINKS.map((link, idx) => (
              <span key={link} className="hero__nav-link-wrapper" style={{ display: "flex", alignItems: "center" }}>
                {idx > 0 && <span className="hero__nav-dot" aria-hidden="true" />}
                <AnimatedLink href={`#${link.toLowerCase()}`} className="hero__nav-link" text={link} />
              </span>
            ))}
          </nav>
        </div>

        <div className="hero__image-container">
          <Image
            src="/images/hero_image2.jpg"
            alt="Neversmall Studios creative event — aerial view of a vibrant crowd"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
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
        <h2 className="about__headline">
          BUILDING NEXT-LEVEL<br />
          BRANDS THAT REFUSE<br />
          TO STAY SMALL.
        </h2>

        <div className="about__grid">
          <div className="about__image-container">
            <Image
              src="/images/about-image.jpg"
              alt="Neversmall Studio team holding CDs and smiling"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>

          <div className="about__content">
            <h3 className="about__subhead">
              OFFICIAL WEBSITE OF<br />
              NEVERSMALL STUDIO.
            </h3>
            <p className="about__body">
              Were a team of creatives, storytellers, and marketers
              delivering full-service support: content, production, and
              strategy. All in one place.
            </p>
            <AnimatedLink href="/about" className="about__button" text="LEARN MORE" />
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="projects" className="projects" aria-label="Our projects">
        <div className="projects__header">
          <h2 className="projects__title">PROJECTS</h2>
          <p className="projects__desc">
            A selection of campaigns, content, and creative work produced for brands across video, photography, and digital marketing.
          </p>
          <span className="projects__tag">(featured work)</span>
        </div>

        <ProjectGallery projects={PROJECTS} />

        <div className="projects__footer">
          <a href="/projects" className="projects__view-all">view all projects.</a>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="services" aria-label="Our services">
        <div className="services__header">
          <h2 className="services__headline">
            FULL-SERVICE<br />
            CREATIVE SUPPORT.
          </h2>
          <p className="services__desc">
            Strategy, production, and performance marketing - all handled in one place.
          </p>
        </div>

        <div className="services__list">
          {SERVICES.map((srv) => (
            <ServiceItem key={srv.name} name={srv.name} desc={srv.desc} image={srv.image} href={srv.href} />
          ))}
        </div>

        <div className="services__footer">
          <AnimatedLink href="/contact" className="services__button" text="START A PROJECT" />
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* ── CTA Section ── */}
      <section id="cta" className="cta" aria-label="Call to action">
        <h2 className="cta__headline">
          LET&apos;S BUILD<br />
          SOMETHING THAT<br />
          STANDS OUT.
        </h2>

        <div className="cta__content">
          <p className="cta__subhead">Don&apos;t sell yourself short.</p>
          <AnimatedLink href="/contact" className="cta__button" text="START A PROJECT" />
        </div>
      </section>

    </main>
  );
}
