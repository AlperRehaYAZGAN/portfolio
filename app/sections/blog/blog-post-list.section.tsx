import { motion } from "framer-motion";
import { BlogPostListItemCard } from "@/components/blog/blog-post-list-item-card.component";

interface BlogPostListSectionProps {
  posts: any[];
}

export function BlogPostListSection({ posts }: BlogPostListSectionProps) {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={itemVariants}
            className="border-t border-gray-200 py-8"
          >
            <BlogPostListItemCard post={post} />
          </motion.div>
        ))
      ) : (
        <motion.div className="text-center py-24" variants={itemVariants}>
          <div className="mx-auto max-w-md">
            <div className="text-gray-400 mb-6">
              <svg
                className="w-20 h-20 mx-auto"
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
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              No posts yet
            </h3>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
