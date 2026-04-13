"use client";

import { usePathname } from "next/navigation";

import App from "./App";

export function ClientPage() {
  const pathname = usePathname() ?? "/";

  return <App pathname={pathname} />;
}
