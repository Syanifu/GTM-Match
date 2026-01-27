import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Real GTM Problems",
      description: "Share actual challenges you're facing in lead generation, conversion, sales enablement, and more.",
    },
    {
      icon: Lightbulb,
      title: "Battle-Tested Solutions",
      description: "Get proven solutions from practitioners who've solved similar problems at scale.",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Connect with GTM professionals, learn from their experiences, and build your reputation.",
    },
    {
      icon: TrendingUp,
      title: "Data & Benchmarks",
      description: "Access industry benchmarks and compare your metrics against similar companies.",
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About GTM Match</h1>
          <p className="text-xl text-muted-foreground">
            The community marketplace for go-to-market professionals to discover and solve real GTM challenges
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              GTM Match exists to help go-to-market professionals solve their hardest challenges faster by connecting them
              with battle-tested solutions from peers who've been there.
            </p>
            <p className="text-muted-foreground">
              Too often, GTM teams reinvent the wheel, spending months on problems that others have already solved.
              We're building a knowledge marketplace where you can find proven solutions, learn from real implementations,
              and contribute your own expertise to help others.
            </p>
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
                <h3 className="font-semibold mb-1">Quality Over Quantity</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize detailed, actionable solutions over quick tips. Every solution should be battle-tested with real metrics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Share what worked, what didn't, and the context that matters. Real problems deserve honest answers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Community First</h3>
                <p className="text-sm text-muted-foreground">
                  We're building this for practitioners, by practitioners. Your contributions make the community stronger.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
