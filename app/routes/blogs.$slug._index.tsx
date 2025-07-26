import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_KEYWORDS,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { compile, run } from "@mdx-js/mdx";
import type { MetaFunction } from "@remix-run/cloudflare";
import { json, Link, useLoaderData } from "@remix-run/react";
import withToc from "@stefanprobst/rehype-extract-toc";
import { motion } from "framer-motion";
import {
  Fragment,
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as runtime from "react/jsx-runtime";
import withSlugs from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { executeAsync } from "promise-like-go";
import { ErrorBoundary } from "react-error-boundary";

export const meta: MetaFunction = ({ data, params }) => {
  const blogData = data as any;
  const blogTitle =
    blogData?.blog?.name?.replace(".mdx", "").replace(".md", "") || "Blog Post";

  return [
    { title: `${blogTitle} | ${SITE_NAME}` },
    { name: "description", content: "Blog post by @alperreha" },
    { name: "author", content: AUTHOR.name },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "og:title", content: blogTitle },
    { name: "og:description", content: SITE_DESCRIPTION },
    { name: "og:url", content: `https://${SITE_DOMAIN}/blogs/${params.slug}` },
    { name: "og:image", content: `https://${SITE_DOMAIN}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: blogTitle },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:creator", content: SOCIAL_LINKS.twitter.username },
  ];
};

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

type Toc = Array<TocEntry>;

interface LoaderParams {
  params: {
    slug: string;
  };
  request: Request;
  context: any;
}

export const loader = async ({ context, request, params }: LoaderParams) => {
  const { slug } = params;

  const meta = `https://raw.githubusercontent.com/AlperRehaYAZGAN/AlperRehaYAZGAN/main/blogs/__meta.json`;
  const [blogs, noBlogs] = await executeAsync(async () =>
    (await fetch(meta)).json()
  );
  if (!blogs || noBlogs) {
    return json({ blogs: [], blog: null, code: null, noBlog: null });
  }

  const found = (blogs as any[])?.find((b: any) => b.slug === slug);
  if (!found) {
    return json({ blogs: blogs, blog: null, code: null, noBlog: null });
  }

  const file = `https://raw.githubusercontent.com/AlperRehaYAZGAN/AlperRehaYAZGAN/main/blogs/${found?.filename}`;
  const [blog, noContent] = await executeAsync(async () =>
    (await fetch(file)).text()
  );
  if (!blog || noContent) {
    return json({
      blogs: blogs,
      blog: found || null,
      code: null,
      noBlog: noContent,
    });
  }

  const code = await compile(blog, {
    outputFormat: "function-body",
    remarkPlugins: [
      remarkGfm,
      remarkMdx,
      remarkToc,
      remarkRehype,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [withSlugs, withToc],
  });

  return json(
    {
      blogs,
      blog: found,
      code: String(code),
      noBlog: null,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
        "Content-Type": "application/json",
      },
    }
  );
};

interface MdxModule {
  default: React.ComponentType;
  toc?: Toc;
}

export function MdxComponentWrapper({
  pMdxContent,
}: {
  pMdxContent: Promise<MdxModule>;
}) {
  const MdxContent = use(pMdxContent) as MdxModule;
  if (!MdxContent || !MdxContent.default) return <Fragment />;
  const Content = MdxContent.default;
  return <Content />;
}

// Header Section Component
function DetailsHeader({ blog }: { blog: any }) {
  const blogTitle = blog?.title || "Blog Post";
  const formattedDate = blog?.published
    ? new Date(blog.published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <motion.header
      className="flex flex-col gap-4 items-center text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-0 text-gray-900">
        {blogTitle}
      </h1>

      <p className="text-lg text-gray-600 max-w-3xl mt-0 mb-0 leading-relaxed">
        {blog?.description || "N/A"}
      </p>

      <div className="flex items-center text-md justify-center gap-4 text-gray-600">
        <Avatar className="w-8 h-8 border border-gray-300">
          <AvatarImage
            src={AUTHOR.avatar}
            alt={AUTHOR.name}
            className="mt-0 mb-0"
          />
          <AvatarFallback className="text-xs font-medium">
            {AUTHOR.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{AUTHOR.name}</span>
      </div>

      <div className="flex items-center text-xs justify-center gap-8 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span className="font-medium">6 min read</span>
        </div>
      </div>
    </motion.header>
  );
}
// Featured Image Section Component
function DetailsFeatured({ blog }: { blog: any }) {
  if (!blog?.image) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog?.title || "Featured image"}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.section>
  );
}

// Markdown Content Component
function DetailsMarkdown({
  pMdxContent,
}: {
  pMdxContent: Promise<MdxModule> | null;
}) {
  return (
    <motion.main
      className="py-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <article className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
        <ErrorBoundary
          fallback={
            <div className="p-6 text-red-600 border border-red-200 rounded-lg bg-red-50">
              Something went wrong loading this content
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center">
                <div className="animate-pulse text-gray-500">
                  Loading content...
                </div>
              </div>
            }
          >
            {pMdxContent && <MdxComponentWrapper pMdxContent={pMdxContent} />}
          </Suspense>
        </ErrorBoundary>
      </article>
    </motion.main>
  );
}

// Table of Contents Component
function DetailsTOC({
  pMdxContent,
}: {
  pMdxContent: Promise<MdxModule> | null;
}) {
  const [toc, setToc] = useState<Toc>([
    { value: "Introduction", depth: 2, id: "introduction" },
  ]);

  // Extract TOC from MDX content
  useEffect(() => {
    if (!pMdxContent) return;

    pMdxContent.then((content) => {
      if (content.toc) {
        setToc(content.toc);
      }
    });
  }, [pMdxContent]);

  const renderTocItem = (item: TocEntry) => (
    <div key={item.id || item.value} className={`ml-${(item.depth - 2) * 2}`}>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="w-full justify-start text-left h-auto p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      >
        <a
          href={`#${item.id || item.value.toLowerCase().replace(/\s+/g, "-")}`}
          className="block text-sm"
        >
          {item.value}
        </a>
      </Button>
      {item.children && (
        <div className="mt-1 space-y-1">{item.children.map(renderTocItem)}</div>
      )}
    </div>
  );

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="sticky top-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Table of Contents
          </h3>
          <div className="space-y-1">{toc.map(renderTocItem)}</div>
        </div>
      </div>
    </motion.aside>
  );
}

// Footer Section Component
function DetailsFooter() {
  return (
    <motion.div
      className="border-t border-gray-200 pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
            <AvatarImage
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              className="mt-0 mb-0"
            />
            <AvatarFallback className="text-lg sm:text-xl font-bold">
              {AUTHOR.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 justify-center min-w-0">
            <p className="text-xl sm:text-2xl mb-0 mt-0 font-bold text-gray-900">
              {AUTHOR.name}
            </p>
            <p className="text-gray-600 mt-0 mb-0 text-sm sm:text-md max-w-sm">
              {AUTHOR.bio}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <Button variant="ghost" size="sm" asChild>
            <a
              href={SOCIAL_LINKS.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm"
            >
              Twitter
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm"
            >
              GitHub
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm"
            >
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogDetails() {
  const { blogs, blog, code, noBlog } = useLoaderData<typeof loader>();

  const ixEncodeStringIntoMdxModule = useCallback(
    (pure: string) => {
      return run(pure, {
        ...runtime,
        baseUrl: import.meta.url,
      });
    },
    [run]
  );

  const pMdxContent = useMemo(() => {
    if (!code) return null;
    return ixEncodeStringIntoMdxModule(code);
  }, [code, ixEncodeStringIntoMdxModule]);
  if (!blog || !code) {
    return (
      <motion.div
        className="flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              The blog post you are looking for does not exist or could not be
              loaded.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              Please check the URL or return to the blogs page to find another
              post.
            </p>
            <Button variant="default" size="sm" asChild>
              <Link to="/blogs">Browse All Posts</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container w-full max-w-5xl flex flex-col gap-4 mx-auto p-4 lg:p-8">
        {/* Header Section */}
        <DetailsHeader blog={blog} />

        <Separator className="w-full" />

        {/* Featured Image Section */}
        <DetailsFeatured blog={blog} />

        <Separator />

        {/* Main Content Grid - 12 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents - 3 columns with left border - First on mobile, Second on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-4">
            <DetailsTOC pMdxContent={pMdxContent} />
          </div>

          {/* Markdown Content - 9 columns - Second on mobile, First on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-9">
            <DetailsMarkdown pMdxContent={pMdxContent} />
          </div>
        </div>

        {/* Footer Section */}
        <DetailsFooter />
      </div>
    </motion.div>
  );
}
