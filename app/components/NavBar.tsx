import { FloatingNav } from "@/components/ui/floating-navbar";
import { HomeIcon, QrCodeIcon } from "lucide-react";

export function NavBar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "App",
      link: "/app",
      icon: <QrCodeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="h-[150px] w-full">
      <FloatingNav floatPlease={false} navItems={navItems} />
    </div>
  );
}
