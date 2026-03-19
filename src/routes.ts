import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("home", "./routes/home-alias.tsx"),
  route("vcard-qr-generator", "./routes/app.tsx"),
  route("qr-code-for-contact", "./routes/qr-code-for-contact.tsx"),
  route("vcard-qr-code-free", "./routes/vcard-qr-code-free.tsx"),
  route("qr-code-business-card", "./routes/qr-code-business-card.tsx"),
  route(
    "how-to-create-vcard-qr-code",
    "./routes/how-to-create-vcard-qr-code.tsx",
  ),
] satisfies RouteConfig;
