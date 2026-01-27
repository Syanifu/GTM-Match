import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      className={cn(
        CATEGORY_COLORS[category],
        "text-xs font-medium",
        className
      )}
    >
      {category}
    </Badge>
  );
}
