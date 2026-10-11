export const siteConfig = {
  name: "Andre McGruder",
  brand: "andremcmade",
  tagline:
    "Senior Software Engineer focused on frontend architecture, platform reliability, and AI tooling — across digital signage, healthcare, and federal systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://andremcmade.com",
  /** Outbound music site — set via NEXT_PUBLIC_MUSIC_SITE_URL when ready */
  musicSiteUrl: process.env.NEXT_PUBLIC_MUSIC_SITE_URL || "#",
  github: "https://github.com/andreMc05",
  linkedin: "https://linkedin.com/in/andre-mcgruder",
  location: "Oak Park, IL",
  email: "andremc05@gmail.com",
  resumePath: "/resume/Andre_McGruder_2026_Resume.pdf",
} as const;

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  children?: { href: string; label: string }[];
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  {
    href: "/blog/dev",
    label: "Blog",
    children: [
      { href: "/blog/dev", label: "Dev" },
      { href: "/blog/music", label: "Music" },
    ],
  },
  { href: "/shop", label: "Shop" },
  { href: siteConfig.musicSiteUrl, label: "Music", external: true },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/uses", label: "Uses / Stack" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
] as const;
