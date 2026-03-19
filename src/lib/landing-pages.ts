import { absoluteUrl } from "@/lib/site";

type LandingPage = {
  slug: string;
  path: string;
  keyword: string;
  title: string;
  description: string;
  ogImage: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  intro: string;
  benefits: Array<{ title: string; description: string }>;
  steps: string[];
  faqs: Array<{ question: string; answer: string }>;
  schemaType: "faq" | "howto" | "software";
};

export const landingPages: Record<string, LandingPage> = {
  qrCodeForContact: {
    slug: "qr-code-for-contact",
    path: "/qr-code-for-contact",
    keyword: "qr code for contact",
    title: "QR Code for Contact Sharing",
    description:
      "Create a QR code for contact sharing that lets people scan and save your phone, email, company, and website details instantly.",
    ogImage: "/og/qr-code-for-contact.svg",
    eyebrow: "CONTACT QR PAGE",
    heroTitle: "Create a QR Code for Contact Sharing in Minutes",
    heroDescription:
      "Turn your contact details into a scan-ready code that opens the phone's native save-contact flow instead of a landing page.",
    intro:
      "This page targets people looking for a direct qr code for contact use case: one scan, one save, less friction at events, storefronts, and packaging.",
    benefits: [
      {
        title: "Save contacts faster",
        description:
          "Visitors scan once and get a ready-to-save contact instead of typing names, phones, and emails manually.",
      },
      {
        title: "Use the full vCard payload",
        description:
          "Include phone, company, job title, email, website, and address fields inside the QR payload.",
      },
      {
        title: "Share anywhere",
        description:
          "Place the QR on brochures, kiosks, desks, booth walls, product inserts, or email signatures.",
      },
    ],
    steps: [
      "Enter your contact information in the generator.",
      "Review the live preview and choose a card theme.",
      "Download the QR image and publish it anywhere people can scan.",
    ],
    faqs: [
      {
        question: "What should a QR code for contact include?",
        answer:
          "The most useful setup includes a full name, at least one phone number, and any optional company, email, website, or address details you want phones to save.",
      },
      {
        question: "Does it open a website before saving the contact?",
        answer:
          "No. This tool encodes vCard contact data directly into the QR so supported phones can save the contact without an extra landing page step.",
      },
    ],
    schemaType: "faq",
  },
  vcardQrCodeFree: {
    slug: "vcard-qr-code-free",
    path: "/vcard-qr-code-free",
    keyword: "free vcard qr code",
    title: "Free vCard QR Code Generator",
    description:
      "Generate a free vCard QR code with live preview, downloadable QR themes, and direct contact-saving support.",
    ogImage: "/og/vcard-qr-code-free.svg",
    eyebrow: "FREE VCARD TOOL",
    heroTitle: "Generate a Free vCard QR Code Without Extra Steps",
    heroDescription:
      "Build a contact QR in the browser, preview it instantly, and download a polished image for free.",
    intro:
      "This landing page is tuned for users searching for a free vcard qr code tool, so the messaging focuses on speed, no-cost creation, and instant export.",
    benefits: [
      {
        title: "Free to use",
        description:
          "Create and download your contact QR without switching to another app or workflow.",
      },
      {
        title: "Live preview while typing",
        description:
          "See the encoded result update instantly, which helps catch missing details before you download.",
      },
      {
        title: "Download branded styles",
        description:
          "Choose from multiple visual themes so the QR matches your handout, badge, or marketing material.",
      },
    ],
    steps: [
      "Add your name and at least one phone number.",
      "Optionally add email, company, website, and address details.",
      "Pick a theme and download the finished QR card image.",
    ],
    faqs: [
      {
        question: "Is this really a free vCard QR code generator?",
        answer:
          "Yes. You can generate the QR code, preview it, and download the exported card image from the browser without a paid step in this workflow.",
      },
      {
        question: "Can I include more than just a phone number?",
        answer:
          "Yes. You can encode additional fields like email, organization, title, website, and address inside the vCard data.",
      },
    ],
    schemaType: "software",
  },
  qrCodeBusinessCard: {
    slug: "qr-code-business-card",
    path: "/qr-code-business-card",
    keyword: "qr code business card",
    title: "QR Code Business Card Generator",
    description:
      "Create a QR code business card that helps prospects save your details from conferences, meetings, trade shows, and printed collateral.",
    ogImage: "/og/qr-code-business-card.svg",
    eyebrow: "BUSINESS CARD QR",
    heroTitle: "Create a QR Code Business Card for Events and Sales",
    heroDescription:
      "Replace manual contact entry with a scan-first digital business card that works on printed and on-screen materials.",
    intro:
      "This page is focused on commercial and networking intent, with copy designed around modern business card use cases instead of generic QR language.",
    benefits: [
      {
        title: "Better event follow-up",
        description:
          "Use a scannable business card at expos, demos, and networking meetups so new contacts save your details correctly.",
      },
      {
        title: "Works across print and digital",
        description:
          "Add the code to business cards, slide decks, table tents, proposals, and intro decks.",
      },
      {
        title: "Looks presentation-ready",
        description:
          "Export a QR card image that feels polished enough for brand materials, not just internal use.",
      },
    ],
    steps: [
      "Build your vCard with business contact details.",
      "Choose how much visible information appears around the QR.",
      "Download and add the QR to your business card design or event assets.",
    ],
    faqs: [
      {
        question: "Why use a QR code on a business card?",
        answer:
          "It reduces friction. Instead of manually typing details from a paper card, people scan and save your contact from their phone in a few seconds.",
      },
      {
        question: "Can I use this for team members and sales reps?",
        answer:
          "Yes. The generator works well for founders, recruiters, account executives, support leads, and any team member who shares contact details regularly.",
      },
    ],
    schemaType: "faq",
  },
  howToCreateVcardQrCode: {
    slug: "how-to-create-vcard-qr-code",
    path: "/how-to-create-vcard-qr-code",
    keyword: "how to create vcard qr code",
    title: "How to Create a vCard QR Code",
    description:
      "Learn how to create a vCard QR code step by step, from choosing contact fields to downloading a shareable QR image.",
    ogImage: "/og/how-to-create-vcard-qr-code.svg",
    eyebrow: "STEP-BY-STEP GUIDE",
    heroTitle: "How to Create a vCard QR Code That Saves Contact Details",
    heroDescription:
      "Follow a simple process to generate a contact QR code with the right fields, better scannability, and a polished export.",
    intro:
      "This page matches informational search intent, so it explains the process clearly while still guiding readers into the live generator when they are ready.",
    benefits: [
      {
        title: "Know which fields matter",
        description:
          "Start with first name and phone number, then add optional details only when they improve the saved contact record.",
      },
      {
        title: "Preview before exporting",
        description:
          "A live preview helps confirm that the QR unlocks properly and that the card presentation fits your use case.",
      },
      {
        title: "Publish with confidence",
        description:
          "Once downloaded, you can add the final QR image to print, packaging, presentation slides, or digital handouts.",
      },
    ],
    steps: [
      "Open the generator and enter the contact details you want phones to save.",
      "Confirm the preview activates once the minimum required fields are present.",
      "Choose a card theme and visible info mode based on where the QR will be shared.",
      "Download the QR image and test it on a real device before publishing.",
    ],
    faqs: [
      {
        question: "What is the minimum data needed to create a vCard QR code?",
        answer:
          "In this generator, the minimum required information is a first name and one phone number. Everything else is optional.",
      },
      {
        question: "Should I test the code before printing it?",
        answer:
          "Yes. Always scan the final export on a real phone to confirm the contact data appears correctly before printing large batches.",
      },
    ],
    schemaType: "howto",
  },
};

export function buildLandingStructuredData(page: LandingPage) {
  const base = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        url: absoluteUrl(page.path),
        description: page.description,
        about: page.keyword,
      },
    ] as Array<Record<string, unknown>>,
  };

  if (page.schemaType === "software") {
    base["@graph"].push({
      "@type": "SoftwareApplication",
      name: page.title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
  }

  if (page.schemaType === "howto") {
    base["@graph"].push({
      "@type": "HowTo",
      name: page.title,
      description: page.description,
      step: page.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `Step ${index + 1}`,
        text: step,
      })),
    });
  }

  base["@graph"].push({
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  return base;
}
