import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Briefcase, TrendingUp, Activity } from "lucide-react";
import { getAllProblems } from "@/lib/mock-data/problems";
import { mockSolutions } from "@/lib/mock-data/solutions";
import { mockUsers } from "@/lib/mock-data/users";
import { mockJobs } from "@/lib/mock-data/jobs";

export function DashboardStats() {
    const problems = getAllProblems();

    const stats = [
        {
            title: "Total Users",
            value: mockUsers.length,
            description: "Active users on platform",
            icon: Users,
            trend: "+12% from last month",
        },
        {
            title: "Total Problems",
            value: problems.length,
            description: "Problems posted",
            icon: FileText,
            trend: "+5 new this week",
        },
        {
            title: "Total Solutions",
            value: mockSolutions.length,
            description: "Solutions provided",
            icon: CheckCircle,
            trend: "+8 new this week",
        },
        {
            title: "Active Jobs",
            value: mockJobs.length,
            description: "Job listings live",
            icon: Briefcase,
            trend: "+2 new this week",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                        <div className="flex items-center text-xs text-green-500 mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {stat.trend}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
