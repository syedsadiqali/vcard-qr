import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function QRCodeA({ value, b}: { value: string, b: number}) {
  
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if(value) {
      setDialogOpen(!!value)
    }
  }, [value, b])
  
//   const handleShare = async () => {
//     const newFile = await toBlob(imageRef.current);
//     const data = {
//       files: [
//         new File([newFile], 'image.png', {
//           type: newFile.type,
//         }),
//       ],
//       title: 'Image',
//       text: 'image',
//     };

//     try {
//       await navigator.share(data);
//    } catch (err) {
//      console.error(err);
//    }
// }

  
  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg as HTMLElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const padding = 30; // Adjust the padding as needed
    const borderWidth = 3; // Adjust the border width as needed
    const borderColor = "blue"; // Adjust the border color as needed
  
    img.onload = () => {
      if (ctx) {
        const width = 1024 + padding * 2;
        const height = 1024 + padding * 2 + borderWidth * 2;
  
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(
          borderWidth,
          borderWidth,
          width - borderWidth * 2,
          height - borderWidth * 2
        );
  
        canvas.width = width;
        canvas.height = height;
  
        // Draw white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
  
        // Draw the QR code with padding
        ctx.drawImage(img, padding, padding, 1024, 1024);
  
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(
          borderWidth,
          borderWidth,
          width - borderWidth * 2,
          height - borderWidth * 2
        );
  
        // Convert the canvas to a PNG file
        const pngFile = canvas.toDataURL("image/png");
  
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.download = "QRCode";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
  
    // Convert SVG data to data URI
    const svgDataURI = `data:image/svg+xml,${encodeURIComponent(svgData)}`;
    img.src = svgDataURI;
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="rounded-md w-[90%] md:max-w-300px">
        <DialogHeader>
          <DialogTitle className="text-center">Here is your QR</DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center">
            <div
              style={{
                marginTop: "50px",                
                padding: "20px",
                border: "2px solid blue",
              }}
              className="flex justify-center items-center mx-auto"
            >
              <QRCode
                id="QRCode"
                value={value}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <Button className="mt-8" onClick={onImageCownload}>Download</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
