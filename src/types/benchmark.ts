export interface Benchmark {
  id: string;
  metric: string;
  value: number;
  unit: string; // e.g., "$", "%", "days"
  industry: string;
  companyStage: string;
  companySize: string;
  date: Date;
  source?: string;
  context?: Record<string, any>;
}

export interface BenchmarkFilter {
  industry?: string;
  companyStage?: string;
  companySize?: string;
  metric?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
