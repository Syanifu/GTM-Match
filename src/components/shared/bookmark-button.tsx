"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BookmarkButtonProps {
  isBookmarked?: boolean;
  onBookmark?: () => void;
  className?: string;
}

export function BookmarkButton({
  isBookmarked: initialBookmarked = false,
  onBookmark,
  className,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={cn("transition-all", className)}
          >
            <Bookmark
              className={cn(
                "h-4 w-4 transition-all",
                isBookmarked && "fill-current text-primary"
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "Remove bookmark" : "Bookmark"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
