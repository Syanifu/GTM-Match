"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProblemCard } from "@/components/problems/problem-card";
import { ProblemFilters } from "@/components/problems/problem-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { getAllProblems } from "@/lib/mock-data/problems";
import type { Category, ProblemStatus } from "@/types/problem";

export default function ProblemsPage() {
  const allProblems = getAllProblems();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatus | "all">("all");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedMotions, setSelectedMotions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("trending");

  const filteredProblems = useMemo(() => {
    let filtered = allProblems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((problem) =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedCategories.includes(problem.category)
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((problem) => problem.status === selectedStatus);
    }

    // Filter by industry
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedIndustries.includes(problem.context.industry)
      );
    }

    // Filter by company stage
    if (selectedStages.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedStages.includes(problem.context.companyStage)
      );
    }

    // Filter by GTM motion
    if (selectedMotions.length > 0) {
      filtered = filtered.filter((problem) =>
        problem.context.gtmMotion && selectedMotions.includes(problem.context.gtmMotion)
      );
    }

    // Sort
    switch (sortBy) {
      case "recent":
        filtered = [...filtered].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "most-upvoted":
        filtered = [...filtered].sort(
          (a, b) => b.engagement.upvotes - a.engagement.upvotes
        );
        break;
      case "most-viewed":
        filtered = [...filtered].sort(
          (a, b) => b.engagement.views - a.engagement.views
        );
        break;
      case "trending":
      default:
        // Already sorted by trending in mock data
        break;
    }

    return filtered;
  }, [
    allProblems,
    searchQuery,
    selectedCategories,
    selectedStatus,
    selectedIndustries,
    selectedStages,
    selectedMotions,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus("all");
    setSelectedIndustries([]);
    setSelectedStages([]);
    setSelectedMotions([]);
    setSortBy("trending");
    setSearchQuery("");
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Problems</h1>
          <p className="text-muted-foreground mt-2">
            {filteredProblems.length} {filteredProblems.length === 1 ? "problem" : "problems"} found
          </p>
        </div>
        <Button asChild>
          <Link href="/problems/new">
            <Plus className="h-4 w-4 mr-2" />
            Post a Problem
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <ProblemFilters
              selectedCategories={selectedCategories}
              selectedStatus={selectedStatus}
              selectedIndustries={selectedIndustries}
              selectedStages={selectedStages}
              selectedMotions={selectedMotions}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategories}
              onStatusChange={setSelectedStatus}
              onIndustryChange={setSelectedIndustries}
              onStageChange={setSelectedStages}
              onMotionChange={setSelectedMotions}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search and Mobile Filters */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="py-4">
                  <ProblemFilters
                    selectedCategories={selectedCategories}
                    selectedStatus={selectedStatus}
                    selectedIndustries={selectedIndustries}
                    selectedStages={selectedStages}
                    selectedMotions={selectedMotions}
                    sortBy={sortBy}
                    onCategoryChange={setSelectedCategories}
                    onStatusChange={setSelectedStatus}
                    onIndustryChange={setSelectedIndustries}
                    onStageChange={setSelectedStages}
                    onMotionChange={setSelectedMotions}
                    onSortChange={setSortBy}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Problems Grid */}
          {filteredProblems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="No problems found"
              description="Try adjusting your filters or search query to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
