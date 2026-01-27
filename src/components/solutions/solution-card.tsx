import Link from "next/link";
import { CheckCircle2, TrendingUp, Clock, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UpvoteButton } from "@/components/shared/upvote-button";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { StatCard } from "@/components/shared/stat-card";
import { cn } from "@/lib/utils";
import type { Solution } from "@/types/solution";
import { formatDistanceToNow } from "date-fns";

interface SolutionCardProps {
  solution: Solution;
  className?: string;
  showProblemLink?: boolean;
}

const getDifficultyColor = (difficulty: Solution["implementation"]["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "text-green-600 bg-green-50 border-green-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "hard":
      return "text-red-600 bg-red-50 border-red-200";
  }
};

const getDifficultyLabel = (difficulty: Solution["implementation"]["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Advanced";
  }
};

export function SolutionCard({ solution, className, showProblemLink = false }: SolutionCardProps) {
  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {solution.isAccepted && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Accepted Solution
                </Badge>
              )}
              {solution.isVerified && (
                <Badge variant="secondary">
                  Verified Results
                </Badge>
              )}
              <Badge
                variant="outline"
                className={getDifficultyColor(solution.implementation.difficulty)}
              >
                {getDifficultyLabel(solution.implementation.difficulty)}
              </Badge>
            </div>

            <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
              <Link href={`/solutions/${solution.id}`}>
                {solution.title}
              </Link>
            </h3>

            <div className="text-sm text-muted-foreground line-clamp-2">
              {stripHtml(solution.description)}
            </div>
          </div>

          <BookmarkButton />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Implementation Details */}
        <div className="flex flex-wrap gap-2">
          <StatCard
            icon={Clock}
            value={solution.implementation.timeToImplement}
            label="to implement"
          />
          {solution.implementation.budget && (
            <StatCard
              icon={DollarSign}
              value={solution.implementation.budget}
              label="budget"
            />
          )}
          {solution.implementation.teamSizeNeeded && (
            <StatCard
              icon={Users}
              value={solution.implementation.teamSizeNeeded}
              label="team size"
            />
          )}
        </div>

        {/* Tools Used */}
        {solution.implementation.toolsUsed.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {solution.implementation.toolsUsed.slice(0, 5).map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))}
              {solution.implementation.toolsUsed.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{solution.implementation.toolsUsed.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Metrics */}
        {solution.results.metricsBeforeAfter && solution.results.metricsBeforeAfter.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Key Results
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {solution.results.metricsBeforeAfter.slice(0, 4).map((metric, index) => (
                <div
                  key={index}
                  className="text-xs bg-muted/30 rounded-md px-3 py-2"
                >
                  <div className="font-medium">{metric.name}</div>
                  <div className="text-muted-foreground">
                    <span className="line-through">{metric.before}</span>
                    {" → "}
                    <span className="text-green-600 font-semibold">{metric.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-2 pt-2">
          <UserAvatar user={solution.author} size="sm" showName showReputation />
          <span className="text-xs text-muted-foreground">
            • {formatDistanceToNow(solution.createdAt, { addSuffix: true })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-4 w-full">
          <UpvoteButton count={solution.upvotes} />
          <StatCard
            icon={CheckCircle2}
            value={solution.helpfulCount}
            label="found helpful"
          />
          {/* <StatCard
            icon={MessageSquare}
            value={solution.commentsCount}
            label="comments"
          /> */}
        </div>
      </CardFooter>
    </Card>
  );
}
