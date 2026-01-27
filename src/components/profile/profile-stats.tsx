import { MessageSquare, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types/user";

interface ProfileStatsProps {
  user: User;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const stats = [
    {
      icon: Award,
      label: "Reputation",
      value: user.reputation.toLocaleString(),
      color: "text-yellow-600",
    },
    {
      icon: MessageSquare,
      label: "Problems Posted",
      value: user.stats.problemsPosted,
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      label: "Solutions Provided",
      value: user.stats.solutionsProvided,
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      label: "Upvotes Received",
      value: user.stats.upvotesReceived,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
