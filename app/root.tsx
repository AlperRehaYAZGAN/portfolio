import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

// css
import AppShellComponent from "./appshell";
import "./tailwind.css";

import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return json({
    gaTrackingId: context.cloudflare.env.GA_TRACKING_ID,
    message: "Hello from worker loader",
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { message } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log("message from worker", message);
  }, [message]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppShellComponent>{children}</AppShellComponent>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
