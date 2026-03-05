"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Hide footer exactly on the contact page
    if (pathname === "/contact") {
        return null;
    }

    return <Footer />;
}
