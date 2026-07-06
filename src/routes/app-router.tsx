import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { LoginPage } from "@/features/auth/login-page";
import { FileText } from "lucide-react";
import { ProtectedRoute } from "./protected-route";

const DashboardPage = lazy(() =>
  import("@/features/dashboard/dashboard-page").then((module) => ({
    default: module.DashboardPage,
  })),
);
const LeadsListPage = lazy(() =>
  import("@/features/leads/leads-list-page").then((module) => ({
    default: module.LeadsListPage,
  })),
);
const LeadDetailPage = lazy(() =>
  import("@/features/leads/lead-detail-page").then((module) => ({
    default: module.LeadDetailPage,
  })),
);
const DealsPipelinePage = lazy(() =>
  import("@/features/deals/deals-pipeline-page").then((module) => ({
    default: module.DealsPipelinePage,
  })),
);

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageSkeleton />}>{element}</Suspense>;
}

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={FileText}
        title={`${title} coming soon`}
        description="This section is intentionally scaffolded and ready for the same lead-style implementation pattern."
      />
    </div>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>{withSuspense(<DashboardPage />)}</ProtectedRoute>
        ),
      },
      {
        path: "leads",
        element: (
          <ProtectedRoute>{withSuspense(<LeadsListPage />)}</ProtectedRoute>
        ),
      },
      {
        path: "leads/:leadId",
        element: (
          <ProtectedRoute>{withSuspense(<LeadDetailPage />)}</ProtectedRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Contacts"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "companies",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Companies"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "deals",
        element: (
          <ProtectedRoute>{withSuspense(<DealsPipelinePage />)}</ProtectedRoute>
        ),
      },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Tasks"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Calendar"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Reports"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            {withSuspense(
              <PlaceholderPage
                title="Settings"
                description="Coming soon — build this using the same pattern as Leads"
              />,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "*",
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
];

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-border/70 bg-card/70 p-8 text-center shadow-sm dark:bg-card/50">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <span className="text-xl font-semibold">404</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to dashboard
        </a>
      </div>
    </div>
  );
}

export const appRouter = createBrowserRouter(routes);
