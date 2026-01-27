import { z } from "zod";

// Step 1: Category & Title
export const problemStep1Schema = z.object({
  category: z.enum([
    "Lead Generation",
    "Conversion Optimization",
    "Sales Enablement",
    "Product-Market Fit",
    "Pricing & Packaging",
    "Attribution & Analytics",
    "Customer Onboarding",
    "Content Distribution",
  ], {
    required_error: "Please select a category",
  }),
  title: z
    .string()
    .min(1, "Title is required")
    .min(20, "Title must be at least 20 characters")
    .max(150, "Title must be less than 150 characters"),
  tags: z
    .array(z.string())
    .min(1, "Add at least one tag")
    .max(5, "Maximum 5 tags allowed"),
});

export type ProblemStep1Data = z.infer<typeof problemStep1Schema>;

// Step 2: Description
export const problemStep2Schema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .min(100, "Please provide at least 100 characters of detail")
    .max(5000, "Description is too long (max 5000 characters)"),
});

export type ProblemStep2Data = z.infer<typeof problemStep2Schema>;

// Step 3: Metrics
export const metricValueSchema = z.object({
  name: z.string().min(1, "Metric name is required"),
  value: z.string().min(1, "Metric value is required"),
});

export const problemStep3Schema = z.object({
  currentMetrics: z
    .array(metricValueSchema)
    .min(1, "Add at least one current metric")
    .max(10, "Maximum 10 metrics allowed"),
  targetMetrics: z
    .array(metricValueSchema)
    .min(1, "Add at least one target metric")
    .max(10, "Maximum 10 metrics allowed"),
});

export type ProblemStep3Data = z.infer<typeof problemStep3Schema>;

// Step 4: Context
export const problemStep4Schema = z.object({
  industry: z.string().min(1, "Industry is required"),
  companyStage: z.enum([
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Public",
  ], {
    required_error: "Please select company stage",
  }),
  companySize: z.string().min(1, "Company size is required"),
  teamSize: z.coerce
    .number()
    .min(1, "Team size must be at least 1")
    .max(10000, "Team size seems too large"),
  gtmMotion: z.enum(["PLG", "Sales-led", "Hybrid"], {
    required_error: "Please select GTM motion",
  }),
  targetMarket: z.string().optional(),
  icp: z.string().optional(),
});

export type ProblemStep4Data = z.infer<typeof problemStep4Schema>;

// Step 5: Tools & Constraints
export const problemStep5Schema = z.object({
  currentTools: z
    .array(z.string())
    .min(1, "Add at least one tool you're currently using"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  helpNeededBy: z.date().optional(),
});

export type ProblemStep5Data = z.infer<typeof problemStep5Schema>;

// Complete problem schema (all steps combined)
export const completeProblemSchema = z.object({
  ...problemStep1Schema.shape,
  ...problemStep2Schema.shape,
  ...problemStep3Schema.shape,
  ...problemStep4Schema.shape,
  ...problemStep5Schema.shape,
});

export type CompleteProblemData = z.infer<typeof completeProblemSchema>;
