"use client";

import { useState } from "react";
import { useCMS } from "./CMSProvider";

export default function CMSSettingsTab() {
    const { changePin } = useCMS();
    const [currentPin, setCurrentPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChangePin = async () => {
        setMessage(null);

        if (!/^\d{6}$/.test(currentPin)) {
            setMessage({ type: "error", text: "Current PIN must be 6 digits" });
            return;
        }
        if (!/^\d{6}$/.test(newPin)) {
            setMessage({ type: "error", text: "New PIN must be 6 digits" });
            return;
        }
        if (newPin !== confirmPin) {
            setMessage({ type: "error", text: "New PINs don't match" });
            return;
        }
        if (currentPin === newPin) {
            setMessage({ type: "error", text: "New PIN must be different" });
            return;
        }

        setSaving(true);
        try {
            const result = await changePin(currentPin, newPin);
            if (result.success) {
                setMessage({ type: "success", text: "PIN updated successfully!" });
                setCurrentPin("");
                setNewPin("");
                setConfirmPin("");
            } else {
                setMessage({ type: "error", text: result.error ?? "Failed to update PIN" });
            }
        } catch {
            setMessage({ type: "error", text: "Connection error. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="cms-tab-form">
            <div className="cms-tab-form__header">
                <h3>Settings</h3>
            </div>

            <div className="cms-settings-section">
                <h4 className="cms-settings-subtitle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Change PIN
                </h4>

                <label className="cms-form-label">Current PIN</label>
                <input
                    className="cms-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                />

                <label className="cms-form-label">New PIN</label>
                <input
                    className="cms-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                />

                <label className="cms-form-label">Confirm New PIN</label>
                <input
                    className="cms-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                />

                {message && (
                    <p className={`cms-settings-msg ${message.type === "error" ? "cms-settings-msg--error" : "cms-settings-msg--success"}`}>
                        {message.text}
                    </p>
                )}

                <div className="cms-tab-form__actions">
                    <button className="cms-btn cms-btn--primary" onClick={handleChangePin} disabled={saving}>
                        {saving ? "Updating..." : "Update PIN"}
                    </button>
                </div>
            </div>
        </div>
    );
}
