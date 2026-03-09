"use client";

import { useRef, useState } from "react";

interface CMSImageUploadProps {
    currentImage: string;
    onUpload: (file: File) => Promise<string>;
    label?: string;
}

export default function CMSImageUpload({ currentImage, onUpload, label = "Image" }: CMSImageUploadProps) {
    const [preview, setPreview] = useState(currentImage);
    const [isUploading, setIsUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview immediately
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);

        setIsUploading(true);
        try {
            const url = await onUpload(file);
            setPreview(url);
        } catch (err) {
            console.error("Upload failed:", err);
            setPreview(currentImage);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="cms-image-upload">
            <label className="cms-form-label">{label}</label>
            <div className="cms-image-upload__preview" onClick={() => fileRef.current?.click()}>
                {preview ? (
                    <img src={preview} alt="Preview" className="cms-image-upload__img" />
                ) : (
                    <div className="cms-image-upload__placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span>Click to upload</span>
                    </div>
                )}
                {isUploading && (
                    <div className="cms-image-upload__loading">
                        <div className="cms-pin-spinner" />
                    </div>
                )}
            </div>
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
                aria-label={`Upload ${label}`}
            />
        </div>
    );
}
