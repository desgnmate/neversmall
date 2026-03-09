"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "./CMSProvider";

export default function CMSPinAuth() {
    const { isPinModalOpen, closePinModal, authenticate } = useCMS();
    const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Focus first input on open
    useEffect(() => {
        if (isPinModalOpen) {
            setDigits(["", "", "", "", "", ""]);
            setError("");
            setIsVerifying(false);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [isPinModalOpen]);

    const handleChange = useCallback((index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const digit = value.slice(-1);
        setDigits(prev => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });
        setError("");
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, []);

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "Escape") {
            closePinModal();
        }
    }, [digits, closePinModal]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 6) {
            setDigits(pasted.split(""));
            inputRefs.current[5]?.focus();
        }
    }, []);

    // Auto-submit when all 6 digits are filled
    useEffect(() => {
        if (digits.every(d => d !== "") && !isVerifying && !isLocked) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [digits]);

    const handleSubmit = async () => {
        const pin = digits.join("");
        if (pin.length !== 6) return;

        setIsVerifying(true);
        setError("");

        try {
            const result = await authenticate(pin);
            if (!result.valid) {
                if (result.locked) {
                    setIsLocked(true);
                    setError("SECURITY LOCK. TRY AGAIN IN 15 MINS.");
                } else {
                    setError(result.error ? result.error.toUpperCase() : "ACCESS DENIED. INCORRECT PIN.");
                    if (result.attemptsRemaining !== undefined) {
                        setError(`ACCESS DENIED. ${result.attemptsRemaining} ATTEMPTS REMAINING.`);
                    }
                }
                setShake(true);
                setTimeout(() => setShake(false), 600);
                setDigits(["", "", "", "", "", ""]);
                setTimeout(() => inputRefs.current[0]?.focus(), 100);
            }
        } catch {
            setError("SYSTEM ERROR. PLEASE TRY AGAIN LATER.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <AnimatePresence>
            {isPinModalOpen && (
                <motion.div
                    className="cms-pin-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={closePinModal}
                >
                    <motion.div
                        className="cms-pin-card"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="cms-pin-close" onClick={closePinModal} aria-label="Close PIN dialog">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="cms-pin-lock-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        <h2 className="cms-pin-title">Admin Access</h2>
                        <p className="cms-pin-subtitle">Enter your 6-digit PIN to continue</p>

                        <motion.div
                            className="cms-pin-inputs"
                            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {digits.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => { inputRefs.current[idx] = el; }}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    onPaste={idx === 0 ? handlePaste : undefined}
                                    className={`cms-pin-digit ${digit ? "cms-pin-digit--filled" : ""} ${error ? "cms-pin-digit--error" : ""}`}
                                    disabled={isVerifying || isLocked}
                                    aria-label={`PIN digit ${idx + 1}`}
                                    autoComplete="off"
                                />
                            ))}
                        </motion.div>

                        {isVerifying && (
                            <div className="cms-pin-loading">
                                <div className="cms-pin-spinner" />
                                <span>Verifying...</span>
                            </div>
                        )}

                        {error && (
                            <motion.p
                                className="cms-pin-error"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
