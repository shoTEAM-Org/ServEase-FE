"use client";

const AUTH_STORAGE_KEY = "servease_admin_auth";
const DEFAULT_API_BASE_URL = "http://localhost:5000";

type StoredAuth = {
  accessToken: string;
  refreshToken?: string;
};

function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

function getStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export async function fetchAdminJson<T>(
  path: string,
  options: { method?: string; body?: string } = {}
): Promise<T> {
  const storedAuth = getStoredAuth();
  if (!storedAuth?.accessToken) {
    throw new Error("No admin session found.");
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${storedAuth.accessToken}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
    ...(options.body ? { body: options.body } : {}),
  });

  const payload = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    error?: string;
  };

  if (!response.ok) {
    const errorMessage =
      typeof payload.message === "string"
        ? payload.message
        : typeof payload.error === "string"
          ? payload.error
          : `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return payload;
}
