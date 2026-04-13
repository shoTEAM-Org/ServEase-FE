"use client";

import { usePathname } from "next/navigation";

import { RouteRenderer } from "./route-renderer";

export function ClientPage() {
  const pathname = usePathname() ?? "/";

  return <RouteRenderer pathname={pathname} />;
}
