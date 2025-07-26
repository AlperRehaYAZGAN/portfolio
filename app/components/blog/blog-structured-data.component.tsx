import { AUTHOR, SITE_DOMAIN, SITE_NAME } from "@/lib/constants";
import { generateBreadcrumbStructuredData } from "@/lib/seo-utils";

interface BlogStructuredDataProps {
  blog: {
    title: string;
    description: string;
    published: string;
    author: string;
    image?: string;
    slug: string;
    tags?: string[];
  };
}

// JSON-LD structured data for better SEO
export function BlogStructuredData({ blog }: BlogStructuredDataProps) {
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    author: {
      "@type": "Person",
      name: blog.author || AUTHOR.name,
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
    datePublished: blog.published,
    dateModified: blog.published,
    url: `https://${SITE_DOMAIN}/blogs/${blog.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${SITE_DOMAIN}/blogs/${blog.slug}`,
    },
    ...(blog.image && {
      image: {
        "@type": "ImageObject",
        url: blog.image,
        width: 1200,
        height: 630,
      },
    }),
    ...(blog.tags && {
      keywords: blog.tags.join(", "),
    }),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: `https://${SITE_DOMAIN}/blogs`,
    },
  };

  const breadcrumbData = generateBreadcrumbStructuredData(
    blog.title,
    blog.slug
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
