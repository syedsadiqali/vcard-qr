import { Button } from "@/components/ui/button";
import type { VCardFormValues } from "@/lib/vcard";
import { ChevronLeft, ChevronRight, Download, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

type QrDisplayMode = "name" | "name-phone" | "full";

type QrTheme = {
  id: string;
  name: string;
  canvasBackground: string;
  frameBackground: string;
  frameBorder: string;
  titleColor: string;
  textColor: string;
  qrBackground: string;
};

const qrThemes: QrTheme[] = [
  {
    id: "clean-light",
    name: "Clean Light",
    canvasBackground: "#f8fafc",
    frameBackground: "#ffffff",
    frameBorder: "#cbd5e1",
    titleColor: "#0f172a",
    textColor: "#334155",
    qrBackground: "#ffffff",
  },
  {
    id: "midnight",
    name: "Midnight",
    canvasBackground: "#0f172a",
    frameBackground: "#111827",
    frameBorder: "#334155",
    titleColor: "#f8fafc",
    textColor: "#cbd5e1",
    qrBackground: "#ffffff",
  },
  {
    id: "ocean",
    name: "Ocean",
    canvasBackground: "#e0f2fe",
    frameBackground: "#f0f9ff",
    frameBorder: "#7dd3fc",
    titleColor: "#0c4a6e",
    textColor: "#0369a1",
    qrBackground: "#ffffff",
  },
  {
    id: "forest",
    name: "Forest",
    canvasBackground: "#ecfdf5",
    frameBackground: "#f0fdf4",
    frameBorder: "#86efac",
    titleColor: "#14532d",
    textColor: "#166534",
    qrBackground: "#ffffff",
  },
  {
    id: "contrast",
    name: "High Contrast",
    canvasBackground: "#ffffff",
    frameBackground: "#ffffff",
    frameBorder: "#000000",
    titleColor: "#000000",
    textColor: "#111111",
    qrBackground: "#ffffff",
  },
];

type QRPreviewCardProps = {
  vCard: string;
  fullName: string;
  canGenerate: boolean;
  values: VCardFormValues;
};

export function getVisibleDetails(
  mode: QrDisplayMode,
  values: VCardFormValues,
) {
  const lines: string[] = [];
  const name = `${values.firstname ?? ""} ${values.lastname ?? ""}`.trim();
  const mobile =
    `${values.mobileCountryCode ?? ""}${values.mobileNumber ?? ""}`.trim();
  const phone = (values.phoneNumber ?? "").trim();

  if (name) {
    lines.push(name);
  }

  if (mode === "name-phone" || mode === "full") {
    if (mobile) {
      lines.push(mobile);
    } else if (phone) {
      lines.push(phone);
    }
  }

  if (mode === "full") {
    if (values.email?.trim()) {
      lines.push(values.email.trim());
    }
    if (values.company?.trim()) {
      lines.push(values.company.trim());
    }
  }

  return lines;
}

export function QRPreviewCard({
  vCard,
  fullName,
  canGenerate,
  values,
}: QRPreviewCardProps) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<QrDisplayMode>("name-phone");

  const currentTheme = qrThemes[themeIndex];
  const visibleLines = useMemo(
    () => getVisibleDetails(displayMode, values),
    [displayMode, values],
  );

  const subtitle = "Scan to save this contact directly to your phone";

  const onThemeChange = (direction: "next" | "prev") => {
    setThemeIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % qrThemes.length;
      }

      return prev === 0 ? qrThemes.length - 1 : prev - 1;
    });
  };

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
    const qrSize = 1024;
    const padding = 48;
    const topSectionHeight = 210;
    const bottomSectionHeight = 140;

    img.onload = () => {
      if (!ctx) {
        return;
      }

      const width = qrSize + padding * 2;
      const height =
        qrSize + topSectionHeight + bottomSectionHeight + padding * 2;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = currentTheme.canvasBackground;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = currentTheme.frameBackground;
      ctx.strokeStyle = currentTheme.frameBorder;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(20, 20, width - 40, height - 40, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = currentTheme.titleColor;
      ctx.font = "700 56px Space Grotesk";
      ctx.textAlign = "center";

      const titleLine = visibleLines[0] ?? (fullName.trim() || "Contact Card");
      ctx.fillText(titleLine, width / 2, 92);

      ctx.fillStyle = currentTheme.textColor;
      ctx.font = "500 32px Space Grotesk";

      const extraLines = visibleLines.slice(1, 3);
      extraLines.forEach((line, index) => {
        ctx.fillText(line, width / 2, 138 + index * 40);
      });

      ctx.fillStyle = currentTheme.qrBackground;
      ctx.fillRect(padding, topSectionHeight + padding, qrSize, qrSize);
      ctx.drawImage(img, padding, topSectionHeight + padding, qrSize, qrSize);

      ctx.fillStyle = currentTheme.textColor;
      ctx.font = "500 30px Space Grotesk";
      ctx.fillText(subtitle, width / 2, height - 58);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${currentTheme.id}-vcard-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml,${encodeURIComponent(svgData)}`;
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-primary">
        Live Preview
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick a card style, choose visible text, then download.
      </p>

      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onThemeChange("prev")}
            aria-label="Previous QR theme"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Theme</p>
            <p className="text-sm font-semibold">{currentTheme.name}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onThemeChange("next")}
            aria-label="Next QR theme"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-secondary/30 p-2">
          <Button
            type="button"
            size="sm"
            variant={displayMode === "name" ? "default" : "outline"}
            onClick={() => setDisplayMode("name")}
          >
            Name Only
          </Button>
          <Button
            type="button"
            size="sm"
            variant={displayMode === "name-phone" ? "default" : "outline"}
            onClick={() => setDisplayMode("name-phone")}
          >
            Name + Phone
          </Button>
          <Button
            type="button"
            size="sm"
            variant={displayMode === "full" ? "default" : "outline"}
            onClick={() => setDisplayMode("full")}
          >
            More Info
          </Button>
        </div>
      </div>

      <div
        className="mt-5 rounded-xl border p-5"
        style={{
          backgroundColor: currentTheme.frameBackground,
          borderColor: currentTheme.frameBorder,
        }}
      >
        <div className="text-center" style={{ color: currentTheme.titleColor }}>
          <p className="text-lg font-semibold">
            {visibleLines[0] ?? "Contact Card"}
          </p>
          {visibleLines.slice(1, 3).map((line) => (
            <p
              key={line}
              className="mt-1 text-xs"
              style={{ color: currentTheme.textColor }}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className="relative mx-auto mt-4 aspect-square w-full max-w-[260px] rounded-md p-3"
          style={{ backgroundColor: currentTheme.qrBackground }}
        >
          <QRCode
            id="qr-live-preview"
            value={
              canGenerate ? vCard : "Fill name and number to unlock preview"
            }
            style={{ height: "100%", width: "100%" }}
          />

          {!canGenerate && (
            <div className="absolute inset-0 grid place-items-center rounded-md bg-black/65 p-3 text-center">
              <div>
                <Lock className="mx-auto h-5 w-5 text-white" />
                <p className="mt-2 text-xs font-medium text-white">
                  Fill first name and one phone number
                </p>
              </div>
            </div>
          )}
        </div>

        <p
          className="mt-4 text-center text-xs"
          style={{ color: currentTheme.textColor }}
        >
          {subtitle}
        </p>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={onImageDownload}
        disabled={!canGenerate}
      >
        <Download className="mr-2 h-4 w-4" />
        Download {currentTheme.name}
      </Button>
    </div>
  );
}
