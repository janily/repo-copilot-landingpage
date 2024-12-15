import { SiteConfig } from "@/types/siteConfig";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const TWITTER_URL = 'https://x.com/janilychen'
const YOUTUBE_URL = 'https://www.youtube.com/@Wayne_dev'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codeloom.ai'

const baseSiteConfig = {
  name: "CodeLoom",
  description: "CodeLoom is an AI-Powered Chrome Extension that helps you visualize code structure with flow charts. Transform your code understanding with automated diagram generation.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og.webp`,
  metadataBase: '/',
  keywords: ["code visualization", "flow chart generator", "code analysis", "AI code helper", "code diagram", "code structure"],
  authors: [
    {
      name: "@janily",
      url: TWITTER_URL,
      twitter: TWITTER_URL,
    }
  ],
  creator: '@janily',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nextThemeColor: 'dark', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: 'twitter', href: TWITTER_URL, icon: BsTwitterX },
  ],
  footerLinks: [
    { name: 'email', href: "mailto:support@phcopilot.ai", icon: MdEmail },
    { name: 'twitter', href: TWITTER_URL, icon: BsTwitterX },
  ],
  footerProducts: []
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.webp`],
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    site: baseSiteConfig.url,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.webp`],
    creator: baseSiteConfig.creator,
  },
}
