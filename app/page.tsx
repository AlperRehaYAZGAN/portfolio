import ProfileSection from "./page.section.profile"
import type { Metadata } from "next"
import { SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS, AUTHOR, SITE_DOMAIN, SOCIAL_LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: `${SITE_NAME} | Golang Full Stack Developer`,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: `https://${SITE_DOMAIN}` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE_DOMAIN}`,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: SOCIAL_LINKS.twitter.username,
  },
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <ProfileSection />
    </div>
  )
}
