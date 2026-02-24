import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 px-6 py-16 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-lg sm:px-10 sm:py-24">
      <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[hsl(var(--secondary))]/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-primary sm:text-sm">
          CONTACT SHARING REIMAGINED
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          Create a Neon vCard QR in Seconds
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Turn your contact details into a clean, scannable QR code. Perfect for
          profile cards, conference booths, and product packaging. People can
          save your contact directly from the QR scan without visiting another
          website.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/app">
              Open Generator
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
