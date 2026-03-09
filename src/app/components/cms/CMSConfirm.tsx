"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "./CMSProvider";

export default function CMSConfirm() {
    const { confirmDialog } = useCMS();

    return (
        <AnimatePresence>
            {confirmDialog && (
                <motion.div
                    className="cms-confirm__overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="cms-confirm__card"
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <h3 className="cms-confirm__title">Confirmation</h3>
                        <p className="cms-confirm__message">{confirmDialog.message}</p>

                        <div className="cms-confirm__actions">
                            <button
                                className="cms-btn cms-btn--primary"
                                onClick={confirmDialog.onConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="cms-btn cms-btn--ghost"
                                onClick={confirmDialog.onCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
