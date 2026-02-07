"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCategoryById, getQuestionsByCategory } from "@/lib/mock-data/tests";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Trophy, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function TestPage() {
    const params = useParams();
    const categoryId = params.categoryId as string;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    const category = getCategoryById(categoryId);
    const questions = getQuestionsByCategory(categoryId);

    useEffect(() => {
        if (!isCompleted) {
            const timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [startTime, isCompleted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins + ":" + String(secs).padStart(2, "0");
    };

    if (!category) {
        return (
            <div className="container py-8 max-w-4xl">
                <Card className="text-center py-12">
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
                        <p className="text-muted-foreground mb-6">
                            The test category you are looking for does not exist.
                        </p>
                        <Button asChild>
                            <Link href="/tests">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Tests
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const answeredCount = Object.keys(answers).length;

    const handleAnswerChange = (value: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        const answeredQuestions = Object.keys(answers).filter(id => answers[id].trim().length > 50);
        const calculatedScore = Math.round((answeredQuestions.length / questions.length) * 100);
        setScore(calculatedScore);
        setIsCompleted(true);
    };

    if (isCompleted) {
        const passed = score >= category.passingScore;

        return (
            <div className="container py-8 max-w-4xl">
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto mb-4">
                            {passed ? (
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                    <Trophy className="w-10 h-10 text-green-600" />
                                </div>
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <span className="text-4xl">{category.icon}</span>
                                </div>
                            )}
                        </div>
                        <CardTitle className="text-2xl">
                            {passed ? "Congratulations!" : "Test Completed"}
                        </CardTitle>
                        <CardDescription className="text-lg">
                            {passed
                                ? "You have earned the " + category.badge.name + " badge!"
                                : "Keep practicing to earn your badge."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary">{score}%</div>
                                <div className="text-sm text-muted-foreground">Your Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold">{category.passingScore}%</div>
                                <div className="text-sm text-muted-foreground">Passing Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold">{formatTime(elapsedTime)}</div>
                                <div className="text-sm text-muted-foreground">Time Taken</div>
                            </div>
                        </div>

                        {passed && (
                            <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                {category.badge.icon} {category.badge.name}
                            </Badge>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/tests">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                All Tests
                            </Link>
                        </Button>
                        <Button onClick={() => {
                            setCurrentQuestionIndex(0);
                            setAnswers({});
                            setIsCompleted(false);
                            setScore(0);
                        }}>
                            Retake Test
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" asChild>
                    <Link href="/tests">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatTime(elapsedTime)}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <h1 className="text-2xl font-bold">{category.name}</h1>
                </div>
                <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{answeredCount} answered</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg leading-relaxed">
                        {currentQuestion.question}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Type your answer here... Be thorough in your response to demonstrate your GTM expertise."
                        className="min-h-[200px] resize-none"
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        Write at least 50 characters for a complete response
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button onClick={handleSubmit}>
                            Submit Test
                            <CheckCircle className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Jump to question:</p>
                <div className="flex flex-wrap gap-2">
                    {questions.map((q, index) => (
                        <Button
                            key={q.id}
                            variant={index === currentQuestionIndex ? "default" : answers[q.id] ? "secondary" : "outline"}
                            size="sm"
                            className="w-10 h-10"
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
