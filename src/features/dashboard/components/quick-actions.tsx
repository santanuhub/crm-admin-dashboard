import { useState } from "react";
import { PlusCircle, Sparkles, Target, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ActionConfig = {
  title: string;
  icon: typeof PlusCircle;
  description: string;
};

const actions: ActionConfig[] = [
  {
    title: "+ New Lead",
    icon: PlusCircle,
    description: "Create a new lead record.",
  },
  {
    title: "+ New Deal",
    icon: Target,
    description: "Capture a new opportunity.",
  },
  {
    title: "+ New Task",
    icon: CheckSquare,
    description: "Create a follow-up task.",
  },
];

export function QuickActions() {
  const [activeAction, setActiveAction] = useState<ActionConfig | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Dialog key={action.title}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => setActiveAction(action)}
              >
                <Icon className="size-4" />
                {action.title}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{action.title}</DialogTitle>
                <DialogDescription>
                  {activeAction?.description ??
                    "Form goes here — TODO: build in a later stage"}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                Form goes here — TODO: build in a later stage
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="size-4" />
        <span>Fast actions</span>
      </div>
    </div>
  );
}
