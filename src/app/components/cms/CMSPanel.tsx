"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "./CMSProvider";
import CMSProjectsTab from "./CMSProjectsTab";
import CMSServicesTab from "./CMSServicesTab";
import CMSTestimonialsTab from "./CMSTestimonialsTab";
import CMSContactTab from "./CMSContactTab";
import CMSSettingsTab from "./CMSSettingsTab";
import CMSConfirm from "./CMSConfirm";

const TABS = ["Projects", "Services", "Testimonials", "Contact", "Settings"] as const;
type Tab = typeof TABS[number];

export default function CMSPanel() {
    const { isCMSOpen, isCMSMinimized, minimizeCMS, reopenCMS, logout, isAuthenticated, notification } = useCMS();
    const [activeTab, setActiveTab] = useState<Tab>("Projects");

    if (!isAuthenticated) return null;

    return (
        <AnimatePresence>
            {isCMSOpen && (
                <>
                    {/* Backdrop */}
                    <AnimatePresence>
                        {!isCMSMinimized && (
                            <motion.div
                                className="cms-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={minimizeCMS}
                            />
                        )}
                    </AnimatePresence>

                    {/* Floating Reopen Button */}
                    <AnimatePresence>
                        {isCMSMinimized && (
                            <motion.button
                                className="cms-reopen-btn"
                                onClick={reopenCMS}
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                title="Reopen CMS"
                                aria-label="Reopen CMS"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Panel */}
                    <motion.aside
                        className="cms-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Content Management System"
                        initial={{ x: "100%" }}
                        animate={{ x: isCMSMinimized ? "100%" : 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        data-lenis-prevent
                    >
                        {/* Header */}
                        <div className="cms-panel__header">
                            <div className="cms-panel__header-left">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                </svg>
                                <span className="cms-panel__title">CMS</span>
                            </div>
                            <div className="cms-panel__header-actions">
                                <button className="cms-panel__action cms-panel__logout" onClick={logout} aria-label="Logout and close CMS">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                                <button className="cms-panel__action" onClick={minimizeCMS} aria-label="Close CMS Panel">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="cms-panel__tabs" role="tablist">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    className={`cms-panel__tab ${activeTab === tab ? "cms-panel__tab--active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="cms-panel__content" role="tabpanel" data-lenis-prevent>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === "Projects" && <CMSProjectsTab />}
                                    {activeTab === "Services" && <CMSServicesTab />}
                                    {activeTab === "Testimonials" && <CMSTestimonialsTab />}
                                    {activeTab === "Contact" && <CMSContactTab />}
                                    {activeTab === "Settings" && <CMSSettingsTab />}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Custom Dialogs */}
                        <CMSConfirm />

                        {/* Notification Toast */}
                        <AnimatePresence>
                            {notification && (
                                <motion.div
                                    className={`cms-toast cms-toast--${notification.type}`}
                                    initial={{ opacity: 0, y: 20, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                                    exit={{ opacity: 0, y: 10, x: "-50%" }}
                                >
                                    {notification.type === "success" ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    )}
                                    <span>{notification.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
