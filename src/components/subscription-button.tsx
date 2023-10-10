"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { SubscriptionButtonProps } from "@/types/subscription";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("api/payments");

      window.location.href = response.data.url;
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
