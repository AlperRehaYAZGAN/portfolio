import { SITE_DOMAIN, SITE_KEYWORDS, SITE_NAME } from "@/lib/constants";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { getPosts } from "@/.server/posts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: `Blog - @${SITE_NAME}` },
    {
      name: "description",
      content: "en yeni içeriklerimin olduğu blog sayfam",
    },
    {
      name: "keywords",
      content: SITE_KEYWORDS,
    },
    { name: "og:title", content: `Blog | ${SITE_NAME}` },
    {
      name: "og:description",
      content: "en yeni içeriklerimin olduğu blog sayfam",
    },
    { name: "og:url", content: `https://${SITE_DOMAIN}/blog` },
    { name: "og:image", content: `https://${SITE_DOMAIN}/og-image.png` },
  ];
};

export const loader = async () => {
  const posts = await getPosts();
  return posts?.filter((post) => post.frontmatter.featured);
};

export default function Posts() {
  const featuredPosts = useLoaderData<typeof loader>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Blog
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En yeni teknoloji yazıları ve düşüncelerimin yer aldığı kişisel blog
            sayfam
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* Featured Posts Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center gap-3 mb-12"
            variants={cardVariants}
          >
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ✨ Öne Çıkan Yazılar
            </Badge>
            <div className="flex-1 h-px bg-gray-200"></div>
          </motion.div>

          {featuredPosts && featuredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post: any, index: number) => (
                <motion.div
                  key={post.slug}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={post.frontmatter.published}>
                              {formatDate(post.frontmatter.published)}
                            </time>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 overflow-hidden">
                          <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            {post.frontmatter.title}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 leading-relaxed overflow-hidden">
                          <span
                            className="block overflow-hidden text-ellipsis"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.frontmatter.description}
                          </span>
                        </CardDescription>
                        <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                          <Clock className="w-4 h-4" />
                          <span>Devamını oku</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div className="text-center py-16" variants={cardVariants}>
              <div className="mx-auto max-w-md">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Henüz öne çıkan yazı yok
                </h3>
                <p className="text-gray-600">
                  Yakında yeni içerikler eklenecek!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
