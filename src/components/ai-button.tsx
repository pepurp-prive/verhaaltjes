"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { AiSparklesIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type AiButtonProps = {
  onClick: () => Promise<void>;
  tooltip: string;
  className?: string;
  disabled?: boolean;
};

export function AiButton({ onClick, tooltip, className, disabled }: AiButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClick}
            disabled={isLoading || disabled}
            className={cn("h-7 w-7 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300", className)}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <AiSparklesIcon className="h-5 w-5" />}
            <span className="sr-only">{tooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

    