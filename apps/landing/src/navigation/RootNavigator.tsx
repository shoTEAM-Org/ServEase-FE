// src/navigation/RootNavigator.tsx - Main navigation structure

import React from 'react';
import { IUser } from '../types';

interface RootNavigatorProps {
  user: IUser | null;
  isLoading: boolean;
}

/**
 * RootNavigator Component
 * 
 * This component is the entry point for the app navigation.
 * It conditionally renders either the Auth Navigator (for unauthenticated users)
 * or the App Navigator (for authenticated users).
 * 
 * Pattern:
 * - Check if user is authenticated
 * - If no user: show AuthNavigator (login/signup screens)
 * - If user exists: show AppNavigator (app screens)
 * - Show loading screen while checking auth state
 */
export const RootNavigator: React.FC<RootNavigatorProps> = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-green-500 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthNavigator />;
  }

  return <AppNavigator user={user} />;
};

/**
 * AuthNavigator Component
 * 
 * Navigation stack for unauthenticated users.
 * Screens available:
 * - Login: User authentication
 * - Signup: New user registration
 * - ForgotPassword: Password recovery
 * - ProviderSignup: Provider-specific registration
 */
const AuthNavigator: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ServEase</h1>
        <p className="text-gray-600 mb-8">Book Trusted Services Anytime</p>
        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
            Sign In
          </button>
          <button className="w-full px-6 py-3 bg-white text-green-500 border-2 border-green-500 rounded-lg font-semibold hover:bg-green-50">
            Sign Up
          </button>
        </div>
        <p className="text-gray-600 text-sm mt-6">
          Are you a service provider?{' '}
          <span className="text-green-500 font-semibold cursor-pointer hover:underline">
            Apply here
          </span>
        </p>
      </div>
    </div>
  </div>
);

/**
 * AppNavigator Component
 * 
 * Navigation structure for authenticated users.
 * 
 * Main Tabs:
 * 1. Home Tab
 *    - HomeScreen (main dashboard)
 *    - ServiceCategoriesScreen (all services)
 *    - ProviderProfileScreen (view provider)
 * 
 * 2. Bookings Tab
 *    - BookingHistoryScreen (past/upcoming)
 *    - BookingDetailScreen (view booking)
 * 
 * 3. Profile Tab
 *    - UserProfileScreen (account settings)
 *    - SavedProvidersScreen (saved list)
 * 
 * Modal Screens (overlay):
 * - BookingScreen (create booking)
 * - ChatScreen (contact provider)
 * - ReviewScreen (rate service)
 */
interface AppNavigatorProps {
  user: IUser;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ user }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b border-gray-200 flex justify-around">
        <button className="flex-1 py-4 text-center border-b-2 border-green-500 text-green-500 font-semibold">
          Home
        </button>
        <button className="flex-1 py-4 text-center text-gray-600 font-semibold hover:text-green-500">
          Bookings
        </button>
        <button className="flex-1 py-4 text-center text-gray-600 font-semibold hover:text-green-500">
          Profile
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome, {user?.name || 'User'}!
        </h2>
        <p className="text-gray-600">
          Navigate through the tabs above to access different sections of the app.
        </p>
      </div>
    </div>
  </div>
);

// Navigation Types
export interface NavigationParams {
  Home: undefined;
  ServiceCategories: undefined;
  ProviderProfile: { providerId: string };
  Bookings: undefined;
  BookingDetail: { bookingId: string };
  Profile: undefined;
  EditProfile: undefined;
  SavedProviders: undefined;
  Booking: { categoryId: string; providerId?: string };
  Chat: { providerId: string };
  Review: { bookingId: string };
}

/**
 * Navigation Patterns Used
 * 
 * 1. Conditional Navigation
 *    - Check auth state before rendering
 *    - Redirect to login if session expires
 * 
 * 2. Block Navigation
 *    - Prevent navigation in forms if dirty
 *    - Confirm before leaving
 * 
 * 3. Deep Linking
 *    - Handle deep links from notifications
 *    - Open specific screens from external URLs
 * 
 * 4. Modal Navigation
 *    - Overlay modals on top of current screen
 *    - Use for: booking, chat, reviews
 * 
 * 5. Tab Navigation
 *    - Persistent bottom tab bar
 *    - Preserve state when switching tabs
 * 
 * Example: Navigate to provider profile
 * ```typescript
 * navigation.navigate('ProviderProfile', { providerId: '123' });
 * ```
 * 
 * Example: Open booking modal
 * ```typescript
 * navigation.navigate('Booking', { categoryId: '456' });
 * ```
 */

export default RootNavigator;
