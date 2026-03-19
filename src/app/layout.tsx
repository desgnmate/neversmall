import type { Metadata } from "next";
import "./globals.css";
import "./cms.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import PersistentContact from "./components/PersistentContact";
import ConditionalFooter from "./components/ConditionalFooter";
import CMSProvider from "./components/cms/CMSProvider";
import CMSPinAuth from "./components/cms/CMSPinAuth";
import CMSPanel from "./components/cms/CMSPanel";
import LoadingIntro from "./components/LoadingIntro";
import PageTransitionLoader from "./components/PageTransitionLoader";

export const metadata: Metadata = {
  title: "Neversmall Studios — Creative Agency",
  description:
    "Don't sell yourself short. Neversmall Studios is a creative agency specializing in videography, photography, social management, and meta ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CMSProvider>
          <LoadingIntro />
          <PageTransitionLoader />
          <SmoothScroll>
            <Navbar />
            {children}
            <ScrollToTop />
            <PersistentContact />
            <ConditionalFooter />
          </SmoothScroll>
          <CMSPinAuth />
          <CMSPanel />
        </CMSProvider>
      </body>
    </html>
  );
}
