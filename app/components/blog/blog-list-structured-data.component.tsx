import { AUTHOR, SITE_DOMAIN, SITE_NAME } from "@/lib/constants";

interface BlogListStructuredDataProps {
  blogs: Array<{
    title: string;
    description: string;
    published: string;
    author: string;
    image?: string;
    slug: string;
    tags?: string[];
  }>;
}

// JSON-LD structured data for blog list page
export function BlogListStructuredData({ blogs }: BlogListStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Technology, programming, and web development blog by Alper Reha Yazgan",
    url: `https://${SITE_DOMAIN}/blogs`,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: `https://${SITE_DOMAIN}`,
      sameAs: [
        "https://x.com/alperreha",
        "https://linkedin.com/in/alperreha",
        "https://github.com/alperrehayazgan",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `https://${SITE_DOMAIN}`,
      logo: {
        "@type": "ImageObject",
        url: `https://${SITE_DOMAIN}/og-image.png`,
      },
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `https://${SITE_DOMAIN}/blogs/${blog.slug}`,
      datePublished: blog.published,
      author: {
        "@type": "Person",
        name: blog.author || AUTHOR.name,
      },
      ...(blog.image && {
        image: {
          "@type": "ImageObject",
          url: blog.image,
        },
      }),
    })),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
