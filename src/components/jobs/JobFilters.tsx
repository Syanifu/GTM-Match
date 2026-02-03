"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobFiltersState } from "@/lib/hooks/useJobs";
import type { JobType, WorkLocation, ExperienceLevel } from "@/types";

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

const WORK_LOCATIONS: { value: WorkLocation; label: string }[] = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "Entry", label: "Entry Level" },
  { value: "Mid", label: "Mid Level" },
  { value: "Senior", label: "Senior" },
  { value: "Lead", label: "Lead" },
  { value: "Executive", label: "Executive" },
];

const SALARY_RANGES = [
  { value: "0", label: "Any" },
  { value: "50000", label: "$50k+" },
  { value: "75000", label: "$75k+" },
  { value: "100000", label: "$100k+" },
  { value: "150000", label: "$150k+" },
  { value: "200000", label: "$200k+" },
];

interface JobFiltersProps {
  filters: JobFiltersState;
  onFiltersChange: (filters: JobFiltersState) => void;
  onClearFilters: () => void;
  availableCompanies: string[];
  resultCount: number;
}

export function JobFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  availableCompanies,
  resultCount,
}: JobFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    filters.jobTypes.length > 0 ||
    filters.workLocations.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.salaryMin !== undefined ||
    filters.companies.length > 0;

  const updateFilter = <K extends keyof JobFiltersState>(
    key: K,
    value: JobFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, or keywords..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-9 pr-9"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-2">
        {/* Job Type */}
        <Select
          value={filters.jobTypes[0] || "all"}
          onValueChange={(value) =>
            updateFilter("jobTypes", value === "all" ? [] : [value as JobType])
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {JOB_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Work Location */}
        <Select
          value={filters.workLocations[0] || "all"}
          onValueChange={(value) =>
            updateFilter(
              "workLocations",
              value === "all" ? [] : [value as WorkLocation]
            )
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {WORK_LOCATIONS.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Experience Level */}
        <Select
          value={filters.experienceLevels[0] || "all"}
          onValueChange={(value) =>
            updateFilter(
              "experienceLevels",
              value === "all" ? [] : [value as ExperienceLevel]
            )
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {EXPERIENCE_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Salary */}
        <Select
          value={filters.salaryMin?.toString() || "0"}
          onValueChange={(value) =>
            updateFilter(
              "salaryMin",
              value === "0" ? undefined : parseInt(value)
            )
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Salary" />
          </SelectTrigger>
          <SelectContent>
            {SALARY_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Company */}
        <Select
          value={filters.companies[0] || "all"}
          onValueChange={(value) =>
            updateFilter("companies", value === "all" ? [] : [value])
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {availableCompanies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? "job" : "jobs"} found
      </div>
    </div>
  );
}
