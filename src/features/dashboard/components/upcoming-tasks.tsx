import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// TODO: replace with tasksApi query/mutation
const initialTasks = [
  {
    id: 1,
    title: "Follow up with Northwind renewal",
    dueDate: "Today, 4:00 PM",
    priority: "High" as const,
  },
  {
    id: 2,
    title: "Prepare Q3 sales summary",
    dueDate: "Tomorrow, 11:00 AM",
    priority: "Medium" as const,
  },
  {
    id: 3,
    title: "Review onboarding feedback",
    dueDate: "Thu, 2:00 PM",
    priority: "Low" as const,
  },
  {
    id: 4,
    title: "Confirm proposal delivery",
    dueDate: "Fri, 10:30 AM",
    priority: "High" as const,
  },
  {
    id: 5,
    title: "Sync with support team",
    dueDate: "Next Mon",
    priority: "Medium" as const,
  },
];

export function UpcomingTasks() {
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);

  const toggleTask = (taskId: number) => {
    setCompletedTaskIds((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId],
    );
  };

  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {initialTasks.map((task) => {
          const completed = completedTaskIds.includes(task.id);
          return (
            <label
              key={task.id}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3 transition-colors hover:bg-muted/40 dark:bg-background/30"
            >
              <Checkbox
                checked={completed}
                onCheckedChange={() => toggleTask(task.id)}
                aria-label={`Mark ${task.title} as complete`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={
                      completed
                        ? "text-sm text-muted-foreground line-through"
                        : "text-sm font-medium text-foreground"
                    }
                  >
                    {task.title}
                  </p>
                  <Badge
                    variant={
                      task.priority === "High"
                        ? "destructive"
                        : task.priority === "Medium"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.dueDate}
                </p>
              </div>
            </label>
          );
        })}
      </CardContent>
    </Card>
  );
}
