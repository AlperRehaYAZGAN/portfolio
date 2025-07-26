import { defineConfig } from "vite";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";
/**
 * @import {RollupOptions} from 'rollup'
 */

import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";

declare module "@remix-run/cloudflare" {}

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    tsconfigPaths(),
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkMdx,
        remarkToc,
        remarkRehype,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [
        // rehypePrettyCode // shiki causes workerd runtime error
      ],
    }),
    remix({
      ssr: true,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    minify: true,
  },
});
