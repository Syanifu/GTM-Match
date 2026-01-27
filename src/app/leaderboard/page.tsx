"use client";

import { useState } from "react";
import { Crown, TrendingUp, Award, MessageSquare, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { mockUsers } from "@/lib/mock-data/users";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const [selectedTab, setSelectedTab] = useState("top-solvers");

  // Sort users by different metrics
  const topSolvers = [...mockUsers].sort(
    (a, b) => b.stats.acceptedSolutions - a.stats.acceptedSolutions
  );

  const risingStars = [...mockUsers].sort(
    (a, b) => b.stats.upvotesReceived - a.stats.upvotesReceived
  );

  const topContributors = [...mockUsers].sort(
    (a, b) => b.reputation - a.reputation
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Crown className="h-5 w-5 text-gray-400 fill-gray-400" />;
    if (rank === 3) return <Crown className="h-5 w-5 text-orange-600 fill-orange-600" />;
    return null;
  };

  const LeaderboardList = ({ users, metric }: { users: any[]; metric: "solutions" | "upvotes" | "reputation" }) => (
    <div className="space-y-3">
      {users.map((user, index) => {
        const rank = index + 1;
        const getValue = () => {
          if (metric === "solutions") return user.stats.acceptedSolutions;
          if (metric === "upvotes") return user.stats.upvotesReceived;
          return user.reputation;
        };

        return (
          <Link key={user.id} href={`/profile/${user.username}`}>
            <Card className={cn(
              "hover:shadow-lg transition-all cursor-pointer",
              rank <= 3 && "border-2",
              rank === 1 && "border-yellow-500/50 bg-yellow-50/10",
              rank === 2 && "border-gray-400/50 bg-gray-50/10",
              rank === 3 && "border-orange-600/50 bg-orange-50/10"
            )}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {rank <= 3 ? (
                      getRankIcon(rank)
                    ) : (
                      <span className="text-2xl font-bold text-muted-foreground">
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      {user.badges && user.badges.length > 0 && (
                        <span className="text-xs">{user.badges[0].icon}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {metric === "solutions" && (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-2xl font-bold">{getValue()}</span>
                        </>
                      )}
                      {metric === "upvotes" && (
                        <>
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          <span className="text-2xl font-bold">{getValue()}</span>
                        </>
                      )}
                      {metric === "reputation" && (
                        <>
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="text-2xl font-bold">{getValue().toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {metric === "solutions" && "accepted solutions"}
                      {metric === "upvotes" && "upvotes received"}
                      {metric === "reputation" && "reputation"}
                    </p>
                  </div>

                  {/* Badges */}
                  {user.expertise && user.expertise.length > 0 && (
                    <div className="hidden lg:flex gap-1 max-w-[200px]">
                      {user.expertise.slice(0, 2).map((area: string) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors in the GTM Match community
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="top-solvers" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Top Solvers</span>
              <span className="sm:hidden">Solvers</span>
            </TabsTrigger>
            <TabsTrigger value="rising-stars" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Rising Stars</span>
              <span className="sm:hidden">Rising</span>
            </TabsTrigger>
            <TabsTrigger value="top-contributors" className="gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Top Contributors</span>
              <span className="sm:hidden">Top</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-solvers" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Top Solution Providers</h2>
              <p className="text-sm text-muted-foreground">
                Ranked by number of accepted solutions
              </p>
            </div>
            <LeaderboardList users={topSolvers} metric="solutions" />
          </TabsContent>

          <TabsContent value="rising-stars" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Rising Stars</h2>
              <p className="text-sm text-muted-foreground">
                Ranked by total upvotes received
              </p>
            </div>
            <LeaderboardList users={risingStars} metric="upvotes" />
          </TabsContent>

          <TabsContent value="top-contributors" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Top Contributors</h2>
              <p className="text-sm text-muted-foreground">
                Ranked by total reputation points
              </p>
            </div>
            <LeaderboardList users={topContributors} metric="reputation" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
