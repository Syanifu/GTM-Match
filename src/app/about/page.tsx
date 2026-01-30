import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Real B2B SaaS Problems",
      description: "Share actual challenges you're facing—pipeline generation, PLG conversion, enterprise sales, expansion revenue, and more.",
    },
    {
      icon: Lightbulb,
      title: "Battle-Tested Playbooks",
      description: "Get proven solutions from SaaS operators who've scaled from seed to Series C+ with real ARR impact data.",
    },
    {
      icon: Users,
      title: "SaaS Operator Community",
      description: "Connect with founders, growth leaders, and revenue operators building B2B SaaS companies at every stage.",
    },
    {
      icon: TrendingUp,
      title: "SaaS Benchmarks",
      description: "Access B2B SaaS benchmarks for CAC, LTV, NRR, and more. Compare your metrics against similar ARR stages.",
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About GTM Match</h1>
          <p className="text-xl text-muted-foreground">
            The community for B2B SaaS go-to-market professionals to share challenges and discover proven playbooks
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              GTM Match exists to help B2B SaaS teams scale faster by connecting them with battle-tested playbooks
              from operators who've already solved the same challenges.
            </p>
            <p className="text-muted-foreground">
              Too often, SaaS founders and growth teams reinvent the wheel—spending months on problems that other
              companies have already solved. We're building a knowledge marketplace specifically for B2B SaaS,
              where you can find proven go-to-market strategies with real ARR impact, and contribute your own
              learnings to help the community.
            </p>
          </CardContent>
        </Card>

        {/* Who It's For */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Who It's For</h2>
            <p className="text-muted-foreground mb-4">
              GTM Match is built exclusively for B2B SaaS companies. Whether you're a seed-stage startup figuring out
              your first GTM motion or a growth-stage company scaling to $50M+ ARR, you'll find relevant problems
              and solutions here.
            </p>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">SaaS Founders</h4>
                <p className="text-sm text-muted-foreground">Finding product-market fit, building your first sales motion, scaling from $1M to $10M ARR</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Growth Leaders</h4>
                <p className="text-sm text-muted-foreground">Demand generation, PLG optimization, marketing attribution, pipeline acceleration</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Sales Leaders</h4>
                <p className="text-sm text-muted-foreground">Enterprise sales motions, sales-assist for PLG, account expansion, ACV optimization</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">RevOps & CS</h4>
                <p className="text-sm text-muted-foreground">Net revenue retention, customer onboarding, expansion playbooks, churn reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">ARR Impact Over Theory</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize solutions with real revenue impact data. Every playbook should include before/after metrics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">SaaS Context Matters</h3>
                <p className="text-sm text-muted-foreground">
                  What works at $1M ARR is different from $10M ARR. Solutions include company stage, ACV, and GTM motion context.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Operator-Led Community</h3>
                <p className="text-sm text-muted-foreground">
                  Built by B2B SaaS operators, for B2B SaaS operators. Your contributions make the community stronger.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
