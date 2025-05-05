import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SITE_DOMAIN, SITE_KEYWORDS, SITE_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: `Blog | ${SITE_NAME}` },
    { name: "description", content: "Blog sayfası yakında sizlerle olacak." },
    {
      name: "keywords",
      content: SITE_KEYWORDS,
    },
    { name: "og:title", content: `Blog | ${SITE_NAME}` },
    {
      name: "og:description",
      content: "Blog sayfası yakında sizlerle olacak.",
    },
    { name: "og:url", content: `https://${SITE_DOMAIN}/blog` },
    { name: "og:image", content: `https://${SITE_DOMAIN}/og-image.png` },
  ];
};

export default function Blog() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <div className="animate-in fade-in slide-in-from-top-2 duration-400 flex flex-col items-center max-w-md">
        <Construction className="h-16 w-16 text-primary mb-4" />

        <h1 className="text-4xl font-bold mb-2">Blog Page</h1>

        <div className="h-1 w-20 bg-primary my-4 rounded-full"></div>

        <p className="text-xl mb-2">Coming Soon</p>

        <p className="text-muted-foreground mb-8">
          My blog is currently under construction. I will soon share my articles
          about Golang, Rust, Next.js and other technologies here.
        </p>

        <Button asChild className="group">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
