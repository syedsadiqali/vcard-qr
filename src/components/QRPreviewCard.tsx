import QRCode from "react-qr-code";
import { Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

type QRPreviewCardProps = {
  vCard: string;
  fullName: string;
  canGenerate: boolean;
};

export function QRPreviewCard({ vCard, fullName, canGenerate }: QRPreviewCardProps) {
  const title = fullName.trim() || "Contact Card";
  const subtitle = "Scan this to save directly to your phone";

  const onImageDownload = () => {
    if (!canGenerate || vCard.trim() === "") {
      return;
    }

    const svg = document.getElementById("qr-live-preview");
    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const padding = 30;
    const topSectionHeight = 120;
    const bottomSectionHeight = 110;
    const borderWidth = 4;

    img.onload = () => {
      if (!ctx) {
        return;
      }

      const qrSize = 1024;
      const width = qrSize + padding * 2;
      const height = qrSize + padding * 2 + topSectionHeight + bottomSectionHeight;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#090b12";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ff8a00";
      ctx.font = "700 54px Space Grotesk";
      ctx.textAlign = "center";
      ctx.fillText(title, width / 2, 72);

      ctx.fillStyle = "#ffd4a2";
      ctx.font = "500 34px Space Grotesk";
      ctx.fillText(subtitle, width / 2, height - 44);

      ctx.drawImage(img, padding, topSectionHeight + padding, qrSize, qrSize);

      ctx.strokeStyle = "#ff8a00";
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(6, 6, width - 12, height - 12);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "vcard-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml,${encodeURIComponent(svgData)}`;
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <p className="font-display text-xs uppercase tracking-[0.25em] text-primary">Live QR</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Updates as you type. No dialog; download directly when ready.
      </p>

      <div className="mt-6 rounded-xl border border-primary/40 bg-[#0e111a] p-5 shadow-[0_0_30px_rgba(255,138,0,0.2)]">
        <p className="mb-3 text-center text-lg font-semibold text-primary">{title}</p>

        <div className="relative mx-auto aspect-square w-full max-w-[260px] rounded-md bg-white p-3">
          <QRCode
            id="qr-live-preview"
            value={canGenerate ? vCard : "Fill name and number to unlock preview"}
            style={{ height: "100%", width: "100%" }}
          />

          {!canGenerate && (
            <div className="absolute inset-0 grid place-items-center rounded-md bg-black/70 p-3 text-center">
              <div>
                <Lock className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-xs font-medium text-primary">
                  Fill first name and one phone number
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-3 text-center text-sm text-primary/90">{subtitle}</p>
      </div>

      <Button className="mt-4 w-full" onClick={onImageDownload} disabled={!canGenerate}>
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
    </div>
  );
}
