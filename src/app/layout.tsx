import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import ConditionalFooter from "./components/ConditionalFooter";

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
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
