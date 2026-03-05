export interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    slug: string;
    gallery?: string[];
}

export const PROJECTS: Project[] = [
    {
        title: "URBAN EDGE",
        category: "Fashion Campaign",
        description: "A high-energy fashion campaign captured in the heart of downtown Melbourne. Exploring the intersection of street culture and luxury aesthetics.",
        image: "/images/project-1.png",
        slug: "urban-edge",
        gallery: ["/images/project-1.png", "/images/project-2.png", "/images/project-3.png"]
    },
    {
        title: "BEHIND THE LENS",
        category: "Videography",
        description: "An intimate look at the creative process. This project documents the raw emotions and technical precision required in modern cinematography.",
        image: "/images/project-2.png",
        slug: "behind-the-lens",
        gallery: ["/images/project-2.png", "/images/project-4.png", "/images/project-5.png"]
    },
    {
        title: "PURE GLOW",
        category: "Product Photography",
        description: "Minimalist product photography for a high-end skincare brand. Focusing on texture, light, and the essence of purity.",
        image: "/images/project-3.png",
        slug: "pure-glow",
        gallery: ["/images/project-3.png", "/images/project-1.png", "/images/project-6.png"]
    },
    {
        title: "AFTER DARK",
        category: "Event Coverage",
        description: "Capturing the energy of Melbourne's night life. Low-light photography that preserves the atmosphere of premium events.",
        image: "/images/project-4.png",
        slug: "after-dark",
        gallery: ["/images/project-4.png", "/images/project-7.png", "/images/project-8.png"]
    },
    {
        title: "SCROLL CULTURE",
        category: "Social Media",
        description: "A strategic content series designed for maximum engagement on TikTok and Instagram. Fast-paced, bold, and unapologetically modern.",
        image: "/images/project-5.png",
        slug: "scroll-culture",
        gallery: ["/images/project-5.png", "/images/project-2.png", "/images/project-3.png"]
    },
    {
        title: "GOLDEN MILE",
        category: "Lifestyle Campaign",
        description: "Bridging the gap between aspiration and reality. A lifestyle campaign set against coastal landscapes.",
        image: "/images/project-6.png",
        slug: "golden-mile",
        gallery: ["/images/project-6.png", "/images/project-1.png", "/images/project-4.png"]
    },
    {
        title: "BREW & CO",
        category: "Food & Beverage",
        description: "Specialty coffee branding and content. Highlighting the craft behind the bean and the community behind the cup.",
        image: "/images/project-7.png",
        slug: "brew-and-co",
        gallery: ["/images/project-7.png", "/images/project-3.png", "/images/project-5.png"]
    },
    {
        title: "MAIN STAGE",
        category: "Corporate Event",
        description: "Professional event coverage for industry leaders. documenting keynotes, networking, and the moments that matter.",
        image: "/images/project-8.png",
        slug: "main-stage",
        gallery: ["/images/project-8.png", "/images/project-2.png", "/images/project-6.png"]
    }
];
