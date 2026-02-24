import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { QRForm } from "@/components/QRForm";
import { QRCodeModal } from "@/components/QRCodeModal";
import { generateVCardString, type VCardFormValues } from "@/lib/vcard";

export function GeneratorPage() {
  const [vCard, setVCard] = useState("");
  const [sequence, setSequence] = useState(0);

  const qrPreviewValue = useMemo(
    () =>
      vCard ||
      "BEGIN:VCARD\nVERSION:4.0\nFN:Jane Doe\nTEL:+1 000 000 0000\nEMAIL:jane@example.com\nEND:VCARD",
    [vCard]
  );

  const handleGenerate = (values: VCardFormValues) => {
    const nextVCard = generateVCardString(values);
    setVCard(nextVCard);
    setSequence((prev) => prev + 1);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
          VCARD QR STUDIO
        </p>
        <h1 className="font-display text-3xl sm:text-5xl">Build Your Shareable QR</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <QRForm onGenerate={handleGenerate} />

        <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-primary">
            Live Preview
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your generated QR appears in a modal and can be downloaded as PNG.
          </p>

          <div className="mt-6 flex justify-center rounded-xl border border-primary/40 bg-[#0e111a] p-5 shadow-[0_0_30px_rgba(255,138,0,0.2)]">
            <div className="w-full max-w-[260px] rounded-md bg-white p-3">
              <QRCode value={qrPreviewValue} style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
        </div>
      </div>

      <QRCodeModal value={vCard} sequence={sequence} />
    </section>
  );
}
