"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { createContext, useContext, useEffect } from "react";

type NavigateOptions = {
  replace?: boolean;
};

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

  return (to: number | string, options?: NavigateOptions) => {
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

    if (options?.replace) {
      router.replace(to);
      return;
    }

    router.push(to);
  };
}

type LinkProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  replace?: boolean;
  style?: CSSProperties;
  title?: string;
  to: string;
};

export function Link({ children, className, onClick, replace, style, title, to }: LinkProps) {
  return (
    <NextLink
      className={className}
      href={to}
      onClick={onClick}
      replace={replace}
      style={style}
      title={title}
    >
      {children}
    </NextLink>
  );
}

type NavLinkClassNameArg = {
  isActive: boolean;
};

type NavLinkProps = {
  children: ReactNode;
  className?: string | ((args: NavLinkClassNameArg) => string);
  end?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  replace?: boolean;
  style?: CSSProperties;
  title?: string;
  to: string;
};

function normalizePath(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function NavLink({
  children,
  className,
  end,
  onClick,
  replace,
  style,
  title,
  to,
}: NavLinkProps) {
  const pathname = normalizePath(usePathname() ?? "/");
  const target = normalizePath(to);
  const isActive = end ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink
      className={resolvedClassName}
      href={to}
      onClick={onClick}
      replace={replace}
      style={style}
      title={title}
    >
      {children}
    </NextLink>
  );
}

export function Navigate({ replace, to }: { replace?: boolean; to: string }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
      return;
    }

    router.push(to);
  }, [replace, router, to]);

  return null;
}
