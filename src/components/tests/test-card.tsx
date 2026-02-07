import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, Trophy, ArrowRight } from "lucide-react";
import type { TestCategory } from "@/lib/mock-data/tests";

interface TestCardProps {
    category: TestCategory;
    isCompleted?: boolean;
    score?: number;
}

export function TestCard({ category, isCompleted, score }: TestCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    {isCompleted && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                        </Badge>
                    )}
                </div>
                <CardTitle className="line-clamp-1">{category.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                    {category.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Earn the <strong>{category.badge.name}</strong> Badge</span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {category.questionCount} Questions • {category.passingScore}% to pass
                </div>
                {isCompleted && score !== undefined && (
                    <div className="mt-4 text-sm font-medium">
                        Your Score: <span className={score >= category.passingScore ? "text-green-600" : "text-red-600"}>{score}%</span>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/tests/${category.id}`}>
                        {isCompleted ? "Retake Test" : "Start Test"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
