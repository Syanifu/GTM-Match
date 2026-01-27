"use client";

import { useState } from "react";
import { ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UpvoteButtonProps {
  count: number;
  isUpvoted?: boolean;
  onUpvote?: () => void;
  className?: string;
}

export function UpvoteButton({
  count,
  isUpvoted: initialUpvoted = false,
  onUpvote,
  className,
}: UpvoteButtonProps) {
  const [isUpvoted, setIsUpvoted] = useState(initialUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(count);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvoteCount((prev) => prev - 1);
      setIsUpvoted(false);
    } else {
      setUpvoteCount((prev) => prev + 1);
      setIsUpvoted(true);
    }
    onUpvote?.();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUpvote}
      className={cn(
        "flex items-center gap-1 transition-all",
        isUpvoted && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      <ArrowBigUp
        className={cn(
          "h-4 w-4 transition-all",
          isUpvoted && "fill-current"
        )}
      />
      <span className="text-sm font-medium">{upvoteCount}</span>
    </Button>
  );
}
