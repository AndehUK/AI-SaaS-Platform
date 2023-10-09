"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { SidebarRoute } from "@/types/sidebar-routes";

export const SidebarItem = ({
  route,
  isActive,
}: {
  route: SidebarRoute;
  isActive: boolean;
}) => {
  return (
    <Link
      href={route.href}
      className={cn(
        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
        isActive ? "text-white bg-white/10" : "text-zinc-400"
      )}
    >
      <div className="flex items-center flex-1">
        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
        {route.label}
      </div>
    </Link>
  );
};
