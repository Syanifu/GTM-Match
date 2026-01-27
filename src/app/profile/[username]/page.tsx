import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProblemCard } from "@/components/problems/problem-card";
import { SolutionCard } from "@/components/solutions/solution-card";
import { EmptyState } from "@/components/shared/empty-state";
import { MessageSquare, CheckCircle, Bookmark } from "lucide-react";
import { mockUsers } from "@/lib/mock-data/users";
import { mockProblems } from "@/lib/mock-data/problems";
import { mockSolutions } from "@/lib/mock-data/solutions";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  // Find user by username
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    notFound();
  }

  // Filter user's problems and solutions
  const userProblems = mockProblems.filter((p) => p.author.id === user.id);
  const userSolutions = mockSolutions.filter((s) => s.author.id === user.id);

  // Mock saved items (in real app, this would come from user's saved collection)
  const savedProblems = mockProblems.slice(0, 2);

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeader user={user} isOwnProfile={false} />

        {/* Stats */}
        <ProfileStats user={user} />

        {/* Activity Tabs */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList>
            <TabsTrigger value="problems">
              Problems ({userProblems.length})
            </TabsTrigger>
            <TabsTrigger value="solutions">
              Solutions ({userSolutions.length})
            </TabsTrigger>
            <TabsTrigger value="saved">
              Saved ({savedProblems.length})
            </TabsTrigger>
          </TabsList>

          {/* Problems Tab */}
          <TabsContent value="problems" className="space-y-4">
            {userProblems.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <EmptyState
                    icon={MessageSquare}
                    title="No problems posted yet"
                    description="This user hasn't posted any problems"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {userProblems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions" className="space-y-4">
            {userSolutions.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <EmptyState
                    icon={CheckCircle}
                    title="No solutions provided yet"
                    description="This user hasn't submitted any solutions"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {userSolutions.map((solution) => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-4">
            {savedProblems.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <EmptyState
                    icon={Bookmark}
                    title="No saved items"
                    description="This user hasn't saved any items"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {savedProblems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
