"use client";

import { AuthProvider } from "./contexts/AuthContext";
import { RouteRenderer } from "./route-renderer";

// ServEase Admin Dashboard - Main Entry Point
export default function App({ pathname }: { pathname: string }) {
  return (
    <AuthProvider>
      <RouteRenderer pathname={pathname} />
    </AuthProvider>
  );
}
