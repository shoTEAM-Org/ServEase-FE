import { Navigate, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { CounterOfferPage } from "./components/CounterOfferPage";
import { ProviderEarningsDashboard } from "./components/ProviderEarningsDashboard";
import { ProviderEarningsDetails } from "./components/ProviderEarningsDetails";
import { ProviderReviewsPage } from "./components/ProviderReviewsPage";
import { CalendarPage } from "./components/CalendarPage";
import { SetAvailabilityPage } from "./components/SetAvailabilityPage";
import { BlockTimePage } from "./components/BlockTimePage";
import { PayoutPage } from "./components/PayoutPage";
import { RequestPayoutPage } from "./components/RequestPayoutPage";
import { PayoutConfirmationPage } from "./components/PayoutConfirmationPage";
import { ProviderProfilePage } from "./components/ProviderProfilePage";
import { EditProfilePage } from "./components/EditProfilePage";
import { EditServicesPricingPage } from "./components/EditServicesPricingPage";
import { PortfolioManagementPage } from "./components/PortfolioManagementPage";
import { ProviderSettingsPage } from "./components/ProviderSettingsPage";
import { ProviderHelpCenterPage } from "./components/ProviderHelpCenterPage";
import { MessagesPage } from "./components/MessagesPage";
import { NotificationPreferencesPage } from "./components/NotificationPreferencesPage";
import { ProviderPerformanceInsightsPage } from "./components/ProviderPerformanceInsightsPage";
import { OnboardingPage } from "./components/OnboardingPage";
import { UnifiedBookingsPage } from "./components/UnifiedBookingsPage";
import { BookingDetailsPage } from "./components/BookingDetailsPage";
import { BookingRequestDetailsPage } from "./components/BookingRequestDetailsPage";
import { CounterOfferModalPage } from "./components/CounterOfferModalPage";
import { CancelBookingPage } from "./components/CancelBookingPage";
import { ProviderAnalyticsPage } from "./components/ProviderAnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/provider",
    Component: Layout,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "onboarding",
        Component: OnboardingPage,
      },
      {
        path: "bookings",
        Component: UnifiedBookingsPage,
      },
      {
        path: "booking-details/:id",
        Component: BookingDetailsPage,
      },
      {
        path: "request-details/:id",
        Component: BookingRequestDetailsPage,
      },
      {
        path: "counter-offer/:id",
        Component: CounterOfferModalPage,
      },
      {
        path: "cancel-booking/:id",
        Component: CancelBookingPage,
      },
      {
        path: "counter-offer",
        Component: CounterOfferPage,
      },
      {
        path: "earningsdashboard",
        Component: ProviderEarningsDashboard,
      },
      {
        path: "earningsdetails",
        Component: ProviderEarningsDetails,
      },
      {
        path: "reviews",
        Component: ProviderReviewsPage,
      },
      {
        path: "performanceinsights",
        Component: ProviderPerformanceInsightsPage,
      },
      {
        path: "analytics",
        Component: ProviderAnalyticsPage,
      },
      {
        path: "calendar",
        Component: CalendarPage,
      },
      {
        path: "availability",
        Component: SetAvailabilityPage,
      },
      {
        path: "block-time",
        Component: BlockTimePage,
      },
      {
        path: "payout",
        Component: PayoutPage,
      },
      {
        path: "request-payout",
        Component: RequestPayoutPage,
      },
      {
        path: "payout-confirmation",
        Component: PayoutConfirmationPage,
      },
      {
        path: "profile",
        Component: ProviderProfilePage,
      },
      {
        path: "edit-profile",
        Component: EditProfilePage,
      },
      {
        path: "edit-services",
        Component: EditServicesPricingPage,
      },
      {
        path: "portfolio",
        Component: PortfolioManagementPage,
      },
      {
        path: "settings",
        Component: ProviderSettingsPage,
      },
      {
        path: "help-center",
        Component: ProviderHelpCenterPage,
      },
      {
        path: "messages",
        Component: MessagesPage,
      },
      {
        path: "notification-preferences",
        Component: NotificationPreferencesPage,
      },
      {
        index: true,
        element: <Navigate to="/provider/dashboard" replace />,
      },
    ],
  },
]);