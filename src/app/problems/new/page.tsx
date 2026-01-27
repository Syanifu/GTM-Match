"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { completeProblemSchema, type CompleteProblemData } from "@/lib/schemas/problem.schema";
import { COMPANY_STAGES, GTM_MOTIONS, INDUSTRIES } from "@/lib/constants";
import { toast } from "sonner";

const CATEGORIES = [
  "Lead Generation",
  "Conversion Optimization",
  "Sales Enablement",
  "Product-Market Fit",
  "Pricing & Packaging",
  "Attribution & Analytics",
  "Customer Onboarding",
  "Content Distribution",
] as const;

export default function NewProblemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [currentTools, setCurrentTools] = useState<string[]>([]);
  const [toolInput, setToolInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompleteProblemData>({
    resolver: zodResolver(completeProblemSchema),
    defaultValues: {
      tags: [],
      currentTools: [],
      currentMetrics: [{ name: "", value: "" }],
      targetMetrics: [{ name: "", value: "" }],
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const handleAddTool = () => {
    if (toolInput.trim()) {
      const newTools = [...currentTools, toolInput.trim()];
      setCurrentTools(newTools);
      setValue("currentTools", newTools);
      setToolInput("");
    }
  };

  const handleRemoveTool = (index: number) => {
    const newTools = currentTools.filter((_, i) => i !== index);
    setCurrentTools(newTools);
    setValue("currentTools", newTools);
  };

  const onSubmit = async (data: CompleteProblemData) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Problem posted successfully!");
      router.push("/problems");
    } catch (error) {
      toast.error("Failed to post problem. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/problems">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Post a Problem</h1>
        <p className="text-muted-foreground">
          Share your GTM challenge with the community and get battle-tested solutions
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Help others understand your challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                onValueChange={(value) => setValue("category", value as any)}
                disabled={isSubmitting}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                placeholder="e.g., How to reduce CAC while scaling paid ads?"
                {...register("title")}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags * (max 5)</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  disabled={isSubmitting || tags.length >= 5}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={isSubmitting || tags.length >= 5}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {errors.tags && (
                <p className="text-sm text-destructive">{errors.tags.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                rows={8}
                placeholder="Describe your problem in detail. Include what you've tried and what results you've seen."
                {...register("description")}
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Company Context */}
        <Card>
          <CardHeader>
            <CardTitle>Company Context</CardTitle>
            <CardDescription>Help us understand your situation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  onValueChange={(value) => setValue("industry", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-destructive">{errors.industry.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyStage">Company Stage *</Label>
                <Select
                  onValueChange={(value) => setValue("companyStage", value as any)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="companyStage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.companyStage && (
                  <p className="text-sm text-destructive">{errors.companyStage.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size *</Label>
                <Input
                  id="companySize"
                  placeholder="e.g., 50-100"
                  {...register("companySize")}
                  disabled={isSubmitting}
                />
                {errors.companySize && (
                  <p className="text-sm text-destructive">{errors.companySize.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input
                  id="teamSize"
                  type="number"
                  placeholder="e.g., 8"
                  {...register("teamSize")}
                  disabled={isSubmitting}
                />
                {errors.teamSize && (
                  <p className="text-sm text-destructive">{errors.teamSize.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gtmMotion">GTM Motion *</Label>
              <Select
                onValueChange={(value) => setValue("gtmMotion", value as any)}
                disabled={isSubmitting}
              >
                <SelectTrigger id="gtmMotion">
                  <SelectValue placeholder="Select GTM motion" />
                </SelectTrigger>
                <SelectContent>
                  {GTM_MOTIONS.map((motion) => (
                    <SelectItem key={motion} value={motion}>
                      {motion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gtmMotion && (
                <p className="text-sm text-destructive">{errors.gtmMotion.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentTools">Current Tools *</Label>
              <div className="flex gap-2">
                <Input
                  id="currentTools"
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
              {currentTools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentTools.map((tool, index) => (
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
              {errors.currentTools && (
                <p className="text-sm text-destructive">{errors.currentTools.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild disabled={isSubmitting}>
            <Link href="/problems">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Problem"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
