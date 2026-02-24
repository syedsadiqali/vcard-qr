import { cn } from "@/lib/utils";
import { Moon, QrCode, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Generator", to: "/app" },
];

type NavBarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function NavBar({ theme, onToggleTheme }: NavBarProps) {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex w-[95%] max-w-6xl items-center justify-between rounded-xl border border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary">
            <QrCode className="h-5 w-5" />
          </span>
          <span className="font-display text-sm tracking-wide text-foreground sm:text-base">
            VCARD QR
          </span>
        </Link>

        <nav className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/50 p-1">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
