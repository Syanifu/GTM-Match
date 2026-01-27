import { z } from "zod";

// Metric comparison schema
export const metricComparisonSchema = z.object({
  name: z.string().min(1, "Metric name is required"),
  before: z.string().min(1, "Before value is required"),
  after: z.string().min(1, "After value is required"),
});

// Solution form schema
export const solutionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(20, "Title must be at least 20 characters")
    .max(150, "Title must be less than 150 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(100, "Please provide at least 100 characters of detail")
    .max(10000, "Description is too long (max 10000 characters)"),
  approach: z
    .string()
    .min(1, "Approach is required")
    .min(50, "Please describe your approach in at least 50 characters")
    .max(5000, "Approach description is too long"),
  toolsUsed: z
    .array(z.string())
    .min(1, "Add at least one tool you used"),
  timeToImplement: z
    .string()
    .min(1, "Time to implement is required"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Please select difficulty level",
  }),
  budget: z.string().optional(),
  teamSizeNeeded: z.coerce
    .number()
    .min(1, "Team size must be at least 1")
    .max(1000, "Team size seems too large")
    .optional(),
  metricsBeforeAfter: z
    .array(metricComparisonSchema)
    .min(1, "Add at least one metric comparison")
    .max(10, "Maximum 10 metrics allowed")
    .optional(),
  resultsDescription: z
    .string()
    .min(50, "Please describe the results in at least 50 characters")
    .max(5000, "Results description is too long"),
});

export type SolutionFormData = z.infer<typeof solutionSchema>;
