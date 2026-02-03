"use client";

import { formatDistanceToNow, format } from "date-fns";
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Zap,
  Star,
  CheckCircle2,
  Bookmark,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job } from "@/types";

interface JobDetailProps {
  job: Job | null;
  isLoading: boolean;
}

function formatSalary(job: Job): string | null {
  if (!job.salary) return null;
  const { min, max, currency, period } = job.salary;
  const formatNum = (n: number) => n.toLocaleString();
  const suffix = period === "hourly" ? " per hour" : " per year";
  return `${currency === "USD" ? "$" : currency}${formatNum(min)} - ${currency === "USD" ? "$" : ""}${formatNum(max)}${suffix}`;
}

function JobDetailSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-5 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function JobDetail({ job, isLoading }: JobDetailProps) {
  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (!job) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-semibold text-lg">Select a job</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Choose a job from the list to view details
          </p>
        </div>
      </Card>
    );
  }

  const salary = formatSalary(job);
  const timeAgo = formatDistanceToNow(job.postedAt, { addSuffix: true });
  const postedDate = format(job.postedAt, "MMMM d, yyyy");

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
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
                    Urgent Hiring
                  </Badge>
                )}
              </div>
              <h1 className="text-xl font-bold leading-tight">{job.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {job.location}
                {job.workLocation !== "On-site" && ` (${job.workLocation})`}
              </span>
            </div>
            {salary && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>{salary}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{job.experienceLevel} Level</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{timeAgo}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Apply Button */}
          {job.applicationUrl && (
            <Button asChild className="w-full sm:w-auto">
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <ScrollArea className="flex-1">
        <CardContent className="py-6 space-y-6">
          {/* Description */}
          <section>
            <h2 className="font-semibold text-lg mb-3">About this role</h2>
            <p className="text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-3">Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-3">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-3">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Footer Info */}
          <Separator />
          <div className="text-sm text-muted-foreground">
            <p>Posted on {postedDate}</p>
            {job.expiresAt && (
              <p>
                Application deadline: {format(job.expiresAt, "MMMM d, yyyy")}
              </p>
            )}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
