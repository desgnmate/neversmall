export interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    image: string;
}

export const TEAM: TeamMember[] = [
    {
        id: "1",
        name: "TOBY",
        role: "Director / Co-Founder",
        email: "toby@neversmall.com.au",
        image: "/images/team/TOBY.png"
    },
    {
        id: "2",
        name: "JERI",
        role: "Director / Co-Founder",
        email: "jerita@neversmall.com.au",
        image: "/images/team/JERI.png"
    },
    {
        id: "3",
        name: "DANIEL",
        role: "Account Manager",
        email: "daniel@neversmall.com.au",
        image: "/images/team/DANIEL.png"
    },
    {
        id: "4",
        name: "TRISTEN",
        role: "Head of Photography",
        email: "tristen@neversmall.com.au",
        image: "/images/team/TRISTEN.png"
    }
];
