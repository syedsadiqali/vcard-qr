import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

export function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Neon vCard QR Generator",
        url: "/",
        description:
          "Create scannable vCard QR codes that save contacts directly to phones.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Neon vCard QR Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does scanning open a website first?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The QR contains vCard data directly, so phones can save the contact without opening a landing page.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum data required?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "First name and at least one phone number are required. Email, website, and company are optional.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Create and Download vCard QR Codes"
        description="Create scannable vCard QR codes that save contacts directly to phones. No landing page required."
        path="/"
        keywords="vCard QR code generator, contact QR, save contact from QR, download QR PNG"
        structuredData={structuredData}
      />

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

        <div className="mt-10">
          <p className="font-display text-center text-xs uppercase tracking-[0.3em] text-primary">
            How To Use
          </p>
        </div>

        <div className="mt-4 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-background/50 p-4">
            <p className="font-display text-xs tracking-[0.25em] text-primary">01</p>
            <p className="mt-2 text-sm font-semibold">Fill details</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add first name and at least one number. Optional fields can be added anytime.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/50 p-4">
            <p className="font-display text-xs tracking-[0.25em] text-primary">02</p>
            <p className="mt-2 text-sm font-semibold">See live QR</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The preview updates instantly as you type, so you always know what gets encoded.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/50 p-4">
            <p className="font-display text-xs tracking-[0.25em] text-primary">03</p>
            <p className="mt-2 text-sm font-semibold">Download and share</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Export PNG and let people scan to save your contact directly on their phone.
            </p>
          </div>
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-2xl text-left" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-xl text-foreground sm:text-2xl">
            Quick FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <article className="rounded-lg border border-border/70 bg-background/40 p-4">
              <h3 className="text-sm font-semibold">Does scanning open a website first?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No. The QR contains vCard data directly, so phones can save the contact without opening a landing page.
              </p>
            </article>
            <article className="rounded-lg border border-border/70 bg-background/40 p-4">
              <h3 className="text-sm font-semibold">What is the minimum data required?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                First name and at least one phone number are required. Email, website, and company are optional.
              </p>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}
