"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { solutionSchema, type SolutionFormData } from "@/lib/schemas/solution.schema";
import { toast } from "sonner";
import { getProblemById } from "@/lib/mock-data/problems";

interface SubmitSolutionPageProps {
  params: Promise<{ problemId: string }>;
}

export default function SubmitSolutionPage({ params }: SubmitSolutionPageProps) {
  const { problemId } = use(params);
  const router = useRouter();
  const problem = getProblemById(problemId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tools, setTools] = useState<string[]>([]);
  const [toolInput, setToolInput] = useState("");
  const [metrics, setMetrics] = useState<Array<{ name: string; before: string; after: string }>>([
    { name: "", before: "", after: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<SolutionFormData>({
    resolver: zodResolver(solutionSchema),
    defaultValues: {
      title: "",
      description: "",
      approach: "",
      toolsUsed: [],
      timeToImplement: "",
      difficulty: "medium",
      budget: "",
      resultsDescription: "",
    },
  });

  if (!problem) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Problem not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddTool = () => {
    if (toolInput.trim()) {
      const newTools = [...tools, toolInput.trim()];
      setTools(newTools);
      setValue("toolsUsed", newTools);
      setToolInput("");
    }
  };

  const handleRemoveTool = (index: number) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
    setValue("toolsUsed", newTools);
  };

  const handleAddMetric = () => {
    setMetrics([...metrics, { name: "", before: "", after: "" }]);
  };

  const handleRemoveMetric = (index: number) => {
    const newMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(newMetrics);
    setValue("metricsBeforeAfter", newMetrics.filter(m => m.name && m.before && m.after));
  };

  const handleMetricChange = (index: number, field: "name" | "before" | "after", value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
    setValue("metricsBeforeAfter", newMetrics.filter(m => m.name && m.before && m.after));
  };

  const onSubmit = async (data: SolutionFormData) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Solution submitted successfully!");
      router.push(`/problems/${problemId}`);
    } catch (error) {
      toast.error("Failed to submit solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/problems/${problemId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Problem
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Submit a Solution</h1>
        <p className="text-muted-foreground mb-4">
          Share your solution to help others solve this problem
        </p>
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-1">Problem</p>
            <p className="text-sm text-muted-foreground">{problem.title}</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Solution Overview</CardTitle>
            <CardDescription>Describe your solution and its impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Solution Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Multi-channel attribution model to reduce CAC by 25%"
                {...register("title")}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Describe your solution, key insights, and who it's best for..."
                    editable={!isSubmitting}
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Approach */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Approach</CardTitle>
            <CardDescription>Explain step-by-step how you implemented this solution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="approach">Approach *</Label>
              <Controller
                name="approach"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Step 1: ... Step 2: ... Include specific tactics and strategies you used."
                    editable={!isSubmitting}
                  />
                )}
              />
              {errors.approach && (
                <p className="text-sm text-destructive">{errors.approach.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
            <CardDescription>Help others understand the resources needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toolsUsed">Tools Used *</Label>
              <div className="flex gap-2">
                <Input
                  id="toolsUsed"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTool();
                    }
                  }}
                  placeholder="Add a tool and press Enter"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTool}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {tool}
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {errors.toolsUsed && (
                <p className="text-sm text-destructive">{errors.toolsUsed.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeToImplement">Time to Implement *</Label>
                <Input
                  id="timeToImplement"
                  placeholder="e.g., 4 weeks"
                  {...register("timeToImplement")}
                  disabled={isSubmitting}
                />
                {errors.timeToImplement && (
                  <p className="text-sm text-destructive">{errors.timeToImplement.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select
                  onValueChange={(value) => setValue("difficulty", value as any)}
                  disabled={isSubmitting}
                  defaultValue="medium"
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && (
                  <p className="text-sm text-destructive">{errors.difficulty.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (optional)</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $15K setup + $5K/month"
                  {...register("budget")}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSizeNeeded">Team Size (optional)</Label>
                <Input
                  id="teamSizeNeeded"
                  type="number"
                  placeholder="e.g., 3"
                  {...register("teamSizeNeeded")}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results & Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Show the impact of your solution with data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Before/After Metrics (optional)</Label>
              <div className="space-y-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      placeholder="Metric name (e.g., CAC)"
                      value={metric.name}
                      onChange={(e) => handleMetricChange(index, "name", e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Input
                      placeholder="Before (e.g., $450)"
                      value={metric.before}
                      onChange={(e) => handleMetricChange(index, "before", e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Input
                      placeholder="After (e.g., $340)"
                      value={metric.after}
                      onChange={(e) => handleMetricChange(index, "after", e.target.value)}
                      disabled={isSubmitting}
                    />
                    {metrics.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMetric(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMetric}
                disabled={isSubmitting}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultsDescription">Results Description *</Label>
              <Controller
                name="resultsDescription"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Describe the outcomes, ROI, and any unexpected benefits..."
                    editable={!isSubmitting}
                  />
                )}
              />
              {errors.resultsDescription && (
                <p className="text-sm text-destructive">{errors.resultsDescription.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild disabled={isSubmitting}>
            <Link href={`/problems/${problemId}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Solution"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
