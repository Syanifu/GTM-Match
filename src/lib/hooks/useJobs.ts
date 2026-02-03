"use client";

import { useState, useEffect, useMemo } from "react";
import type { Job, JobType, WorkLocation, ExperienceLevel } from "@/types";
import { getAllJobs, getUniqueCompanies } from "@/lib/mock-data/jobs";

// N8N API configuration - update this URL when ready to connect
const N8N_JOBS_API_URL = process.env.NEXT_PUBLIC_N8N_JOBS_API_URL || "";

export interface JobFiltersState {
  search: string;
  jobTypes: JobType[];
  workLocations: WorkLocation[];
  experienceLevels: ExperienceLevel[];
  salaryMin?: number;
  companies: string[];
  sortBy: "recent" | "salary-high" | "salary-low" | "relevance";
}

export const defaultFilters: JobFiltersState = {
  search: "",
  jobTypes: [],
  workLocations: [],
  experienceLevels: [],
  salaryMin: undefined,
  companies: [],
  sortBy: "recent",
};

interface UseJobsResult {
  jobs: Job[];
  filteredJobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  filters: JobFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<JobFiltersState>>;
  setSelectedJob: (job: Job | null) => void;
  clearFilters: () => void;
  availableCompanies: string[];
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFiltersState>(defaultFilters);

  // Fetch jobs from N8N API or use mock data
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      setError(null);

      try {
        if (N8N_JOBS_API_URL) {
          // Fetch from N8N webhook/API
          const response = await fetch(N8N_JOBS_API_URL);
          if (!response.ok) {
            throw new Error("Failed to fetch jobs from API");
          }
          const data = await response.json();
          // Transform API data to match Job type if needed
          const transformedJobs = data.map((item: Record<string, unknown>) => ({
            ...item,
            postedAt: new Date(item.postedAt as string),
            expiresAt: item.expiresAt
              ? new Date(item.expiresAt as string)
              : undefined,
          }));
          setJobs(transformedJobs);
        } else {
          // Use mock data
          const mockJobs = getAllJobs();
          setJobs(mockJobs);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Fallback to mock data on error
        setJobs(getAllJobs());
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // Select first job by default when jobs are loaded
  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Job type filter
    if (filters.jobTypes.length > 0) {
      result = result.filter((job) => filters.jobTypes.includes(job.jobType));
    }

    // Work location filter
    if (filters.workLocations.length > 0) {
      result = result.filter((job) =>
        filters.workLocations.includes(job.workLocation)
      );
    }

    // Experience level filter
    if (filters.experienceLevels.length > 0) {
      result = result.filter((job) =>
        filters.experienceLevels.includes(job.experienceLevel)
      );
    }

    // Minimum salary filter
    if (filters.salaryMin !== undefined) {
      result = result.filter(
        (job) => job.salary && job.salary.min >= filters.salaryMin!
      );
    }

    // Company filter
    if (filters.companies.length > 0) {
      result = result.filter((job) => filters.companies.includes(job.company));
    }

    // Sort
    switch (filters.sortBy) {
      case "recent":
        result.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
        break;
      case "salary-high":
        result.sort((a, b) => {
          const salaryA = a.salary?.max || 0;
          const salaryB = b.salary?.max || 0;
          return salaryB - salaryA;
        });
        break;
      case "salary-low":
        result.sort((a, b) => {
          const salaryA = a.salary?.min || 0;
          const salaryB = b.salary?.min || 0;
          return salaryA - salaryB;
        });
        break;
      case "relevance":
      default:
        // Featured jobs first, then urgent, then by date
        result.sort((a, b) => {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
          return b.postedAt.getTime() - a.postedAt.getTime();
        });
        break;
    }

    return result;
  }, [jobs, filters]);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const availableCompanies = useMemo(() => getUniqueCompanies(), []);

  return {
    jobs,
    filteredJobs,
    selectedJob,
    isLoading,
    error,
    filters,
    setFilters,
    setSelectedJob,
    clearFilters,
    availableCompanies,
  };
}
