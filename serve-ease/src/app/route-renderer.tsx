"use client";

import type { ComponentType, ReactNode } from "react";

import { BookingDetailsPage } from "./components/BookingDetailsPage";
import { BookingRequestDetailsPage } from "./components/BookingRequestDetailsPage";
import { BookingRequestsPage } from "./components/BookingRequestsPage";
import { BlockTimePage } from "./components/BlockTimePage";
import { CalendarPage } from "./components/CalendarPage";
import { CancelBookingPage } from "./components/CancelBookingPage";
import { CounterOfferModalPage } from "./components/CounterOfferModalPage";
import { CounterOfferPage } from "./components/CounterOfferPage";
import { DashboardPage } from "./components/DashboardPage";
import { EditProfilePage } from "./components/EditProfilePage";
import { EditServicesPricingPage } from "./components/EditServicesPricingPage";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import { MessagesPage } from "./components/MessagesPage";
import { NotificationPreferencesPage } from "./components/NotificationPreferencesPage";
import { OnboardingPage } from "./components/OnboardingPage";
import { PayoutConfirmationPage } from "./components/PayoutConfirmationPage";
import { PayoutPage } from "./components/PayoutPage";
import { PortfolioManagementPage } from "./components/PortfolioManagementPage";
import { ProviderAnalyticsPage } from "./components/ProviderAnalyticsPage";
import { ProviderEarningsDashboard } from "./components/ProviderEarningsDashboard";
import { ProviderEarningsDetails } from "./components/ProviderEarningsDetails";
import { ProviderHelpCenterPage } from "./components/ProviderHelpCenterPage";
import { ProviderPerformanceInsightsPage } from "./components/ProviderPerformanceInsightsPage";
import { ProviderProfilePage } from "./components/ProviderProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProviderReviewsPage } from "./components/ProviderReviewsPage";
import { ProviderSettingsPage } from "./components/ProviderSettingsPage";
import { RequestPayoutPage } from "./components/RequestPayoutPage";
import { SetAvailabilityPage } from "./components/SetAvailabilityPage";
import { UnifiedBookingsPage } from "./components/UnifiedBookingsPage";
import { Providers } from "./providers";
import { RouteContextProvider } from "@/lib/react-router-compat";

type RouteEntry = {
  component: ComponentType;
  layout?: boolean;
  path: string;
};

type MatchedRoute = {
  component: ComponentType;
  layout: boolean;
  params: Record<string, string>;
};

const ROUTES: RouteEntry[] = [
  { path: "/", component: DashboardPage, layout: true },
  { path: "/login", component: LoginPage },
  { path: "/provider/apply", component: OnboardingPage, layout: true },
  { path: "/provider/dashboard", component: DashboardPage, layout: true },
  { path: "/provider/onboarding", component: OnboardingPage, layout: true },
  { path: "/provider/bookings", component: UnifiedBookingsPage, layout: true },
  { path: "/provider/requests", component: BookingRequestsPage, layout: true },
  { path: "/provider/booking-details/:id", component: BookingDetailsPage, layout: true },
  { path: "/provider/request-details/:id", component: BookingRequestDetailsPage, layout: true },
  { path: "/provider/counter-offer/:id", component: CounterOfferModalPage, layout: true },
  { path: "/provider/cancel-booking/:id", component: CancelBookingPage, layout: true },
  { path: "/provider/counter-offer", component: CounterOfferPage, layout: true },
  { path: "/provider/earningsdashboard", component: ProviderEarningsDashboard, layout: true },
  { path: "/provider/earningsdetails", component: ProviderEarningsDetails, layout: true },
  { path: "/provider/reviews", component: ProviderReviewsPage, layout: true },
  { path: "/provider/performanceinsights", component: ProviderPerformanceInsightsPage, layout: true },
  { path: "/provider/analytics", component: ProviderAnalyticsPage, layout: true },
  { path: "/provider/calendar", component: CalendarPage, layout: true },
  { path: "/provider/availability", component: SetAvailabilityPage, layout: true },
  { path: "/provider/block-time", component: BlockTimePage, layout: true },
  { path: "/provider/payout", component: PayoutPage, layout: true },
  { path: "/provider/request-payout", component: RequestPayoutPage, layout: true },
  { path: "/provider/payout-confirmation", component: PayoutConfirmationPage, layout: true },
  { path: "/provider/profile", component: ProviderProfilePage, layout: true },
  { path: "/provider/edit-profile", component: EditProfilePage, layout: true },
  { path: "/provider/edit-services", component: EditServicesPricingPage, layout: true },
  { path: "/provider/portfolio", component: PortfolioManagementPage, layout: true },
  { path: "/provider/settings", component: ProviderSettingsPage, layout: true },
  { path: "/provider/help-center", component: ProviderHelpCenterPage, layout: true },
  { path: "/provider/messages", component: MessagesPage, layout: true },
  {
    path: "/provider/notification-preferences",
    component: NotificationPreferencesPage,
    layout: true,
  },
];

function normalizePath(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function matchRoute(pathname: string): MatchedRoute | null {
  const normalizedPath = normalizePath(pathname);

  for (const route of ROUTES) {
    const routeSegments = route.path.split("/").filter(Boolean);
    const pathSegments = normalizedPath.split("/").filter(Boolean);

    if (routeSegments.length !== pathSegments.length) {
      continue;
    }

    const params: Record<string, string> = {};
    let matches = true;

    for (let index = 0; index < routeSegments.length; index += 1) {
      const routeSegment = routeSegments[index];
      const pathSegment = pathSegments[index];

      if (routeSegment.startsWith(":")) {
        params[routeSegment.slice(1)] = decodeURIComponent(pathSegment);
        continue;
      }

      if (routeSegment !== pathSegment) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return {
        component: route.component,
        layout: route.layout ?? false,
        params,
      };
    }
  }

  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-gray-600">
          The requested route is not wired into the Next migration yet.
        </p>
      </div>
    </div>
  );
}

export function RouteRenderer({ pathname }: { pathname: string }) {
  const matched = matchRoute(pathname);

  if (!matched) {
    return <NotFoundPage />;
  }

  const PageComponent = matched.component;
  const page = <PageComponent />;

  let content: ReactNode = page;

  if (matched.layout) {
    content = (
      <RouteContextProvider outlet={page} params={matched.params} pathname={pathname}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </RouteContextProvider>
    );
  } else {
    content = (
      <RouteContextProvider outlet={null} params={matched.params} pathname={pathname}>
        {page}
      </RouteContextProvider>
    );
  }

  return <Providers>{content}</Providers>;
}
