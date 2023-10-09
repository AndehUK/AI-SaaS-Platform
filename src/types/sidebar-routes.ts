import { type LucideIcon } from "lucide-react";

export interface SidebarRoute {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}
