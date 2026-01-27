import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Eye, Users, Clock, Building, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CategoryBadge } from "@/components/shared/category-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UpvoteButton } from "@/components/shared/upvote-button";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SolutionCard } from "@/components/solutions/solution-card";
import { CommentThread } from "@/components/comments/comment-thread";
import { getProblemById } from "@/lib/mock-data/problems";
import { getSolutionsByProblemId } from "@/lib/mock-data/solutions";
import { formatDistanceToNow } from "date-fns";
import type { Problem } from "@/types/problem";

interface ProblemDetailPageProps {
  params: Promise<{ id: string }>;
}

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

export default async function ProblemDetailPage({ params }: ProblemDetailPageProps) {
  const { id } = await params;
  const problem = getProblemById(id);
  const solutions = getSolutionsByProblemId(id);

  if (!problem) {
    notFound();
  }

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/problems">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Problems
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge category={problem.category} />
                <Badge variant={getStatusBadgeVariant(problem.status)}>
                  {getStatusLabel(problem.status)}
                </Badge>
                {problem.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <BookmarkButton />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4">{problem.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <UserAvatar user={problem.author} size="md" showName showReputation />
              <span className="text-sm text-muted-foreground">
                Posted {formatDistanceToNow(problem.createdAt, { addSuffix: true })}
              </span>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6">
              <UpvoteButton count={problem.engagement.upvotes} />
              <StatCard icon={MessageSquare} value={problem.engagement.commentsCount} label="comments" />
              <StatCard icon={Eye} value={problem.engagement.views} label="views" />
              <StatCard icon={Users} value={problem.engagement.facingThisTooCount} label="facing this" />
            </div>
          </div>

          <Separator />

          {/* Problem Description */}
          <Card>
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: problem.description }}
              />
            </CardContent>
          </Card>

          {/* Metrics */}
          {problem.metrics && (
            <Card>
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Current</h4>
                    <div className="space-y-2">
                      {problem.metrics.current.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{metric.name}</span>
                          <span className="font-semibold">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Target</h4>
                    <div className="space-y-2">
                      {problem.metrics.target.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{metric.name}</span>
                          <span className="font-semibold text-primary">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Solutions Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Solutions ({solutions.length})
                </CardTitle>
                <Button asChild>
                  <Link href={`/solutions/${problem.id}/new`}>Submit Solution</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {solutions.length === 0 ? (
                <EmptyState
                  icon={MessageSquare}
                  title="No solutions yet"
                  description="Be the first to submit a solution to this problem"
                />
              ) : (
                <div className="space-y-6">
                  {solutions.map((solution) => (
                    <SolutionCard key={solution.id} solution={solution} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Discussion ({problem.engagement.commentsCount})</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentThread
                targetType="problem"
                targetId={problem.id}
                comments={[]}
                totalCount={problem.engagement.commentsCount}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {problem.context.industry && (
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="text-sm font-medium">{problem.context.industry}</p>
                  </div>
                </div>
              )}
              {problem.context.companyStage && (
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Company Stage</p>
                    <p className="text-sm font-medium">{problem.context.companyStage}</p>
                  </div>
                </div>
              )}
              {problem.context.companySize && (
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Company Size</p>
                    <p className="text-sm font-medium">{problem.context.companySize} employees</p>
                  </div>
                </div>
              )}
              {problem.context.gtmMotion && (
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">GTM Motion</p>
                    <p className="text-sm font-medium">{problem.context.gtmMotion}</p>
                  </div>
                </div>
              )}
              {problem.context.targetMarket && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Market</p>
                  <p className="text-sm">{problem.context.targetMarket}</p>
                </div>
              )}
              {problem.context.icp && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ICP</p>
                  <p className="text-sm">{problem.context.icp}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Tools */}
          {problem.context.currentTools && problem.context.currentTools.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.context.currentTools.map((tool) => (
                    <Badge key={tool} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Constraints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {problem.constraints.budget && (
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">{problem.constraints.budget}</p>
                  </div>
                )}
                {problem.constraints.timeline && (
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{problem.constraints.timeline}</p>
                  </div>
                )}
                {problem.constraints.helpNeededBy && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Help Needed By</p>
                      <p className="text-sm font-medium">
                        {problem.constraints.helpNeededBy.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
