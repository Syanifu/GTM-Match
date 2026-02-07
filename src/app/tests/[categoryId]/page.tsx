"use client";

import { useParams, useRouter } from "next/navigation";
import { getCategoryById, getQuestionsByCategory } from "@/lib/mock-data/tests";
import { QuizInterface } from "@/components/tests/quiz-interface";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TestDetailPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.categoryId as string;
    const category = getCategoryById(categoryId);
    const questions = getQuestionsByCategory(categoryId);

    const [hasStarted, setHasStarted] = useState(false);

    if (!category) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Test Not Found</h1>
                <Button asChild><Link href="/tests">Return to Tests</Link></Button>
            </div>
        );
    }

    if (hasStarted) {
        return (
            <div className="container py-10">
                <QuizInterface category={category} questions={questions} />
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-4xl">
            <Button variant="ghost" className="mb-6" asChild>
                <Link href="/tests">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Tests
                </Link>
            </Button>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        {category.description}
                    </p>

                    <Card>
                        <CardHeader>
                            <CardTitle>About this Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                This assessment tests your knowledge in <strong>{category.name}</strong>.
                                Pass to earn the <strong>{category.badge.name}</strong> badge.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>{questions.length} multiple-choice questions</li>
                                <li>Passing score: {category.passingScore}%</li>
                                <li>No time limit</li>
                                <li>Retake as many times as needed</li>
                            </ul>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Once started, you cannot save your progress. Make sure you have enough time to complete the test.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button size="lg" className="w-full md:w-auto" onClick={() => setHasStarted(true)}>
                                Start Assessment
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Badge Reward</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-6xl mb-4">{category.badge.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{category.badge.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                Awarded upon passing the assessment with {category.passingScore}% or higher.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
