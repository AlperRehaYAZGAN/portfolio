import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_KEYWORDS,
  SITE_NAME,
  SOCIAL_LINKS,
} from "~/lib/constants";

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

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <ProfileSection />
    </div>
  );
}

function ProfileSection() {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
        }}
      />
      <motion.div
        className="relative mx-auto grid md:grid-cols-2 gap-8 items-center max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column - Profile Image and Social Links */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-primary">
            <img
              src="https://avatars.githubusercontent.com/u/43668181?s=256&v=4"
              alt={AUTHOR.name}
              width={144}
              height={144}
              className="object-cover"
            />
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded mb-2">
              {AUTHOR.name}
            </div>
            <div className="bg-black text-white py-1 px-4 rounded text-sm mb-4">
              {AUTHOR.username}
            </div>
          </motion.div>

          <div className="flex gap-4">
            <Link
              to={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                <Linkedin className="h-5 w-5 text-blue-500" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              to={SOCIAL_LINKS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Youtube className="h-5 w-5 text-red-500" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
            <Link
              to={SOCIAL_LINKS.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 border-2 border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column - About Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-primary font-mono">About</h2>

          <div className="space-y-3 font-mono bg-black/5 dark:bg-white/5 p-4 rounded-md border border-border">
            <motion.div
              className="leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-green-600 dark:text-green-500">$</span>{" "}
              <span className="text-foreground">Hello 👋, I'm alperreha.</span>
            </motion.div>

            <motion.div
              className="leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="text-green-600 dark:text-green-500">$</span>{" "}
              <span className="text-foreground">
                I am a software engineer who mainly focused fullstack
                development and worked devops technologies before.
              </span>
            </motion.div>

            <motion.div
              className="leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <span className="text-green-600 dark:text-green-500">$</span>{" "}
              <span className="text-orange-500 dark:text-orange-400">
                This page contains my development stuff 🔥 🚀
              </span>
            </motion.div>

            <motion.div
              className="leading-tight pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <span className="text-green-600 dark:text-green-500">$</span>{" "}
              <span className="text-foreground">
                I write personal stories on my blog below.
              </span>
            </motion.div>

            <motion.div
              className="leading-tight pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Link
                to="/blog"
                className="group flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <span className="relative">
                  See my latest posts
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                </span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
