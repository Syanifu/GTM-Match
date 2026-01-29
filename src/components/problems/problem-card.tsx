import Link from "next/link";
import { MessageSquare, Eye, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UpvoteButton } from "@/components/shared/upvote-button";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { StatCard } from "@/components/shared/stat-card";
import type { Problem } from "@/types/problem";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: Problem;
  className?: string;
}

export function ProblemCard({ problem, className }: ProblemCardProps) {
  const getStatusBadgeVariant = (status: Problem["status"]) => {
    switch (status) {
      case "open":
        return "default";
      case "in_progress":
        return "secondary";
      case "solved":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: Problem["status"]) => {
    switch (status) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "solved":
        return "Solved";
      default:
        return status;
    }
  };

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <CategoryBadge category={problem.category} />
            <Badge variant={getStatusBadgeVariant(problem.status)}>
              {getStatusLabel(problem.status)}
            </Badge>
          </div>
          <BookmarkButton />
        </div>
        <Link href={`/problems/${problem.id}`} className="hover:underline">
          <h3 className="font-semibold leading-tight line-clamp-2 mb-2">
            {problem.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.description.replace(/<[^>]*>/g, "")}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Context Pills */}
        <div className="flex flex-wrap gap-2">
          {problem.context.industry && (
            <Badge variant="outline" className="text-xs">
              {problem.context.industry}
            </Badge>
          )}
          {problem.context.companySize && (
            <Badge variant="outline" className="text-xs">
              {problem.context.companySize}
            </Badge>
          )}
          {problem.context.currentTools?.slice(0, 2).map((tool) => (
            <Badge key={tool} variant="outline" className="text-xs">
              {tool}
            </Badge>
          ))}
        </div>

        {/* Author and Time */}
        <div className="flex items-center justify-between">
          <UserAvatar user={problem.author} size="sm" showName />
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(problem.createdAt, { addSuffix: true })}
          </span>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <UpvoteButton count={problem.engagement.upvotes} />
          <StatCard icon={MessageSquare} value={problem.engagement.commentsCount} />
          <StatCard icon={Eye} value={problem.engagement.views} />
          <StatCard icon={Users} value={problem.engagement.facingThisTooCount} />
        </div>
      </CardContent>
    </Card>
  );
}
