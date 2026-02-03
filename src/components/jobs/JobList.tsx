"use client";

import { formatDistanceToNow } from "date-fns";
import { MapPin, Building2, Clock, Zap, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job } from "@/types";
import { cn } from "@/lib/utils";

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
  isLoading: boolean;
}

function formatSalary(job: Job): string | null {
  if (!job.salary) return null;
  const { min, max, currency, period } = job.salary;
  const formatNum = (n: number) => {
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return n.toString();
  };
  const suffix = period === "hourly" ? "/hr" : "/yr";
  return `${currency === "USD" ? "$" : currency}${formatNum(min)} - ${formatNum(max)}${suffix}`;
}

function JobCard({
  job,
  isSelected,
  onClick,
}: {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}) {
  const salary = formatSalary(job);
  const timeAgo = formatDistanceToNow(job.postedAt, { addSuffix: true });

  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "hover:border-muted-foreground/30"
      )}
    >
      <div className="space-y-3">
        {/* Header with badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {job.isFeatured && (
              <Badge variant="default" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {job.isUrgent && (
              <Badge variant="destructive" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base leading-tight line-clamp-2">
          {job.title}
        </h3>

        {/* Company and Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{job.company}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">
              {job.location}
              {job.workLocation !== "On-site" && ` (${job.workLocation})`}
            </span>
          </div>
        </div>

        {/* Salary and Type */}
        <div className="flex items-center gap-2 flex-wrap">
          {salary && (
            <Badge variant="secondary" className="text-xs font-medium">
              {salary}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {job.jobType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {job.experienceLevel}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{job.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

function JobCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </Card>
  );
}

export function JobList({
  jobs,
  selectedJob,
  onSelectJob,
  isLoading,
}: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold text-lg">No jobs found</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Try adjusting your filters to find more opportunities
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="space-y-3 pr-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={selectedJob?.id === job.id}
            onClick={() => onSelectJob(job)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
