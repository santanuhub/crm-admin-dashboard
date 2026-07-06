import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BellRing,
  Building2,
  CalendarDays,
  CheckSquare,
  CircleDollarSign,
  ContactRound,
  Inbox,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleSidebar } from "@/app/store";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItemConfig = {
  label: string;
  icon: LucideIcon;
  href: string;
};

type NavSectionConfig = {
  title: string;
  items: NavItemConfig[];
};

function NavItem({
  item,
  collapsed,
}: {
  item: NavItemConfig;
  collapsed: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    item.href === "/dashboard"
      ? location.pathname === "/dashboard" || location.pathname === "/"
      : location.pathname === item.href ||
        location.pathname.startsWith(`${item.href}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2",
          collapsed && "justify-center px-2",
        )}
      >
        <NavLink
          to={item.href}
          className="flex w-full items-center gap-2"
          onClick={() => navigate(item.href)}
        >
          <item.icon className="size-4 shrink-0" />
          {!collapsed ? <span className="text-sm">{item.label}</span> : null}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavSection({
  section,
  collapsed,
}: {
  section: NavSectionConfig;
  collapsed: boolean;
}) {
  return (
    <SidebarGroup>
      {!collapsed ? (
        <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {section.title}
        </SidebarGroupLabel>
      ) : null}
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <NavItem key={item.label} item={item} collapsed={collapsed} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function Sidebar() {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  const sections = useMemo<NavSectionConfig[]>(
    () => [
      {
        title: "Sales",
        items: [
          { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
          { label: "Leads", icon: Users, href: "/leads" },
          { label: "Contacts", icon: ContactRound, href: "/contacts" },
          { label: "Companies", icon: Building2, href: "/companies" },
          { label: "Deals", icon: CircleDollarSign, href: "/deals" },
        ],
      },
      {
        title: "Activity",
        items: [
          { label: "Tasks", icon: CheckSquare, href: "/tasks" },
          { label: "Calendar", icon: CalendarDays, href: "/calendar" },
          { label: "Inbox", icon: Inbox, href: "/inbox" },
        ],
      },
      {
        title: "Insights",
        items: [
          { label: "Reports & Analytics", icon: BarChart3, href: "/reports" },
        ],
      },
      {
        title: "Admin",
        items: [
          { label: "Team", icon: Users, href: "/team" },
          { label: "Settings", icon: Settings, href: "/settings" },
        ],
      },
    ],
    [],
  );

  return (
    <SidebarProvider open={!sidebarCollapsed}>
      <ShadcnSidebar
        side="left"
        className="border-r border-border bg-sidebar text-sidebar-foreground"
      >
        <SidebarHeader className="border-b border-border px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            {!sidebarCollapsed ? (
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  CRM
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Northstar
                </p>
              </div>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={() => dispatch(toggleSidebar())}
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              <PanelLeft className="size-4" />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 py-2">
          {sections.map((section) => (
            <NavSection
              key={section.title}
              section={section}
              collapsed={sidebarCollapsed}
            />
          ))}
        </SidebarContent>
        <SidebarFooter className="border-t border-border px-3 py-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2">
            <BellRing className="size-4 text-muted-foreground" />
            {!sidebarCollapsed ? (
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">
                  Next review
                </p>
                <p className="text-xs text-muted-foreground">
                  3 pending follow-ups
                </p>
              </div>
            ) : null}
          </div>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
}
