"use client";

import { DashboardStats } from "@/components/admin/dashboard-stats";
import { RecentActivity } from "@/components/admin/recent-activity";
import { ProblemsChart } from "@/components/admin/problems-chart";
import { UsersList } from "@/components/admin/users-list";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Platform overview and key metrics.
                </p>
            </div>

            <DashboardStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RecentActivity />
                </div>
                <div className="col-span-3">
                    <ProblemsChart />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-7">
                    <UsersList />
                </div>
            </div>
        </div>
    );
}
