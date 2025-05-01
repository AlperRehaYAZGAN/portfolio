import { ImageResponse } from "next/og"
import { SITE_NAME, AUTHOR } from "@/lib/constants"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = `${SITE_NAME} - Blog`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font
  // Commented out remote font loading for now
  /*
  const interSemiBold = fetch(
    new URL("https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const interBold = fetch(
    new URL("https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2", import.meta.url),
  ).then((res) => res.arrayBuffer())
  */

  // Avatar
  const avatarUrl = "https://avatars.githubusercontent.com/u/43668181?v=4"

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        backgroundImage: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "system-ui, sans-serif",
        padding: 40,
      }}
    >
      {/* Avatar with border */}
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid #3b82f6",
          width: 140,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl || "/placeholder.svg"}
          alt={AUTHOR.name}
          width={140}
          height={140}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Blog Title */}
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "#0f172a",
          marginBottom: 16,
        }}
      >
        Blog
      </div>

      {/* Divider */}
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: "#3b82f6",
          borderRadius: 2,
          margin: "16px 0",
        }}
      />

      {/* Coming Soon Text */}
      <div
        style={{
          fontSize: 36,
          color: "#0f172a",
          marginBottom: 24,
        }}
      >
        Çok Yakında Burada
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 24,
          color: "#64748b",
          textAlign: "center",
          maxWidth: 600,
        }}
      >
        Blog sayfam şu anda hazırlanıyor. Golang, Rust, Next.js ve diğer teknolojiler hakkında yazılarımı yakında burada
        paylaşacağım.
      </div>

      {/* Author */}
      <div
        style={{
          fontSize: 18,
          color: "#64748b",
          marginTop: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold", marginRight: 8 }}>{AUTHOR.name}</span>
        <span>{AUTHOR.username}</span>
      </div>
    </div>,
    {
      ...size,
      // Using default system fonts instead of custom fonts
      /*
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 700,
        },
      ],
      */
    },
  )
}
