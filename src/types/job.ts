export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type WorkLocation = "Remote" | "Hybrid" | "On-site";
export type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead" | "Executive";

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
  period: "hourly" | "yearly";
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workLocation: WorkLocation;
  salary?: JobSalary;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  postedAt: Date;
  expiresAt?: Date;
  applicationUrl?: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
}

export interface JobFilters {
  search: string;
  jobTypes: JobType[];
  workLocations: WorkLocation[];
  experienceLevels: ExperienceLevel[];
  salaryMin?: number;
  salaryMax?: number;
  companies: string[];
}
