import { SiteConfig } from "@/types/siteConfig";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const TWITTER_URL = 'https://x.com/wayne_dev'
const YOUTUBE_URL = 'https://www.youtube.com/@Wayne_dev'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://phcopilot.ai'

const baseSiteConfig = {
  name: "PH Copilot",
  description: "PH Copilot is an AI-Powered Chrome Extension that helps you overview products and comment in 10 seconds. Save your time and amplify your impact on ProductHunt.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og.webp`,
  metadataBase: '/',
  keywords: ["ProductHunt copilot", "ProductHunt comment", "AI-Powered ProductHunt", "ProductHunt AI Assistant"],
  authors: [
    {
      name: "@wayne_dev",
      url: TWITTER_URL,
      twitter: TWITTER_URL,
    }
  ],
  creator: '@wayne_dev',
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
    { name: 'youtube', href: YOUTUBE_URL, icon: BsYoutube }
  ],
  footerLinks: [
    { name: 'email', href: "mailto:support@phcopilot.ai", icon: MdEmail },
    { name: 'twitter', href: TWITTER_URL, icon: BsTwitterX },
    { name: 'youtube', href: YOUTUBE_URL, icon: BsYoutube }
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
