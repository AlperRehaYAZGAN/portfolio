import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AppShell from "./layout.appshell"
import { SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/lib/constants"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${SITE_NAME} | Golang Full Stack Developer`,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
        {/* Google Analytics - Only in production */}
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
