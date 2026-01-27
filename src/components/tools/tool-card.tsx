import Link from "next/link";
import { ExternalLink, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

const getPricingBadgeVariant = (pricing: Tool["pricing"]) => {
  switch (pricing) {
    case "free":
      return "default";
    case "freemium":
      return "secondary";
    case "paid":
      return "outline";
  }
};

const getPricingLabel = (pricing: Tool["pricing"]) => {
  switch (pricing) {
    case "free":
      return "Free";
    case "freemium":
      return "Freemium";
    case "paid":
      return "Paid";
  }
};

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              {tool.logo && (
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                  <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getPricingBadgeVariant(tool.pricing)}>
                    {getPricingLabel(tool.pricing)}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Categories */}
        {tool.category && tool.category.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tool.category.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
              </Badge>
            ))}
            {tool.category.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.category.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Stats */}
        {tool.stats && (
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{tool.stats.usageCount} uses</span>
            </div>
            {tool.stats.winRate && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>{tool.stats.winRate}% win rate</span>
              </div>
            )}
            {tool.stats.avgRating && (
              <div className="flex items-center gap-1 text-yellow-600">
                <Star className="h-4 w-4 fill-current" />
                <span>{tool.stats.avgRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Key Features</p>
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 4).map((feature) => (
                <span key={feature} className="text-xs text-muted-foreground">
                  • {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/tools/${tool.slug}`}>View Details</Link>
          </Button>
          {tool.website && (
            <Button asChild variant="ghost" size="sm">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
