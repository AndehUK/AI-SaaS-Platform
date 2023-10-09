import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs/app-beta";

export default function DashboardPage() {
  return (
    <div>
      <p>Dashboard Page (Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
