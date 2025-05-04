import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { SITE_DOMAIN } from "~/lib/constants";
import { Link } from "@remix-run/react";

export function LinkLogo() {
  const [cursorVisible, setCursorVisible] = useState(true);

  // Terminal cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530); // Blink interval in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/" className="inline-block">
      <div className="bg-primary text-primary-foreground font-mono px-3 py-1.5 rounded text-sm font-bold flex items-center">
        <span className="mr-1">$</span>
        <span>{SITE_DOMAIN}</span>
        <span
          className={cn(
            "h-4 w-2 ml-1 bg-primary-foreground",
            cursorVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transition: "opacity 0.1s" }}
        />
      </div>
    </Link>
  );
}
