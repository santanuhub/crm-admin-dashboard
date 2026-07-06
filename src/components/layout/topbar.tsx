import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Bell,
  Command,
  LayoutGrid,
  Moon,
  Search,
  Sun,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: typeof Bell;
};

function NotificationItem({ item }: { item: NotificationItem }) {
  const Icon = item.icon;

  return (
    <div className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-muted/60">
      <div className="mt-0.5 rounded-full bg-muted p-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{item.time}</p>
      </div>
    </div>
  );
}

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [openCommand, setOpenCommand] = useState(false);
  const location = useLocation();

  const notifications = useMemo<NotificationItem[]>(
    () => [
      {
        id: 1,
        title: "Lead follow-up",
        description: "Mina Patel is waiting for your proposal update.",
        time: "2m ago",
        icon: Bell,
      },
      {
        id: 2,
        title: "Deal moved forward",
        description: "Northwind renewal advanced to negotiation.",
        time: "15m ago",
        icon: Command,
      },
      {
        id: 3,
        title: "Task reminder",
        description: "Quarterly review is due before noon.",
        time: "1h ago",
        icon: Bell,
      },
    ],
    [],
  );

  const breadcrumbSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbLabel = useMemo(() => {
    if (breadcrumbSegments.length === 0) {
      return "Dashboard";
    }

    const [firstSegment, secondSegment] = breadcrumbSegments;
    if (firstSegment === "leads" && secondSegment) {
      return `Leads / ${secondSegment}`;
    }

    const labels = breadcrumbSegments.map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    );
    return labels.join(" / ");
  }, [breadcrumbSegments]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenCommand(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open sidebar"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="capitalize">{breadcrumbLabel}</span>
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setOpenCommand(true)}
            className={cn(
              "flex h-9 w-full max-w-[280px] items-center justify-between rounded-lg border border-input bg-background/80 px-3 text-left text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted/60",
              "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            )}
            aria-label="Open search"
          >
            <span className="flex items-center gap-2">
              <Search className="size-4" />
              <span>Search...</span>
            </span>
            <span className="rounded border border-border bg-muted/80 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              ⌘K
            </span>
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
                <span className="absolute right-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="cursor-pointer rounded-md p-0"
                >
                  <NotificationItem item={item} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-auto rounded-full p-1"
                aria-label="User menu"
              >
                <Avatar size="sm">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  Santiago Cruz
                </span>
                <span className="text-xs text-muted-foreground">
                  Sales Director
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => undefined}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Leads">
            <CommandItem onSelect={() => setOpenCommand(false)}>
              <Search className="size-4" />
              <span>Find high-intent leads</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpenCommand(false)}>
              <Search className="size-4" />
              <span>Review overdue follow-ups</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Contacts">
            <CommandItem onSelect={() => setOpenCommand(false)}>
              <UserCircle2 className="size-4" />
              <span>Open recent contacts</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Deals">
            <CommandItem onSelect={() => setOpenCommand(false)}>
              <Command className="size-4" />
              <span>Check Q3 pipeline health</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
