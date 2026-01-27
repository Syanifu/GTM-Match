import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label?: string;
  className?: string;
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-1.5 text-muted-foreground", className)}>
      <Icon className="h-4 w-4" />
      <span className="text-sm">{value}</span>
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
}
