import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { SITE_DOMAIN, SITE_NAME } from "~/lib/constants";
import { getPost } from "~/lib/posts";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug || "";
  const post = getPost(slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) return [{ title: "Post not found" }];
  const { post } = data;
  return [
    { title: `${post.title} | ${SITE_NAME}` },
    { name: "description", content: post.summary },
    { name: "og:title", content: `${post.title} | ${SITE_NAME}` },
    { name: "og:description", content: post.summary },
    { name: "og:url", content: `https://${SITE_DOMAIN}/blog/${post.slug}` },
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
