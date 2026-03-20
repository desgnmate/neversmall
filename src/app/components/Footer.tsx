"use client";

import React, { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { useCMS } from "./cms/CMSProvider";
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const { contactSettings, openPinModal } = useCMS();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const clickTimesRef = useRef<number[]>([]);
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const bannerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    const times = clickTimesRef.current;
    times.push(now);
    if (times.length > 5) {
      times.shift();
    }
    if (times.length === 5 && now - times[0] < 3000) {
      openPinModal();
      clickTimesRef.current = [];
    }
  }, [openPinModal]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <footer ref={footerRef} className="footer" style={{ overflow: 'hidden', position: 'relative', backgroundColor: '#F8F8F8', padding: 0 }}>
      <div className="footer__top" style={{ position: 'relative', zIndex: 10, backgroundColor: '#F8F8F8', paddingTop: '80px' }}>
        {/* Column 1: Newsletter & Logo */}
        <div className="footer__col footer__col--newsletter">
          <div className="footer__logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            {/* The user's image shows the black logo variant. */}
            <Image
              src="/images/logo.png"
              alt="Neversmall"
              width={250}
              height={50}
              className="footer__logo"
            />
          </div>
          <p className="footer__desc">
            Get the latest updates, insights, and tips<br />delivered to your inbox.
          </p>
          <form className="footer__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="footer__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
              style={{ textTransform: 'uppercase' }}
            />
            <button
              type="submit"
              className="footer__submit"
              disabled={status === 'loading' || status === 'success'}
            >
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ...
                  </motion.span>
                ) : status === 'success' ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    THANKS!
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    SUBSCRIBE
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>

        {/* Column 2: Information */}
        <div className="footer__col footer__col--links">
          <h4 className="footer__heading">INFORMATION</h4>
          <nav className="footer__nav-list">
            <Link href="/#about" className="footer__link">About</Link>
            <Link href="/#projects" className="footer__link">Projects</Link>
            <Link href="/#services" className="footer__link">Services</Link>
            <Link href="/#team" className="footer__link">Our Team</Link>
          </nav>
        </div>

        {/* Column 3: Services */}
        <div className="footer__col footer__col--links">
          <h4 className="footer__heading">SERVICES</h4>
          <nav className="footer__nav-list">
            <Link href="/services/videography" className="footer__link">VideoGraphy</Link>
            <Link href="/services/photography" className="footer__link">Photography</Link>
            <Link href="/services/social-management" className="footer__link">Social Management</Link>
            <Link href="/services/meta-ads" className="footer__link">Meta Ads</Link>
          </nav>
        </div>

        {/* Column 4: Get In Touch */}
        <div className="footer__col footer__col--contact">
          <h4 className="footer__heading">GET IN TOUCH</h4>

          <div className="footer__contact-item">
            <span className="footer__contact-label">Meeting</span>
            <a href="https://calendar.app.google.com/jQ5L1G21d6d8sY7i6" target="_blank" rel="noopener noreferrer" className="footer__link-text">Book a Call</a>
          </div>

          <div className="footer__contact-item">
            <span className="footer__contact-label">Email</span>
            <a href={`mailto:${contactSettings?.email || "hello@neversmall.studio"}`} className="footer__link-text">neversmall.studio</a>
          </div>

          <div className="footer__contact-item">
            <span className="footer__contact-label">Location</span>
            <span className="footer__link-text">{contactSettings?.location || "Melbourne, VIC"}</span>
          </div>
        </div>
      </div>

      <motion.div style={{ y: bannerY, position: 'relative', zIndex: 1 }}>
        {/* Re-added Banner with giant logo overlay */}
        <div className="footer__banner">
          <Image
            src="/images/neversmall-logo-white.png"
            alt="Neversmall"
            width={1200}
            height={200}
            className="footer__banner-logo"
          />
        </div>

        <div className="footer__bottom" style={{ backgroundColor: '#F8F8F8', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <p className="footer__copyright">© 2026 Neversmall Studio. All rights reserved.</p>
          <p className="footer__credit" style={{ fontSize: '12px', opacity: 0.6 }}>design by <a href="https://desgnmate.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>desgnmate.com</a></p>
        </div>
      </motion.div>
    </footer>
  );
}
