"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";

import { useProModal } from "@/hooks/use-pro-modal";

import { SidebarProps } from "@/types/sidebar";

const FreeCounter = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const proModal = useProModal();
  const [progress, setProgress] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(
      () => setProgress((apiLimitCount / MAX_FREE_COUNTS) * 100),
      500
    );
    return () => clearTimeout(timer);
  }, [apiLimitCount]);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p className="">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={progress} />
          </div>
          <Button
            className="w-full"
            variant="premium"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
