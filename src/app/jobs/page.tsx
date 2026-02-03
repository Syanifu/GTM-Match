"use client";

import { useJobs } from "@/lib/hooks/useJobs";
import { JobFilters, JobList, JobDetail } from "@/components/jobs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Briefcase } from "lucide-react";

export default function JobsPage() {
  const {
    filteredJobs,
    selectedJob,
    isLoading,
    filters,
    setFilters,
    setSelectedJob,
    clearFilters,
    availableCompanies,
  } = useJobs();

  return (
    <div className="container py-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">
            GTM Jobs
          </h1>
        </div>
        <p className="text-muted-foreground">
          Find your next role in B2B SaaS sales, marketing, and go-to-market
        </p>
      </div>

      {/* Filters - Desktop */}
      <div className="hidden md:block mb-6">
        <JobFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          availableCompanies={availableCompanies}
          resultCount={filteredJobs.length}
        />
      </div>

      {/* Filters - Mobile */}
      <div className="md:hidden mb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <div className="py-4">
                <JobFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                  availableCompanies={availableCompanies}
                  resultCount={filteredJobs.length}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Job List - Left Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <JobList
            jobs={filteredJobs}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            isLoading={isLoading}
          />
        </div>

        {/* Job Detail - Right Panel (Desktop) */}
        <div className="hidden lg:block lg:col-span-7 xl:col-span-8">
          <div className="sticky top-20 h-[calc(100vh-160px)]">
            <JobDetail job={selectedJob} isLoading={isLoading} />
          </div>
        </div>

        {/* Job Detail - Mobile (Sheet) */}
        {selectedJob && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Job Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedJob(null)}
                >
                  Back to list
                </Button>
              </div>
              <div className="flex-1 overflow-auto">
                <JobDetail job={selectedJob} isLoading={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
