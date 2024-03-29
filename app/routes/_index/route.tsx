import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";

export default function GridBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col items-center">
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Contact to vCard QRCode
        </p>
        <Link to="/app">
          <Button size={"lg"} className="font-bold w-[200px]">
            {" "}
            Go to App!
          </Button>
        </Link>
      </div>
    </div>
  );
}
