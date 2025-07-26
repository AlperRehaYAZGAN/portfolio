import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_KEYWORDS,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { compile, run } from "@mdx-js/mdx";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json, Link, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Terminal,
  Twitter,
  Youtube,
} from "lucide-react";
import { executeAsync } from "promise-like-go";
import { Suspense, useCallback, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { MdxComponentWrapper } from "./blogs.$slug._index";
import { Badge } from "@/components/ui/badge";

export const meta: MetaFunction = () => {
  return [
    { title: `${SITE_NAME} | personal page` },
    { name: "description", content: "personal page of @alperreha" },
    { name: "author", content: AUTHOR.name },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "og:title", content: SITE_NAME },
    { name: "og:description", content: SITE_DESCRIPTION },
    { name: "og:url", content: `https://${SITE_DOMAIN}` },
    { name: "og:image", content: `https://${SITE_DOMAIN}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_NAME },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:creator", content: SOCIAL_LINKS.twitter.username },
  ];
};

export const loader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  // there is a repository on github "https://github.com/AlperRehaYAZGAN/AlperRehaYAZGAN".
  // In this repository there is a "README.md" file that index.page usage.
  // also has a "blogs" folder that has blog posts mdx files.
  // fetch "blogs" folder via github repository api and list all files
  const [call, noCall] = await executeAsync(
    async () =>
      await fetch(
        "https://raw.githubusercontent.com/AlperRehaYAZGAN/AlperRehaYAZGAN/refs/heads/main/README.md"
      )
  );
  if (!call?.ok || noCall) {
    return json({ about: null, code: null, noAbout: true });
  }

  const [about, noAbout] = await executeAsync(async () => call.text());
  if (!about || noAbout) {
    return json({ about: null, code: null, noAbout: noAbout });
  }

  const code = await compile(about, {
    outputFormat: "function-body",
    remarkPlugins: [
      remarkGfm,
      remarkMdx,
      remarkRehype,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [],
  });

  return json(
    {
      about,
      code: String(code),
      noAbout,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
        "Content-Type": "application/json",
      },
    }
  );
};

export default function Index() {
  return (
    <div className="mx-auto flex flex-col grow max-w-5xl w-full items-center justify-center py-4 ">
      <div className="grid md:grid-cols-9 grid-cols-1 w-full gap-8">
        <ProfileSection />
        <TerminalSection />
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="md:col-span-3 col-span-1 flex flex-col items-center justify-center gap-6 h-full">
      <motion.div
        className="w-full flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Image */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-xl">
            <img
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>

          <motion.div
            className="text-center flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge
              variant="default"
              className="text-lg font-bold h-8 rounded-xs"
            >
              {AUTHOR.name}
            </Badge>
            <Badge
              variant="outline"
              className="text-sm font-semibold h-8 rounded-xs"
            >
              {AUTHOR.username}
            </Badge>
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-2">
            <Link
              to={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              to={SOCIAL_LINKS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5 text-red-600" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
            <Link
              to={SOCIAL_LINKS.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                <span className="sr-only">X (Twitter)</span>
              </Button>
            </Link>
            <Link
              to={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5 text-gray-700" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/blogs"
            className="group text-sm font-medium text-primary transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Explore my articles
            </span>
            <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
function TerminalSection() {
  const { code, noAbout } = useLoaderData<typeof loader>();

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

  return (
    <motion.div
      className="md:col-span-6 col-span-1 h-full w-full p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full h-full overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="w-full h-8 bg-gray-100 flex items-center px-3 gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-600 font-mono">about.md - bash</p>
          </div>
          <div>
            <Terminal className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        <CardContent className="font-mono text-sm p-4 h-full w-full bg-gray-50">
          {noAbout ? (
            <div className="flex h-full justify-center items-center">
              <div className="text-gray-500">
                Unable to load about file content. Please refresh page.
              </div>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <div className="animate-pulse">Loading content...</div>
                </div>
              }
            >
              <div className="text-gray-800 prose">
                {pMdxContent ? (
                  <MdxComponentWrapper pMdxContent={pMdxContent} />
                ) : (
                  <div className="flex flex-col justify-center items-center h-52 text-center">
                    <p className="text-destructive">Failed to load about me.</p>
                    <p className="text-muted-foreground text-xs">
                      Please refresh the page to try again.
                    </p>
                  </div>
                )}
              </div>
            </Suspense>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
