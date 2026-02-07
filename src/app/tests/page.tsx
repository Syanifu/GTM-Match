"use client";

import { testCategories, mockUserProgress } from "@/lib/mock-data/tests";
import { TestCard } from "@/components/tests/test-card";
import { Trophy } from "lucide-react";

export default function TestsPage() {
    return (
        <div className="container py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Skill Assessments</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Prove your expertise and earn badges to display on your profile.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-200">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">
                        {mockUserProgress.filter(p => p.badgeEarned).length} Badges Earned
                    </span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testCategories.map((category) => {
                    const progress = mockUserProgress.find((p) => p.categoryId === category.id);
                    return (
                        <TestCard
                            key={category.id}
                            category={category}
                            isCompleted={progress?.completed}
                            score={progress?.score}
                        />
                    );
                })}
            </div>
        </div>
    );
}
