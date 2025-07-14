import { LinkLogo } from "@/components/header/link-logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { Link } from "@remix-run/react";
import type React from "react";

function AppShellComponent({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center max-w-screen">
      <div className="flex-1 w-full flex flex-col">
        <nav className="w-full flex flex-row justify-center h-16 sticky top-0 bg-background border-b border-foreground/15">
          <div className="w-full flex flex-row justify-between items-center p-2 px-5 text-sm">
            {/* Animate left side */}
            <div className="flex gap-5 items-center font-semibold animate-in fade-in slide-in-from-left-2 duration-200">
              <LinkLogo />
              {/* Stagger theme switcher animation */}
            </div>

            {/* Animate right side */}
            <div className="flex flex-row gap-1 justify-end items-center">
              {/* Stagger nav item animations */}
              {NAV_LINKS.map((link, index) => (
                <Button
                  key={link.path}
                  size="sm"
                  variant="link"
                  className={`text-md animate-in fade-in slide-in-from-top-2 duration-400`}
                  asChild
                >
                  <Link to={link.path}>{link.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </nav>
        <div className="relative flex flex-col grow w-full max-w-full">
          {children}
        </div>

        <footer className="border-foreground/15 w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4 sticky bottom-0 bg-background">
          <p>All rights reserved &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
}

export default AppShellComponent;
