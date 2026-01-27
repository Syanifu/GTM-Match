import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Star, TrendingUp, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SolutionCard } from "@/components/solutions/solution-card";
import { mockTools } from "@/lib/mock-data/tools";
import { mockSolutions } from "@/lib/mock-data/solutions";

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
}

const getPricingBadgeVariant = (pricing: string) => {
  switch (pricing) {
    case "free":
      return "default";
    case "freemium":
      return "secondary";
    case "paid":
      return "outline";
    default:
      return "outline";
  }
};

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = mockTools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Find solutions that use this tool
  const relatedSolutions = mockSolutions.filter((solution) =>
    solution.implementation.toolsUsed.some(
      (t) => t.toLowerCase() === tool.name.toLowerCase()
    )
  );

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/tools">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tool Header */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              {tool.logo && (
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="h-12 w-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{tool.name}</h1>
                <p className="text-muted-foreground text-lg">{tool.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {tool.website && (
                <Button asChild>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Badge variant={getPricingBadgeVariant(tool.pricing)}>
                {tool.pricing === "free" && "Free"}
                {tool.pricing === "freemium" && "Freemium"}
                {tool.pricing === "paid" && "Paid"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Pricing Details */}
          {tool.pricingDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{tool.pricingDetails}</p>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations */}
          {tool.integrations && tool.integrations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.integrations.map((integration) => (
                    <Badge key={integration} variant="outline">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Solutions */}
          {relatedSolutions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Solutions Using {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {relatedSolutions.map((solution) => (
                    <SolutionCard key={solution.id} solution={solution} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          {tool.stats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Usage Count</span>
                  </div>
                  <span className="font-semibold">{tool.stats.usageCount}</span>
                </div>

                {tool.stats.winRate !== undefined && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">Win Rate</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {tool.stats.winRate}%
                    </span>
                  </div>
                )}

                {tool.stats.avgRating !== undefined && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">Avg Rating</span>
                    </div>
                    <span className="font-semibold text-yellow-600">
                      {tool.stats.avgRating.toFixed(1)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Categories */}
          {tool.category && tool.category.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
