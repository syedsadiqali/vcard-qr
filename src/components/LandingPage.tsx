import { buildLandingStructuredData, landingPages } from "@/lib/landing-pages";
import { stringifyStructuredData } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

type LandingPageKey = keyof typeof landingPages;

export function LandingPage({ pageKey }: { pageKey: LandingPageKey }) {
  const page = landingPages[pageKey];
  const relatedPages = Object.values(landingPages).filter(
    (item) => item.slug !== page.slug,
  );
  const structuredData = stringifyStructuredData(
    buildLandingStructuredData(page),
  );

  return (
    <>
      <script type="application/ld+json">{structuredData}</script>

      <article className="space-y-8">
        <section className="overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 shadow-sm sm:px-10 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.35em] text-primary sm:text-sm">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {page.heroDescription}
              </p>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {page.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/vcard-qr-generator"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Open Generator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-6">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                Why this page ranks
              </p>
              <div className="mt-5 space-y-4">
                {page.benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h2 className="text-sm font-semibold sm:text-base">
                        {benefit.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              Quick Steps
            </p>
            <ol className="mt-5 space-y-4">
              {page.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm text-muted-foreground sm:text-base">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              Frequently Asked Questions
            </p>
            <div className="mt-5 space-y-4">
              {page.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-xl border border-border/70 bg-background/50 p-4"
                >
                  <h2 className="text-sm font-semibold sm:text-base">
                    {faq.question}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                Related Pages
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl">
                Explore related search intents
              </h2>
            </div>
            <Link
              to="/vcard-qr-generator"
              className="text-sm font-medium text-primary hover:underline"
            >
              Start building now
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <Link
                key={relatedPage.slug}
                to={relatedPage.path}
                className="rounded-xl border border-border/70 bg-background/50 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                  {relatedPage.keyword}
                </p>
                <h3 className="mt-2 text-base font-semibold">
                  {relatedPage.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {relatedPage.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
