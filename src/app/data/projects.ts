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
        title: "VEILED MOTION",
        category: "Visual Arts",
        description: "A study in ethereal movement — where form meets emotion in soft, dreamlike light.",
        image: "/images/project-1.png",
        slug: "veiled-motion",
        gallery: ["/images/project-1.png", "/images/project-2.png", "/images/project-3.png"]
    },
    {
        title: "ENDLESS PATH",
        category: "Landscape",
        description: "An exploration of solitude and journey, winding through the stillness of nature.",
        image: "/images/project-2.png",
        slug: "endless-path",
        gallery: ["/images/project-2.png", "/images/project-4.png", "/images/project-5.png"]
    },
    {
        title: "CELESTIAL DRIFT",
        category: "Fine Art",
        description: "A vision of the unknown — light, gravity, and silence colliding beyond the stars.",
        image: "/images/project-3.png",
        slug: "celestial-drift",
        gallery: ["/images/project-3.png", "/images/project-1.png", "/images/project-6.png"]
    },
    {
        title: "SHADOW GAZE",
        category: "Portraiture",
        description: "An intimate portrait that blurs the line between mystery and clarity.",
        image: "/images/project-4.png",
        slug: "shadow-gaze",
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
    },
    {
        title: "URBAN RHYTHM",
        category: "Street Photography",
        description: "Capturing the pulse of the city through candid moments and architectural geometry.",
        image: "/images/project-4.png", /* Reuse some images for now to fill space */
        slug: "urban-rhythm",
        gallery: ["/images/project-4.png", "/images/project-5.png"]
    },
    {
        title: "NEON DREAMS",
        category: "Music Video",
        description: "A high-energy, visually experimental music video utilizing practical neon lighting and fast cuts.",
        image: "/images/project-3.png",
        slug: "neon-dreams",
        gallery: ["/images/project-3.png", "/images/project-7.png"]
    }
];
