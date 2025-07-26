import { SITE_DOMAIN, SITE_KEYWORDS, SITE_NAME } from "@/lib/constants";
import { BlogPostListSection } from "@/sections/blog/blog-post-list.section";
import { BlogListStructuredData } from "@/components/blog/blog-list-structured-data.component";
import type { MetaFunction } from "@remix-run/cloudflare";
import { json, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { executeAsync } from "promise-like-go";

export const meta: MetaFunction = ({ data }) => {
  const blogData = data as any;
  const blogsCount = blogData?.blogs?.length || 0;
  const latestPost = blogData?.blogs?.[0];

  const pageTitle = `Latest Posts | ${SITE_NAME}`;
  const pageDescription = `Discover ${blogsCount} posts about technology, programming, and web development by Alper Reha Yazgan. Latest: ${
    latestPost?.title || "Coming soon"
  }`;
  const pageUrl = `https://${SITE_DOMAIN}/blogs`;
  const pageImage = latestPost?.image || `https://${SITE_DOMAIN}/og-image.png`;

  return [
    // Basic meta tags
    { title: pageTitle },
    { name: "description", content: pageDescription },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "author", content: "Alper Reha Yazgan" },
    { name: "canonical", content: pageUrl },

    // Open Graph tags for Facebook, LinkedIn, etc.
    { property: "og:type", content: "website" },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: pageImage },
    {
      property: "og:image:alt",
      content: "Latest blog posts by Alper Reha Yazgan",
    },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@alperreha" },
    { name: "twitter:creator", content: "@alperreha" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: pageImage },
    {
      name: "twitter:image:alt",
      content: "Latest blog posts by Alper Reha Yazgan",
    },

    // LinkedIn specific (uses Open Graph)
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Additional SEO tags
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export async function loader() {
  // there is a repository on github "https://github.com/AlperRehaYAZGAN/AlperRehaYAZGAN".
  // In this repository there is a "README.md" file that index.page usage.
  // also has a "blogs" folder that has blog posts mdx files.
  // fetch "blogs" folder via github repository api and list all files
  /* 
  __ meta.json file contains the list of blog posts. like below:
  [
    {
      "title": "Introduction",
      "description": "An introduction to my blog",
      "published": "2023-01-01",
      "author": "Alper Reha YAZGAN",
      "tags": ["introduction", "blog"],
      "image": "https://example.com/image.png",
      "filename": "intro.mdx",
      "slug": "intro",
    }
  ]
  */
  const fileUrl = `https://raw.githubusercontent.com/AlperRehaYAZGAN/AlperRehaYAZGAN/main/blogs/__meta.json`;
  const [blogs, noBlogs] = await executeAsync(async () =>
    (await fetch(fileUrl)).json()
  );
  if (!blogs || noBlogs) {
    return json({ blogs: [], noBlogs: null });
  }

  // sort by blogs.published "2025-07-24" like string if error occured remain the same order
  try {
    var sorted = blogs as any[];
    sorted.sort((a, b) => {
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });
  } catch (error) {
    console.error("Error sorting blogs:", error);
    // If sorting fails, we can just return the blogs as is
    return json({ blogs: blogs as any[], noBlogs: null });
  }

  return json(
    {
      blogs: sorted,
      noBlogs: noBlogs,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
        "Content-Type": "application/json",
      },
    }
  );
}

export default function BlogsIndex() {
  const { blogs } = useLoaderData<typeof loader>();

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen">
      {/* SEO Structured Data */}
      <BlogListStructuredData blogs={blogs} />

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Header Section */}
        <motion.div
          className="mb-10 flex justify-between items-end"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Latest
            </motion.h1>
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Recent writings
            </motion.p>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {blogs.length} {blogs.length === 1 ? "article" : "articles"} found
          </p>
        </motion.div>

        {/* Posts List */}
        <BlogPostListSection posts={blogs} />
      </div>
    </div>
  );
}
