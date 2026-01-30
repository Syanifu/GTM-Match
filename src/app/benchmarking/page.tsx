"use client";

import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock benchmark data
const cacData = [
  { stage: "Pre-seed", avg: 320, median: 280, p75: 420, p90: 580 },
  { stage: "Seed", avg: 450, median: 380, p75: 520, p90: 720 },
  { stage: "Series A", avg: 580, median: 520, p75: 680, p90: 850 },
  { stage: "Series B", avg: 720, median: 640, p75: 850, p90: 1100 },
];

const conversionRates = [
  { metric: "Trial to Paid", avg: 18, industry: 15, topQuartile: 25 },
  { metric: "MQL to SQL", avg: 28, industry: 24, topQuartile: 38 },
  { metric: "SQL to Won", avg: 22, industry: 19, topQuartile: 32 },
  { metric: "Lead to Customer", avg: 8, industry: 6, topQuartile: 12 },
];

const growthMetrics = [
  { month: "Jan", revenue: 45000, customers: 120 },
  { month: "Feb", revenue: 52000, customers: 142 },
  { month: "Mar", revenue: 61000, customers: 168 },
  { month: "Apr", revenue: 73000, customers: 201 },
  { month: "May", revenue: 89000, customers: 245 },
  { month: "Jun", revenue: 108000, customers: 298 },
];

const ltvcacData = [
  { industry: "SMB SaaS", avgLTV: 8000, avgCAC: 350, ratio: 22.9 },
  { industry: "Mid-Market SaaS", avgLTV: 24000, avgCAC: 680, ratio: 35.3 },
  { industry: "Enterprise SaaS", avgLTV: 120000, avgCAC: 18000, ratio: 6.7 },
  { industry: "Dev Tools / API", avgLTV: 18000, avgCAC: 520, ratio: 34.6 },
];

export default function BenchmarkingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">B2B SaaS Benchmarks</h1>
        <p className="text-muted-foreground">
          Compare your SaaS metrics against industry benchmarks by ARR stage
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="SaaS Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All B2B SaaS</SelectItem>
            <SelectItem value="horizontal">Horizontal SaaS</SelectItem>
            <SelectItem value="vertical">Vertical SaaS</SelectItem>
            <SelectItem value="dev-tools">Dev Tools / API</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="ARR Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ARR Stages</SelectItem>
            <SelectItem value="0-1m">$0-$1M ARR</SelectItem>
            <SelectItem value="1-5m">$1M-$5M ARR</SelectItem>
            <SelectItem value="5-20m">$5M-$20M ARR</SelectItem>
            <SelectItem value="20m+">$20M+ ARR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {/* CAC by Stage */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition Cost (CAC) by Stage</CardTitle>
            <CardDescription>Average, median, and percentile distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cacData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" fill="hsl(var(--primary))" name="Average" />
                <Bar dataKey="median" fill="hsl(var(--chart-2))" name="Median" />
                <Bar dataKey="p75" fill="hsl(var(--chart-3))" name="75th Percentile" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Benchmarks</CardTitle>
            <CardDescription>Compare your conversion rates against industry averages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionRates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="metric" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" fill="hsl(var(--chart-1))" name="Your Company" />
                <Bar dataKey="industry" fill="hsl(var(--chart-2))" name="Industry Avg" />
                <Bar dataKey="topQuartile" fill="hsl(var(--chart-3))" name="Top Quartile" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Trajectory</CardTitle>
            <CardDescription>Revenue and customer growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="customers"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* LTV:CAC Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>LTV:CAC Ratio by Segment</CardTitle>
            <CardDescription>Customer lifetime value to acquisition cost ratio by target market</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ltvcacData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ratio" fill="hsl(var(--chart-4))" name="LTV:CAC Ratio" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Target:</strong> LTV:CAC ratio should be 3:1 or higher for healthy SaaS businesses.
                Ratios below 3:1 indicate potential CAC efficiency issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
