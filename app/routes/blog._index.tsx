import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { SITE_DOMAIN, SITE_KEYWORDS, SITE_NAME } from "~/lib/constants";
import { getPosts } from "~/lib/posts";

export const meta: MetaFunction = () => {
  return [
    { title: `Blog | ${SITE_NAME}` },
    { name: "description", content: "Latest articles and tutorials." },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "og:title", content: `Blog | ${SITE_NAME}` },
    { name: "og:description", content: "Latest articles and tutorials." },
    { name: "og:url", content: `https://${SITE_DOMAIN}/blog` },
    { name: "og:image", content: `https://${SITE_DOMAIN}/og-image.png` },
  ];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return json({ posts: getPosts() });
};

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              to={`/blog/${post.slug}`}
              className="text-2xl text-primary hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-muted-foreground">{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
