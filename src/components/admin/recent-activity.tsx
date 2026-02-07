import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProblems } from "@/lib/mock-data/problems";
import { mockSolutions } from "@/lib/mock-data/solutions";
import { mockJobs } from "@/lib/mock-data/jobs";
import { FileText, CheckCircle, Briefcase } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type ActivityItem = {
    id: string;
    type: "problem" | "solution" | "job";
    title: string;
    author?: string;
    date: Date;
    link: string;
};

export function RecentActivity() {
    const problems = getAllProblems().map((p) => ({
        id: p.id,
        type: "problem" as const,
        title: p.title,
        author: p.author.name,
        date: p.createdAt,
        link: `/problems/${p.id}`,
    }));

    const solutions = mockSolutions.map((s) => ({
        id: s.id,
        type: "solution" as const,
        title: s.title,
        author: s.author.name,
        date: s.createdAt,
        link: `/problems/${s.problemId}`, // Link to problem since solution doesn't have own page usually
    }));

    const jobs = mockJobs.map((j) => ({
        id: j.id,
        type: "job" as const,
        title: j.title,
        author: j.company,
        date: j.postedAt,
        link: `/jobs/${j.id}`,
    }));

    const allActivity: ActivityItem[] = [...problems, ...solutions, ...jobs]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {allActivity.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="flex items-center">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.type === "problem" && <FileText className="inline mr-2 h-4 w-4 text-blue-500" />}
                                    {item.type === "solution" && <CheckCircle className="inline mr-2 h-4 w-4 text-green-500" />}
                                    {item.type === "job" && <Briefcase className="inline mr-2 h-4 w-4 text-purple-500" />}
                                    <Link href={item.link} className="hover:underline">
                                        {item.title}
                                    </Link>
                                </p>
                                <p className="text-xs text-muted-foreground ml-6">
                                    {item.type === "job" ? `Posted by ${item.author}` : `by ${item.author}`} • {formatDistanceToNow(item.date, { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
