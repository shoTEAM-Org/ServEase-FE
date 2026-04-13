"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { createContext, useContext } from "react";

type RouteContextValue = {
  outlet: ReactNode;
  params: Record<string, string>;
  pathname: string;
};

const RouteContext = createContext<RouteContextValue>({
  outlet: null,
  params: {},
  pathname: "/",
});

export function RouteContextProvider({
  children,
  outlet,
  params,
  pathname,
}: {
  children: ReactNode;
  outlet: ReactNode;
  params: Record<string, string>;
  pathname: string;
}) {
  return (
    <RouteContext.Provider value={{ outlet, params, pathname }}>
      {children}
    </RouteContext.Provider>
  );
}

export function Outlet() {
  return <>{useContext(RouteContext).outlet}</>;
}

export function useLocation() {
  const context = useContext(RouteContext);
  const pathname = usePathname() ?? context.pathname;

  return { pathname };
}

export function useParams<TParams extends Record<string, string>>() {
  return useContext(RouteContext).params as TParams;
}

export function useNavigate() {
  const router = useRouter();

  return (to: number | string) => {
    if (typeof to === "number") {
      if (to < 0) {
        router.back();
        return;
      }

      if (to > 0) {
        router.forward();
      }

      return;
    }

    router.push(to);
  };
}

type LinkProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
  to: string;
};

export function Link({ children, className, onClick, style, to }: LinkProps) {
  return (
    <NextLink className={className} href={to} onClick={onClick} style={style}>
      {children}
    </NextLink>
  );
}
