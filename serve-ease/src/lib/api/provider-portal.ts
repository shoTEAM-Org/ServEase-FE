"use client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

const ACCESS_TOKEN_KEY = "serveease_provider_access_token";
const REFRESH_TOKEN_KEY = "serveease_provider_refresh_token";
const USER_KEY = "serveease_provider_user";

export type PortalUser = {
  contact_number?: string | null;
  email: string;
  full_name?: string | null;
  id: string;
  role?: string | null;
  status?: string | null;
};

export type AuthSession = {
  access_token: string;
  refresh_token?: string | null;
  user: PortalUser;
};

export type ProviderProfileResponse = {
  average_rating?: number | null;
  business_name?: string | null;
  provider_documents?: Array<{
    document_file_path?: string | null;
    document_id?: string | null;
    document_type?: string | null;
    status?: string | null;
    view_url?: string | null;
  }>;
  service_description?: string | null;
  total_reviews?: number | null;
  trust_score?: number | null;
  user_id: string;
  verification_status?: string | null;
};

export type ProviderServiceResponse = {
  category_id?: string | null;
  description?: string | null;
  id: string;
  price?: number | string | null;
  provider_id?: string | null;
  title?: string | null;
};

export type ProviderAvailabilityResponse = {
  daysOff: Array<{
    off_date: string;
    reason?: string | null;
    user_id: string;
  }>;
  weeklySchedule: Array<{
    break_end?: string | null;
    break_start?: string | null;
    day_of_week?: string | null;
    end_time?: string | null;
    is_available?: boolean | null;
    start_time?: string | null;
    user_id: string;
  }>;
};

export type ProviderBookingResponse = {
  booking_reference?: string | null;
  created_at?: string | null;
  customer_contact?: string | null;
  customer_id?: string | null;
  customer_name?: string | null;
  hourly_rate?: number | null;
  id: string;
  provider_id?: string | null;
  scheduled_at?: string | null;
  service_address?: string | null;
  service_id?: string | null;
  service_title?: string | null;
  status?: string | null;
  total_amount?: number | null;
};

export type ProviderDashboardResponse = {
  new_job_requests: number;
  total_earnings: number;
};

export type ProviderEarningsSummaryResponse = {
  completed_payments: number;
  monthly_earnings: number;
  net_earnings: number;
  platform_fees: number;
  total_earnings: number;
};

export type ProviderPaymentHistoryResponse = {
  amount?: number | null;
  booking_id?: string | null;
  booking_reference?: string | null;
  created_at?: string | null;
  customer_name?: string | null;
  id?: string | null;
  method?: string | null;
  net_earnings?: number | null;
  platform_fee?: number | null;
  scheduled_at?: string | null;
  service_title?: string | null;
  status?: string | null;
};

export type ChatConversationResponse = {
  bookingId: string;
  bookingRef?: string | null;
  conversationId?: string | null;
  id: string;
  lastMessage: string;
  lastMessageTime?: string | null;
  otherPartyId?: string | null;
  otherPartyName: string;
  otherPartyPhone?: string | null;
  serviceName?: string | null;
  unreadCount: number;
};

export type ChatMessageResponse = {
  createdAt: string;
  deliveryStatus?: string | null;
  id: string;
  sender: "provider" | "customer";
  text: string;
};

export type ChatThreadResponse = {
  bookingId: string;
  conversationId?: string | null;
  id: string;
  messages: ChatMessageResponse[];
  otherPartyId?: string | null;
  otherPartyName: string;
  otherPartyPhone?: string | null;
  serviceName?: string | null;
};

function getUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);

  if (!response.ok) {
    const message =
      (data as { message?: string | string[] })?.message ??
      `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data;
}

async function apiRequest<T>(path: string, init: RequestInit = {}, auth = true) {
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getStoredAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(getUrl(path), {
    ...init,
    headers,
  });

  return parseResponse<T>(response);
}

export function persistAuthSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, session.access_token);

  if (session.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
  }

  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearStoredAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as PortalUser;
  } catch {
    return null;
  }
}

export async function loginWithBackend(email: string, password: string) {
  return apiRequest<AuthSession>(
    "/api/auth/v1/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    false
  );
}

export async function fetchCurrentUser() {
  const response = await apiRequest<{ user: PortalUser }>("/api/auth/v1/me");

  return response.user;
}

export async function logoutFromBackend() {
  return apiRequest<{ status: string }>(
    "/api/auth/v1/logout",
    {
      method: "POST",
    },
    true
  );
}

export async function refreshBackendSession() {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  return apiRequest<AuthSession>(
    "/api/auth/v1/refresh",
    {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
    false
  );
}

export async function getProviderProfile(userId: string) {
  const response = await apiRequest<{ data: ProviderProfileResponse }>(`/api/provider/v1/${userId}`);

  return response.data;
}

export async function getProviderDashboard(providerId: string) {
  return apiRequest<ProviderDashboardResponse>(`/api/provider/v1/dashboard/${providerId}`);
}

export async function getProviderBookings() {
  const response = await apiRequest<{ bookings: ProviderBookingResponse[] }>("/api/provider/v1/bookings");

  return response.bookings ?? [];
}

export async function updateProviderBookingStatus(bookingId: string, status: string) {
  return apiRequest<{ status: string }>(`/api/provider/v1/booking/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function getProviderServices() {
  const response = await apiRequest<{ services: ProviderServiceResponse[] }>("/api/provider/v1/my-services");

  return response.services ?? [];
}

export async function getProviderAvailability(userId: string) {
  return apiRequest<ProviderAvailabilityResponse>(`/api/provider/v1/${userId}/availability`, {}, false);
}

export async function getProviderEarningsSummary() {
  return apiRequest<ProviderEarningsSummaryResponse>("/api/payments/v1/provider/earnings-summary");
}

export async function getProviderPaymentHistory() {
  const response = await apiRequest<{ payments: ProviderPaymentHistoryResponse[] }>(
    "/api/payments/v1/provider/history"
  );

  return response.payments ?? [];
}

export async function getProviderConversations() {
  return apiRequest<ChatConversationResponse[]>("/api/chat/v1/conversations?role=provider");
}

export async function getConversationMessages(bookingId: string) {
  return apiRequest<ChatThreadResponse>(`/api/chat/v1/conversations/${bookingId}/messages`);
}

export async function sendConversationMessage(bookingId: string, text: string) {
  return apiRequest<{ created_at: string; id: string }>(
    `/api/chat/v1/conversations/${bookingId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ text }),
    }
  );
}
