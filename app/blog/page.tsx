import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { SITE_NAME, SITE_KEYWORDS, SITE_DOMAIN, SOCIAL_LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Blog sayfası yakında sizlerle olacak.",
  keywords: [...SITE_KEYWORDS.split(", "), "blog", "yazılar"].join(", "),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE_DOMAIN}/blog`,
    title: `Blog | ${SITE_NAME}`,
    description: "Blog sayfası yakında sizlerle olacak.",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description: "Blog sayfası yakında sizlerle olacak.",
    creator: SOCIAL_LINKS.twitter.username,
  },
}

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <div className="animate-in fade-in slide-in-from-top-2 duration-400 flex flex-col items-center max-w-md">
        <Construction className="h-16 w-16 text-primary mb-4" />

        <h1 className="text-4xl font-bold mb-2">Blog Sayfası</h1>

        <div className="h-1 w-20 bg-primary my-4 rounded-full"></div>

        <p className="text-xl mb-2">Çok Yakında Burada</p>

        <p className="text-muted-foreground mb-8">
          Blog sayfam şu anda hazırlanıyor. Golang, Rust, Next.js ve diğer teknolojiler hakkında yazılarımı yakında
          burada paylaşacağım.
        </p>

        <Button asChild className="group">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            Ana Sayfaya Dön
          </Link>
        </Button>
      </div>
    </div>
  )
}
