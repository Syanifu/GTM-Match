"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { COMPANY_STAGES, GTM_MOTIONS, INDUSTRIES } from "@/lib/constants";
import type { Category, ProblemStatus } from "@/types/problem";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "Lead Generation", label: "Lead Generation" },
  { value: "Conversion Optimization", label: "Conversion Optimization" },
  { value: "Sales Enablement", label: "Sales Enablement" },
  { value: "Product-Market Fit", label: "Product-Market Fit" },
  { value: "Pricing & Packaging", label: "Pricing & Packaging" },
  { value: "Attribution & Analytics", label: "Attribution & Analytics" },
  { value: "Customer Onboarding", label: "Customer Onboarding" },
  { value: "Content Distribution", label: "Content Distribution" },
];

const STATUSES: { value: ProblemStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "solved", label: "Solved" },
];

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "recent", label: "Most Recent" },
  { value: "most-upvoted", label: "Most Upvoted" },
  { value: "most-viewed", label: "Most Viewed" },
];

interface ProblemFiltersProps {
  selectedCategories: Category[];
  selectedStatus: ProblemStatus | "all";
  selectedIndustries: string[];
  selectedStages: string[];
  selectedMotions: string[];
  sortBy: string;
  onCategoryChange: (categories: Category[]) => void;
  onStatusChange: (status: ProblemStatus | "all") => void;
  onIndustryChange: (industries: string[]) => void;
  onStageChange: (stages: string[]) => void;
  onMotionChange: (motions: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function ProblemFilters({
  selectedCategories,
  selectedStatus,
  selectedIndustries,
  selectedStages,
  selectedMotions,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onIndustryChange,
  onStageChange,
  onMotionChange,
  onSortChange,
  onClearFilters,
}: ProblemFiltersProps) {
  const handleCategoryToggle = (category: Category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      onIndustryChange(selectedIndustries.filter((i) => i !== industry));
    } else {
      onIndustryChange([...selectedIndustries, industry]);
    }
  };

  const handleStageToggle = (stage: string) => {
    if (selectedStages.includes(stage)) {
      onStageChange(selectedStages.filter((s) => s !== stage));
    } else {
      onStageChange([...selectedStages, stage]);
    }
  };

  const handleMotionToggle = (motion: string) => {
    if (selectedMotions.includes(motion)) {
      onMotionChange(selectedMotions.filter((m) => m !== motion));
    } else {
      onMotionChange([...selectedMotions, motion]);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedStatus !== "all" ||
    selectedIndustries.length > 0 ||
    selectedStages.length > 0 ||
    selectedMotions.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          {SORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
              <Label
                htmlFor={`sort-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Status</Label>
        <RadioGroup
          value={selectedStatus}
          onValueChange={(value) => onStatusChange(value as ProblemStatus | "all")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all" className="text-sm font-normal cursor-pointer">
              All
            </Label>
          </div>
          {STATUSES.map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <RadioGroupItem value={status.value} id={`status-${status.value}`} />
              <Label
                htmlFor={`status-${status.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {status.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => handleCategoryToggle(category.value)}
              />
              <Label
                htmlFor={`category-${category.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Industry */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Industry</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {INDUSTRIES.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={`industry-${industry}`}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={() => handleIndustryToggle(industry)}
              />
              <Label
                htmlFor={`industry-${industry}`}
                className="text-sm font-normal cursor-pointer"
              >
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Company Stage */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Company Stage</Label>
        <div className="space-y-2">
          {COMPANY_STAGES.map((stage) => (
            <div key={stage} className="flex items-center space-x-2">
              <Checkbox
                id={`stage-${stage}`}
                checked={selectedStages.includes(stage)}
                onCheckedChange={() => handleStageToggle(stage)}
              />
              <Label
                htmlFor={`stage-${stage}`}
                className="text-sm font-normal cursor-pointer"
              >
                {stage}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* GTM Motion */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">GTM Motion</Label>
        <div className="space-y-2">
          {GTM_MOTIONS.map((motion) => (
            <div key={motion} className="flex items-center space-x-2">
              <Checkbox
                id={`motion-${motion}`}
                checked={selectedMotions.includes(motion)}
                onCheckedChange={() => handleMotionToggle(motion)}
              />
              <Label
                htmlFor={`motion-${motion}`}
                className="text-sm font-normal cursor-pointer"
              >
                {motion}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
