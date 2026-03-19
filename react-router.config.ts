import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  buildDirectory: "dist",
  ssr: false,
  prerender: [
    "/",
    "/vcard-qr-generator",
    "/qr-code-for-contact",
    "/vcard-qr-code-free",
    "/qr-code-business-card",
    "/how-to-create-vcard-qr-code",
  ],
} satisfies Config;
