"use client";

import { useState } from "react";
import {
  Trophy,
  Target,
  Plus,
  ChevronRight,
  Award,
  CheckCircle,
  ArrowLeft,
  Send,
  BookOpen,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth-store";
import {
  testCategories,
  testQuestions,
  getQuestionsByCategory,
  mockUserProgress,
  TestCategory
} from "@/lib/mock-data/tests";
import { toast } from "sonner";

export default function TestPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const isAdmin = user?.role === "admin";

  // Get questions for selected category
  const categoryQuestions = selectedCategory
    ? getQuestionsByCategory(selectedCategory.id)
    : [];

  const currentQuestion = categoryQuestions[currentQuestionIndex];

  // Calculate user stats
  const totalBadges = mockUserProgress.filter(p => p.badgeEarned).length;
  const totalCompleted = mockUserProgress.filter(p => p.completed).length;
  const totalPoints = mockUserProgress.reduce((sum, p) => sum + (p.completed ? p.score : 0), 0);

  // Get progress for a category
  const getCategoryProgress = (categoryId: string) => {
    return mockUserProgress.find(p => p.categoryId === categoryId);
  };

  // Handle solution change
  const handleSolutionChange = (questionId: string, value: string) => {
    setSolutions(prev => ({ ...prev, [questionId]: value }));
  };

  // Submit solution for current question
  const handleSubmitSolution = async () => {
    if (!currentQuestion || !solutions[currentQuestion.id]?.trim()) {
      toast.error("Please enter your solution");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCompletedQuestions(prev => new Set([...prev, currentQuestion.id]));
    toast.success("Solution submitted! Moving to next question...");

    setIsSubmitting(false);

    // Move to next question or show completion
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      toast.success(`Test completed! You've answered all ${categoryQuestions.length} questions.`, {
        description: `Your solutions will be reviewed. Badge: ${selectedCategory?.badge.icon} ${selectedCategory?.badge.name}`
      });
    }
  };

  // Reset and go back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setSolutions({});
    setCompletedQuestions(new Set());
  };

  // Start test for a category
  const handleStartTest = (category: TestCategory) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to take tests");
      return;
    }
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      {!selectedCategory && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">GTM Skills Assessment</h1>
              <p className="text-muted-foreground mt-1">
                Test your B2B SaaS go-to-market knowledge and earn badges
              </p>
            </div>
            {isAdmin && (
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Question</DialogTitle>
                    <DialogDescription>
                      Add a new question to a test category
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {testCategories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        placeholder="Enter the question..."
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      toast.success("Question added successfully!");
                      setShowAddDialog(false);
                    }}>
                      Add Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Stats Cards */}
          {isAuthenticated && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalCompleted}</p>
                      <p className="text-sm text-muted-foreground">Tests Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{testQuestions.length}</p>
                      <p className="text-sm text-muted-foreground">Total Questions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalBadges}</p>
                      <p className="text-sm text-muted-foreground">Badges Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Trophy className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalPoints}</p>
                      <p className="text-sm text-muted-foreground">Total Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Category Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testCategories.map((category) => {
              const progress = getCategoryProgress(category.id);
              const progressPercent = progress
                ? (progress.questionsAnswered / progress.totalQuestions) * 100
                : 0;

              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleStartTest(category)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl mb-2">{category.icon}</div>
                      {progress?.badgeEarned && (
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {category.questionCount} questions
                        </span>
                        <Badge variant="outline">
                          {category.badge.icon} {category.badge.name}
                        </Badge>
                      </div>

                      {progress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{progress.questionsAnswered}/{progress.totalQuestions}</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>
                      )}

                      <Button
                        className="w-full mt-2"
                        variant={progress?.completed ? "outline" : "default"}
                      >
                        {progress?.completed ? "Retake Test" : progress ? "Continue" : "Start Test"}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Test Taking View */}
      {selectedCategory && currentQuestion && (
        <div className="max-w-3xl mx-auto">
          {/* Test Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleBackToCategories}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {selectedCategory.icon} {selectedCategory.name}
            </Badge>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {categoryQuestions.length}</span>
              <span>{completedQuestions.size} answered</span>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / categoryQuestions.length) * 100}
              className="h-2"
            />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Target className="h-4 w-4" />
                Question {currentQuestionIndex + 1}
              </div>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="solution" className="text-base font-medium">
                    Your Solution
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Provide a detailed answer explaining your reasoning and approach.
                  </p>
                  <Textarea
                    id="solution"
                    placeholder="Write your solution here... Be thorough and explain your reasoning."
                    className="min-h-[200px]"
                    value={solutions[currentQuestion.id] || ""}
                    onChange={(e) => handleSolutionChange(currentQuestion.id, e.target.value)}
                  />
                </div>

                {/* Tips */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Tips for a great answer:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Start with your recommendation or key insight</li>
                    <li>• Support with data, metrics, or frameworks</li>
                    <li>• Consider trade-offs and alternatives</li>
                    <li>• Be specific about implementation steps</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {currentQuestionIndex < categoryQuestions.length - 1 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  >
                    Skip
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={handleSubmitSolution}
                    disabled={isSubmitting || !solutions[currentQuestion.id]?.trim()}
                  >
                    {isSubmitting ? "Submitting..." : "Submit & Next"}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleSubmitSolution}
                  disabled={isSubmitting || !solutions[currentQuestion.id]?.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Submitting..." : "Complete Test"}
                  <Trophy className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium mb-3">Question Navigator</p>
            <div className="flex flex-wrap gap-2">
              {categoryQuestions.map((q, idx) => (
                <Button
                  key={q.id}
                  variant={idx === currentQuestionIndex ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 p-0 ${
                    completedQuestions.has(q.id)
                      ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
                      : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(idx)}
                >
                  {completedQuestions.has(q.id) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    idx + 1
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Badge Preview */}
          <div className="mt-6 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedCategory.badge.icon}</div>
              <div>
                <p className="font-medium">Complete this test to earn:</p>
                <p className="text-lg font-bold text-primary">
                  {selectedCategory.badge.name} Badge
                </p>
                <p className="text-sm text-muted-foreground">
                  Score {selectedCategory.passingScore}% or higher to qualify
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not authenticated message */}
      {!isAuthenticated && !selectedCategory && (
        <div className="mt-8 p-6 bg-muted rounded-lg text-center">
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Sign in to take tests</h3>
          <p className="text-muted-foreground mb-4">
            Create an account to track your progress and earn badges
          </p>
          <Button asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </div>
      )}
    </div>
  );
}
// Trigger deploy
