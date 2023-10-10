"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./Sidebar-Item";
import FreeCounter from "./free-counter";
import { SidebarRoute } from "@/types/sidebar-routes";
import { SidebarProps } from "@/types/sidebar";

const routes: SidebarRoute[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/generation/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/generation/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/generation/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/generation/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/generation/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-44 h-8 mr-4">
            <Image fill alt="Logo" src="/logo-light.png" />
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              route={route}
              isActive={pathname === route.href}
            />
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};
