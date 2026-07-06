import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: number;
  trendLabel: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: StatCardProps) {
  const isPositive = trend >= 0;

  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
          <div className="rounded-full bg-primary/10 p-2.5 text-primary">
            <Icon className="size-5" />
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400",
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="size-4" />
          ) : (
            <ArrowDownRight className="size-4" />
          )}
          <span>{Math.abs(trend)}%</span>
          <span className="font-normal text-muted-foreground">
            {trendLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
