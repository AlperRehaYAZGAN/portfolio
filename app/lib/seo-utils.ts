// Utility function to calculate reading time
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Utility function to generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  blogTitle: string,
  slug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yazgan.xyz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://yazgan.xyz/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogTitle,
        item: `https://yazgan.xyz/blogs/${slug}`,
      },
    ],
  };
}
