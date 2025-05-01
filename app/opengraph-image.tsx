import { ImageResponse } from "next/og"
import { SITE_NAME, AUTHOR, SITE_DESCRIPTION } from "@/lib/constants"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = `${SITE_NAME} - ${SITE_DESCRIPTION}`
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

  const interRegular = fetch(
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        backgroundImage: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "system-ui, sans-serif",
        padding: 40,
      }}
    >
      {/* Left side - Avatar and Name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 40,
        }}
      >
        {/* Avatar with border */}
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #3b82f6",
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl || "/placeholder.svg"}
            alt={AUTHOR.name}
            width={220}
            height={220}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Name Badge */}
        <div
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            marginTop: 16,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          {AUTHOR.name}
        </div>

        {/* Username Badge */}
        <div
          style={{
            backgroundColor: "#000",
            color: "white",
            padding: "4px 12px",
            borderRadius: 4,
            marginTop: 8,
            fontSize: 16,
          }}
        >
          {AUTHOR.username}
        </div>
      </div>

      {/* Right side - Text Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
        }}
      >
        {/* About heading */}
        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#3b82f6",
            marginBottom: 16,
            fontFamily: "monospace",
          }}
        >
          About
        </div>

        {/* Terminal-like box */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderRadius: 8,
            padding: 24,
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontFamily: "monospace",
          }}
        >
          {/* Bio lines */}
          <div style={{ marginBottom: 12, fontSize: 20 }}>
            <span style={{ color: "#16a34a", marginRight: 8 }}>$</span>
            <span>Hello 👋, I'm alperreha.</span>
          </div>

          <div style={{ marginBottom: 12, fontSize: 20 }}>
            <span style={{ color: "#16a34a", marginRight: 8 }}>$</span>
            <span>{AUTHOR.bio}</span>
          </div>

          <div style={{ marginBottom: 12, fontSize: 20 }}>
            <span style={{ color: "#16a34a", marginRight: 8 }}>$</span>
            <span style={{ color: "#f97316" }}>This page contains my development stuff 🔥 🚀</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      // Using default system fonts instead of custom fonts
      /*
      fonts: [
        {
          name: "Inter",
          data: await interRegular,
          style: "normal",
          weight: 400,
        },
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
