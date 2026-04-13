"use client";

import type { AuthError, Session, User } from "@supabase/supabase-js";

import supabase from "@/supabaseClient";

export type AuthResult = {
  error: AuthError | null;
  session: Session | null;
  user: User | null;
};

export async function signUpUser(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return {
    error,
    session: data.session ?? null,
    user: data.user ?? null,
  };
}

export async function signInUser(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    error,
    session: data.session,
    user: data.user,
  };
}

export async function signOutUser() {
  return supabase.auth.signOut();
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

export async function getAuthorizationHeaders() {
  const session = await getCurrentSession();

  return session?.access_token
    ? {
        Authorization: `Bearer ${session.access_token}`,
      }
    : undefined;
}

export async function fetchWithSupabaseAuth(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const authHeaders = await getAuthorizationHeaders();
  const headers = new Headers(init.headers);

  if (authHeaders?.Authorization) {
    headers.set("Authorization", authHeaders.Authorization);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
