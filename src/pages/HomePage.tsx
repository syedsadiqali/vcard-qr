import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  const landingPages = [
    {
      title: "QR Code for Contact",
      description:
        "Rank a dedicated page for people who want a direct contact-saving QR flow.",
      to: "/qr-code-for-contact",
    },
    {
      title: "Free vCard QR Code",
      description:
        "Target free-tool intent with a page focused on no-cost generation and download.",
      to: "/vcard-qr-code-free",
    },
    {
      title: "QR Code Business Card",
      description:
        "Speak to conferences, networking, sales, recruiting, and business card use cases.",
      to: "/qr-code-business-card",
    },
    {
      title: "How to Create a vCard QR Code",
      description:
        "Capture informational search intent with a step-by-step guide that points into the app.",
      to: "/how-to-create-vcard-qr-code",
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 shadow-sm sm:px-10 sm:py-24">
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-primary sm:text-sm">
          CONTACT SHARING REIMAGINED
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          Create a vCard QR in Seconds
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Turn your contact details into a clean, scannable QR code. Perfect for
          profile cards, conference booths, and product packaging. People can
          save your contact directly from the QR scan without visiting another
          website.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/vcard-qr-generator">
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
            <p className="font-display text-xs tracking-[0.25em] text-primary">
              01
            </p>
            <p className="mt-2 text-sm font-semibold">Fill details</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add first name and at least one number. Optional fields can be
              added anytime.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/50 p-4">
            <p className="font-display text-xs tracking-[0.25em] text-primary">
              02
            </p>
            <p className="mt-2 text-sm font-semibold">See live QR</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The preview updates instantly as you type, so you always know what
              gets encoded.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/50 p-4">
            <p className="font-display text-xs tracking-[0.25em] text-primary">
              03
            </p>
            <p className="mt-2 text-sm font-semibold">Download and share</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Export PNG and let people scan to save your contact directly on
              their phone.
            </p>
          </div>
        </div>
      </div>

      <section
        className="mx-auto mt-12 max-w-5xl text-left"
        aria-labelledby="seo-pages-heading"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              Explore Use Cases
            </p>
            <h2
              id="seo-pages-heading"
              className="mt-2 font-display text-2xl text-foreground sm:text-3xl"
            >
              Find the right page for each contact-sharing use case
            </h2>
          </div>
          <Link
            to="/vcard-qr-generator"
            className="text-sm font-medium text-primary hover:underline"
          >
            Open the generator
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {landingPages.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className="rounded-xl border border-border/70 bg-background/50 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
            >
              <h3 className="font-display text-lg text-foreground">
                {page.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="mx-auto mt-10 max-w-2xl text-left"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="font-display text-xl text-foreground sm:text-2xl"
        >
          Quick FAQ
        </h2>
        <div className="mt-4 space-y-3">
          <article className="rounded-lg border border-border/70 bg-background/40 p-4">
            <h3 className="text-sm font-semibold">
              Does scanning open a website first?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No. The QR contains vCard data directly, so phones can save the
              contact without opening a landing page.
            </p>
          </article>
          <article className="rounded-lg border border-border/70 bg-background/40 p-4">
            <h3 className="text-sm font-semibold">
              What is the minimum data required?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              First name and at least one phone number are required. Email,
              website, and company are optional.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
