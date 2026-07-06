import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: replace with RTK Query data (revenueApi.useGetMonthlyRevenueQuery())
const revenueData = [
  { month: "Jan", revenue: 18200 },
  { month: "Feb", revenue: 21400 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 24200 },
  { month: "May", revenue: 26600 },
  { month: "Jun", revenue: 25100 },
  { month: "Jul", revenue: 28900 },
  { month: "Aug", revenue: 31400 },
  { month: "Sep", revenue: 30200 },
  { month: "Oct", revenue: 33800 },
  { month: "Nov", revenue: 37100 },
  { month: "Dec", revenue: 40200 },
];

export function RevenueChart() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--color-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.75rem",
                  color: "var(--color-foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
