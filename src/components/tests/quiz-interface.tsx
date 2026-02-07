"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TestQuestion, TestCategory } from "@/lib/mock-data/tests"; // You'll need to update mock data to include options/answers logic

// Mocking options and correct answers here since they weren't in the original mock data file
// In a real app, these would come from the API/Database
const getOptionsForQuestion = (questionId: string) => {
    return [
        { id: "a", text: "Option A: Focus on high-value segments" },
        { id: "b", text: "Option B: Reduce pricing to compete" },
        { id: "c", text: "Option C: Ignore the data and proceed" },
        { id: "d", text: "Option D: Invest in more marketing" },
    ];
};

const getCorrectAnswerForQuestion = (questionId: string) => "a"; // Mock correct answer

interface QuizInterfaceProps {
    category: TestCategory;
    questions: TestQuestion[];
}

export function QuizInterface({ category, questions }: QuizInterfaceProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleOptionSelect = (value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: value,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            calculateScore();
            setIsSubmitted(true);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((q) => {
            if (answers[q.id] === getCorrectAnswerForQuestion(q.id)) {
                correctCount++;
            }
        });
        const finalScore = Math.round((correctCount / questions.length) * 100);
        setScore(finalScore);
    };

    if (isSubmitted) {
        const passed = score >= category.passingScore;
        return (
            <Card className="max-w-2xl mx-auto text-center p-8">
                <CardHeader>
                    <div className="mx-auto mb-4">
                        {passed ? (
                            <Trophy className="w-20 h-20 text-yellow-500" />
                        ) : (
                            <XCircle className="w-20 h-20 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-3xl">
                        {passed ? "Congratulations!" : "Test Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl mb-4">You scored <strong>{score}%</strong></p>
                    <p className="text-muted-foreground mb-6">
                        {passed
                            ? `You have earned the "${category.badge.name}" badge!`
                            : `You need ${category.passingScore}% to pass. Better luck next time.`}
                    </p>
                    {passed && (
                        <div className="flex justify-center items-center gap-2 bg-green-50 text-green-800 p-4 rounded-lg mb-6 max-w-sm mx-auto">
                            <CheckCircle className="w-5 h-5" />
                            Badge Added to Profile
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button asChild variant="outline">
                        <Link href="/tests">Back to Tests</Link>
                    </Button>
                    {!passed && (
                        <Button onClick={() => window.location.reload()}>Retake Test</Button>
                    )}
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                        {category.name}
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="py-6">
                <h3 className="text-xl font-medium mb-6 leading-relaxed">
                    {currentQuestion.question}
                </h3>

                <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleOptionSelect}
                    className="space-y-3"
                >
                    {getOptionsForQuestion(currentQuestion.id).map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-grow cursor-pointer font-normal">
                                {option.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="ghost"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                >
                    {currentQuestionIndex === questions.length - 1 ? "Submit Test" : "Next Question"}
                </Button>
            </CardFooter>
        </Card>
    );
}
