import { Link, useLocation } from "react-router-dom";
import { QrCode, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "Generator", to: "/app" },
];

export function NavBar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex w-[95%] max-w-6xl items-center justify-between rounded-xl border border-border/70 bg-card/65 px-4 py-3 shadow-[0_0_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/20 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.45)]">
            <QrCode className="h-5 w-5" />
          </span>
          <span className="font-display text-sm tracking-widest text-foreground sm:text-base">
            VCARD NEON
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
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Sparkles className="hidden h-4 w-4 text-primary md:block" />
      </div>
    </header>
  );
}
