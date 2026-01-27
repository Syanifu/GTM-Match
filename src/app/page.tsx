import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Eye,
  Users,
  Search,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
  BarChart,
  Database,
  Mail,
  ShoppingCart,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryBadge } from "@/components/shared/category-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UpvoteButton } from "@/components/shared/upvote-button";
import { StatCard } from "@/components/shared/stat-card";
import { getTrendingProblems } from "@/lib/mock-data/problems";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
  const trendingProblems = getTrendingProblems().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Solve Your GTM Problems with{" "}
              <span className="text-primary">Real Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A community marketplace where growth teams share challenges with metrics
              and get battle-tested solutions with proof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/problems/new">
                  Post a Problem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/problems">Browse Problems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real solutions to your GTM challenges in three simple steps
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Post Your Problem</h3>
              <p className="text-sm text-muted-foreground">
                Share your GTM challenge with detailed metrics, context, and current
                approach. Be specific about what you've tried.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Get Battle-Tested Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Experienced GTM professionals submit proven solutions with real metrics
                and implementation details.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Implement & Share Results</h3>
              <p className="text-sm text-muted-foreground">
                Apply the solution, track results, and share your learnings to help
                others facing similar challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-16 bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Browse by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find solutions specific to your GTM challenge area
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/problems?category=lead-generation"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Target className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Lead Generation
                    </h3>
                    <p className="text-xs text-muted-foreground">142 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=conversion-optimization"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Conversion Optimization
                    </h3>
                    <p className="text-xs text-muted-foreground">98 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=sales-enablement"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Sales Enablement
                    </h3>
                    <p className="text-xs text-muted-foreground">76 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=product-market-fit"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Target className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Product-Market Fit
                    </h3>
                    <p className="text-xs text-muted-foreground">54 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=pricing-packaging"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <ShoppingCart className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Pricing & Packaging
                    </h3>
                    <p className="text-xs text-muted-foreground">62 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=attribution-analytics"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/10">
                    <BarChart className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Attribution & Analytics
                    </h3>
                    <p className="text-xs text-muted-foreground">89 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=customer-onboarding"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Users className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Customer Onboarding
                    </h3>
                    <p className="text-xs text-muted-foreground">43 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/problems?category=content-distribution"
            className="group block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <FileText className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Content Distribution
                    </h3>
                    <p className="text-xs text-muted-foreground">71 problems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Growing Community of GTM Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of growth leaders sharing real challenges and proven solutions
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">8,542</div>
              <p className="text-sm text-muted-foreground">Solutions Shared</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">15.2K</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2.4M</div>
              <p className="text-sm text-muted-foreground">Revenue Impact</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container py-16 bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from the GTM Match community
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500" />
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">VP of Growth @ TechCo</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Found a solution that reduced our CAC by 40% while scaling to $200K/month
                in ad spend. The community's insights were invaluable."
              </p>
              <div className="flex gap-4 text-sm">
                <div>
                  <div className="font-semibold text-primary">-40%</div>
                  <div className="text-xs text-muted-foreground">CAC</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">$200K</div>
                  <div className="text-xs text-muted-foreground">Monthly Spend</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500" />
                <div>
                  <p className="font-semibold">Mike Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Head of Sales @ StartupXYZ</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Implemented a lead scoring solution that improved our sales team's efficiency
                by 3x. Close rates went from 8% to 24%."
              </p>
              <div className="flex gap-4 text-sm">
                <div>
                  <div className="font-semibold text-primary">3x</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">24%</div>
                  <div className="text-xs text-muted-foreground">Close Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500" />
                <div>
                  <p className="font-semibold">Emily Park</p>
                  <p className="text-xs text-muted-foreground">Marketing Ops @ ScaleUp</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Discovered a multi-touch attribution setup that finally gave us accurate
                ROI data. Budget allocation is now data-driven."
              </p>
              <div className="flex gap-4 text-sm">
                <div>
                  <div className="font-semibold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">+35%</div>
                  <div className="text-xs text-muted-foreground">ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trending Problems */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Problems</h2>
            <p className="text-muted-foreground mt-2">
              The most popular challenges facing GTM teams right now
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/problems">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingProblems.map((problem) => (
            <Card key={problem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CategoryBadge category={problem.category} />
                </div>
                <Link href={`/problems/${problem.id}`} className="hover:underline">
                  <h3 className="font-semibold leading-tight line-clamp-2">
                    {problem.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <UserAvatar user={problem.author} size="sm" showName />
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(problem.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <UpvoteButton count={problem.engagement.upvotes} />
                  <StatCard icon={MessageSquare} value={problem.engagement.commentsCount} />
                  <StatCard icon={Eye} value={problem.engagement.views} />
                  <StatCard icon={Users} value={problem.engagement.facingThisTooCount} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
