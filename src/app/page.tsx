import Image from "next/image";
import ServiceItem from "./components/ServiceItem";
import Testimonials from "./components/Testimonials";
import ProjectGallery from "./components/ProjectGallery";
import Navbar from "./components/Navbar";

const MARQUEE_WORDS = [
  "VIDEOGRAPHY",
  "PHOTOGRAPHY",
  "SOCIAL MANAGEMENT",
  "META ADS",
];

const SERVICES = [
  { name: "VIDEOGRAPHY", desc: "High-impact video production for brands, campaigns, events, and short-form content.", image: "/images/videography-service.jpg" },
  { name: "PHOTOGRAPHY", desc: "Clean, professional imagery for products, campaigns, lifestyle, and brand storytelling.", image: "/images/photography.jpg" },
  { name: "SOCIAL MANAGEMENT", desc: "Strategic content planning, publishing, and growth management across social platforms.", image: "/images/social-management.jpg" },
  { name: "META ADS", desc: "Targeted ad campaigns focused on reach, engagement, and measurable performance.", image: "/images/meta-ads.jpg" }
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

const AnimatedLink = ({ href, text, className }: { href: string; text: string; className?: string }) => {
  return (
    <a href={href} className={`animated-link ${className || ""}`}>
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
    </a>
  );
};

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

export default function Home() {
  // Duplicate the marquee items 4× so the animation loops seamlessly
  const marqueeItems = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <>
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero section">
        <h1 className="hero__headline">
          DONT SELL
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
            <AnimatedLink href="#project" className="about__button" text="START A PROJECT" />
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
          <a href="#all-projects" className="projects__view-all">view all projects.</a>
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
            <ServiceItem key={srv.name} name={srv.name} desc={srv.desc} image={srv.image} />
          ))}
        </div>

        <div className="services__footer">
          <AnimatedLink href="#project" className="services__button" text="START A PROJECT" />
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <Testimonials />

      {/* ── CTA Section ── */}
      <section id="cta" className="cta" aria-label="Call to action">
        <h2 className="cta__headline">
          LET&apos;S BUILD<br />
          SOMETHING THAT<br />
          STANDS OUT.
        </h2>

        <div className="cta__content">
          <p className="cta__subhead">Don&apos;t sell yourself short.</p>
          <AnimatedLink href="#project" className="cta__button" text="START A PROJECT" />
        </div>
      </section>

      {/* ── Footer Section ── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__top">
          <nav className="footer__nav" aria-label="Footer navigation">
            <a href="#" className="footer__nav-item">
              <span className="footer__nav-number">01</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="HOME" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
            <a href="#about" className="footer__nav-item">
              <span className="footer__nav-number">02</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="ABOUT" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
            <a href="#projects" className="footer__nav-item">
              <span className="footer__nav-number">03</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="PROJECTS" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
            <a href="#services" className="footer__nav-item">
              <span className="footer__nav-number">04</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="SERVICES" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
            <a href="#testimonials" className="footer__nav-item">
              <span className="footer__nav-number">05</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="TESTIMONIALS" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
            <a href="#cta" className="footer__nav-item">
              <span className="footer__nav-number">06</span>
              <div className="footer__nav-label-wrapper">
                <AnimatedText className="footer__nav-label" text="CONTACT" />
                <span className="footer__nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </nav>

          <div className="footer__contact">
            <h3 className="footer__contact-headline">LET&apos;S WORK TOGETHER.</h3>
            <p className="footer__contact-desc">
              Tell us about your brand, your<br />goals, and what you&apos;re building.
            </p>
            <p className="footer__contact-desc">
              We&apos;ll help turn it into<br />something impactful.
            </p>

            <div className="footer__contact-info">
              <div className="footer__contact-block">
                <span className="footer__contact-label">Email</span>
                <a href="mailto:hello@neversmall.studio" className="footer__contact-value">hello@neversmall.studio</a>
              </div>
              <div className="footer__contact-block">
                <span className="footer__contact-label">Phone</span>
                <a href="tel:0432300709" className="footer__contact-value">0432 300 709</a>
              </div>
              <div className="footer__contact-block">
                <span className="footer__contact-label">Address</span>
                <span className="footer__contact-value">Melbourne, VIC</span>
              </div>
              <div className="footer__contact-block">
                <span className="footer__contact-label">Connect</span>
                <div className="footer__socials">
                  <a href="https://www.instagram.com/neversmall.studios/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="0">
                      <g clipPath="url(#clip0_4507_4)">
                        <path d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70313 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3313 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2813 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z" fill="currentColor" />
                        <path d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z" fill="currentColor" />
                        <path d="M39.6937 11.1843C39.6937 12.778 38.4 14.0624 36.8156 14.0624C35.2219 14.0624 33.9375 12.7687 33.9375 11.1843C33.9375 9.59054 35.2313 8.30616 36.8156 8.30616C38.4 8.30616 39.6937 9.59991 39.6937 11.1843Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4507_4">
                          <rect width="48" height="48" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@neversmall.studios" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="TikTok">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z" fill="currentColor" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/neversmall-studios/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_4507_3)">
                        <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4063 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4063 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39063 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39063 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031V40.9031Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4507_3">
                          <rect width="48" height="48" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__banner">
          <Image
            src="/images/neversmall-logo-white.png"
            alt="Neversmall"
            width={1200}
            height={200}
            className="footer__logo-overlay"
          />
          <p className="footer__banner-desc">
            Creative studio delivering strategy, content production, and performance marketing for modern brands.
          </p>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">© 2026 Neversmall Studio. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#" className="footer__legal-link">Privacy Policy</a>
              <a href="#" className="footer__legal-link">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
