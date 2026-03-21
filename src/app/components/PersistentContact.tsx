"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PersistentContact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="persistent-contact"
        >
            <Link href="/contact" className="persistent-contact__button"><span className="persistent-contact__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.44 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.25 2.46.69 3.58a1 1 0 01-.27 1.11z" /></svg></span><span className="persistent-contact__text">Let's get in touch!</span></Link>
        </motion.div>
    );
};

export default PersistentContact;
