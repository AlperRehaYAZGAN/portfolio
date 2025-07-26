import { Badge } from "@/components/ui/badge";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

interface BlogPostListItemCardProps {
  post: any;
}

export function BlogPostListItemCard({ post }: BlogPostListItemCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateTags = (title: string, description: string) => {
    const allTags = [
      { name: "REACT", color: "text-blue-600" },
      { name: "TYPESCRIPT", color: "text-blue-700" },
      { name: "JAVASCRIPT", color: "text-yellow-600" },
      { name: "NODE.JS", color: "text-green-600" },
      { name: "NEXT.JS", color: "text-gray-700" },
      { name: "TAILWIND", color: "text-cyan-600" },
      { name: "CSS", color: "text-blue-500" },
      { name: "HTML", color: "text-orange-600" },
      { name: "WEB", color: "text-purple-600" },
      { name: "TUTORIAL", color: "text-pink-600" },
      { name: "GUIDE", color: "text-indigo-600" },
      { name: "TIPS", color: "text-green-500" },
      { name: "DEVELOPMENT", color: "text-cyan-500" },
      { name: "PROGRAMMING", color: "text-red-600" },
      { name: "TECH", color: "text-gray-600" },
      { name: "GIT", color: "text-orange-500" },
      { name: "VERSION-CONTROL", color: "text-purple-500" },
      { name: "MERGE", color: "text-pink-500" },
      { name: "BLUETOOTH", color: "text-blue-500" },
      { name: "LINUX", color: "text-yellow-500" },
      { name: "WINDOWS", color: "text-blue-400" },
      { name: "DUAL-BOOT", color: "text-green-400" },
      { name: "TROUBLESHOOTING", color: "text-red-500" },
    ];

    const content = (title + " " + description).toLowerCase();
    const matchedTags = allTags.filter(
      (tag) =>
        content.includes(tag.name.toLowerCase()) ||
        content.includes(tag.name.toLowerCase().replace(".", "")) ||
        content.includes(tag.name.toLowerCase().replace("-", ""))
    );

    // If no matches, return some default tags
    if (matchedTags.length === 0) {
      return [
        { name: "BLOG", color: "text-gray-600" },
        { name: "TECH", color: "text-blue-600" },
      ];
    }

    return matchedTags.slice(0, 3); // Return max 3 tags
  };

  return (
    <Link to={`/blogs/${post.slug}`} className="block group">
      <motion.article
        whileHover={{
          y: -4,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Content - 9 columns (or 12 if no image) */}
        <div
          className={`${
            post.image ? "lg:col-span-9" : "lg:col-span-12"
          } space-y-3`}
        >
          {/* Date */}
          <motion.time
            className="text-gray-500 text-sm font-medium"
            dateTime={post.published}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {formatDate(post.published)}
          </motion.time>

          {/* Title */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {post.title}
          </motion.h2>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {generateTags(post.title, post.description).map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className={`${tag.color} bg-gray-100 hover:bg-gray-200 text-xs px-3 py-1 font-medium border-none transition-colors duration-200`}
              >
                {tag.name}
              </Badge>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {post.description}
          </motion.p>

          {/* Read More */}
          <motion.div
            className="flex items-center gap-2 text-primary hover:text-blue-600 transition-colors text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Read more</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Featured Image - 3 columns */}
        {post.image && (
          <motion.div
            className="lg:col-span-3 w-full h-full flex items-end justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        )}
      </motion.article>
    </Link>
  );
}
