import { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type QRCodeModalProps = {
  value: string;
  sequence: number;
};

export function QRCodeModal({ value, sequence }: QRCodeModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasValue = value.trim() !== "";

  useEffect(() => {
    if (hasValue) {
      setDialogOpen(true);
    }
  }, [hasValue, sequence]);

  const qrId = useMemo(() => `qr-code-${sequence}`, [sequence]);

  const onImageDownload = () => {
    const svg = document.getElementById(qrId);
    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const padding = 30;
    const borderWidth = 4;

    img.onload = () => {
      if (!ctx) {
        return;
      }

      const width = 1024 + padding * 2;
      const height = 1024 + padding * 2;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#090b12";
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, padding, padding, 1024, 1024);

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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your vCard QR is ready</DialogTitle>
          <DialogDescription>
            Download the PNG and share it anywhere.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-xl border border-primary/50 bg-[#0e111a] p-4 shadow-[0_0_28px_rgba(255,138,0,0.2)]">
          <div className="mx-auto aspect-square w-full max-w-[280px] rounded-md bg-white p-3">
            <QRCode id={qrId} value={value} style={{ height: "100%", width: "100%" }} />
          </div>
        </div>

        <Button className="mt-2 w-full" onClick={onImageDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PNG
        </Button>
      </DialogContent>
    </Dialog>
  );
}
