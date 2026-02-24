import { QRForm } from "@/components/QRForm";
import { QRPreviewCard } from "@/components/QRPreviewCard";
import { Seo } from "@/components/Seo";
import { type VCardFormValues, generateVCardString } from "@/lib/vcard";
import { useCallback, useState } from "react";

export function GeneratorPage() {
  const [vCardValue, setVCardValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [formValues, setFormValues] = useState<VCardFormValues>({
    firstname: "",
  });
  const [canGenerate, setCanGenerate] = useState(false);

  const handleLiveChange = useCallback(
    (payload: {
      values: VCardFormValues;
      canGenerate: boolean;
      fullName: string;
    }) => {
      const { values, canGenerate, fullName } = payload;
      const nextVCard = canGenerate ? generateVCardString(values) : "";
      setVCardValue(nextVCard);
      setCanGenerate(canGenerate);
      setFullName(fullName);
      setFormValues(values);
    },
    [],
  );

  return (
    <>
      <Seo
        title="Live vCard QR Builder"
        description="Enter contact details and generate a live vCard QR code with instant preview and PNG download."
        path="/app"
        keywords="live QR preview, vCard builder, contact QR download, QR PNG"
      />
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            VCARD QR STUDIO
          </p>
          <h1 className="font-display text-3xl sm:text-5xl">
            Build Your Shareable QR
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <QRForm onLiveChange={handleLiveChange} />
          <QRPreviewCard
            vCard={vCardValue}
            fullName={fullName}
            canGenerate={canGenerate}
            values={formValues}
          />
        </div>
      </section>
    </>
  );
}
