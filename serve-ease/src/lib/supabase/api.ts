"use client";

import type { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/supabaseClient";

const providerProfileTableCandidates = [
  process.env.NEXT_PUBLIC_SUPABASE_PROVIDER_PROFILES_TABLE,
  "provider_profiles",
  "profiles",
  "provider_profile",
  "providers",
].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);

const bookingsTableCandidates = [
  process.env.NEXT_PUBLIC_SUPABASE_BOOKINGS_TABLE,
  "bookings",
].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);

const providerUserIdColumn = process.env.NEXT_PUBLIC_SUPABASE_PROVIDER_USER_ID_COLUMN ?? "user_id";

export type ProviderProfileRecord = {
  id: string;
  user_id?: string | null;
  business_name?: string | null;
  bio?: string | null;
  service_areas?: string[] | string | null;
  years_experience?: number | string | null;
  languages?: string[] | string | null;
  facebook?: string | null;
  instagram?: string | null;
  website?: string | null;
  cover_photo_url?: string | null;
  profile_photo_url?: string | null;
  [key: string]: unknown;
};

export type BookingRecord = {
  id: string;
  provider_id?: string | null;
  user_id?: string | null;
  status?: string | null;
  [key: string]: unknown;
};

type ApiResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

function isMissingRelationError(error: PostgrestError | null) {
  if (!error) {
    return false;
  }

  return (
    error.code === "PGRST205" ||
    error.message.includes("schema cache") ||
    error.message.includes("Could not find the table")
  );
}

async function queryFirstAvailableTable<T>(
  tableNames: string[],
  queryFactory: (tableName: string) => Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<{ data: T | null; error: PostgrestError | null; tableName: string | null }> {
  let lastError: PostgrestError | null = null;

  for (const tableName of tableNames) {
    const result = await queryFactory(tableName);

    if (!result.error) {
      return {
        data: result.data,
        error: null,
        tableName,
      };
    }

    if (!isMissingRelationError(result.error)) {
      return {
        data: result.data,
        error: result.error,
        tableName,
      };
    }

    lastError = result.error;
  }

  return {
    data: null,
    error: lastError,
    tableName: null,
  };
}

export async function fetchProviders(): Promise<ProviderProfileRecord[]> {
  const { data, error } = await queryFirstAvailableTable<ProviderProfileRecord[]>(
    providerProfileTableCandidates,
    async (tableName) => {
      const { data: rows, error } = await supabase.from(tableName).select("*");

      return {
        data: (rows ?? []) as ProviderProfileRecord[],
        error,
      };
    }
  );

  if (error) {
    console.error("Error fetching providers:", error.message);
    return [];
  }

  return (data ?? []) as ProviderProfileRecord[];
}

export async function fetchProviderProfile(userId: string): Promise<ApiResult<ProviderProfileRecord>> {
  const { data, error } = await queryFirstAvailableTable<ProviderProfileRecord>(
    providerProfileTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase
        .from(tableName)
        .select("*")
        .eq(providerUserIdColumn, userId)
        .maybeSingle();

      return {
        data: (row as ProviderProfileRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function createProviderProfile(
  profile: Partial<ProviderProfileRecord>
): Promise<ApiResult<ProviderProfileRecord>> {
  const { data, error } = await queryFirstAvailableTable<ProviderProfileRecord>(
    providerProfileTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase
        .from(tableName)
        .insert(profile)
        .select()
        .single();

      return {
        data: (row as ProviderProfileRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function updateProviderProfile(
  providerId: string,
  updatedData: Partial<ProviderProfileRecord>
): Promise<ApiResult<ProviderProfileRecord>> {
  const { data, error } = await queryFirstAvailableTable<ProviderProfileRecord>(
    providerProfileTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase
        .from(tableName)
        .update(updatedData)
        .eq("id", providerId)
        .select()
        .single();

      return {
        data: (row as ProviderProfileRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function upsertProviderProfile(
  profile: Partial<ProviderProfileRecord>
): Promise<ApiResult<ProviderProfileRecord>> {
  const { data, error } = await queryFirstAvailableTable<ProviderProfileRecord>(
    providerProfileTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase
        .from(tableName)
        .upsert(profile, { onConflict: "id" })
        .select()
        .single();

      return {
        data: (row as ProviderProfileRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function fetchBookings(providerId?: string): Promise<BookingRecord[]> {
  const { data, error } = await queryFirstAvailableTable<BookingRecord[]>(
    bookingsTableCandidates,
    async (tableName) => {
      let query = supabase.from(tableName).select("*");

      if (providerId) {
        query = query.eq("provider_id", providerId);
      }

      const { data: rows, error } = await query.order("created_at", { ascending: false });

      return {
        data: (rows ?? []) as BookingRecord[],
        error,
      };
    }
  );

  if (error) {
    console.error("Error fetching bookings:", error.message);
    return [];
  }

  return (data ?? []) as BookingRecord[];
}

export async function createBooking(
  bookingData: Record<string, unknown>
): Promise<ApiResult<BookingRecord>> {
  const { data, error } = await queryFirstAvailableTable<BookingRecord>(
    bookingsTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase.from(tableName).insert(bookingData).select().single();

      return {
        data: (row as BookingRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function updateBooking(
  bookingId: string,
  updatedData: Record<string, unknown>
): Promise<ApiResult<BookingRecord>> {
  const { data, error } = await queryFirstAvailableTable<BookingRecord>(
    bookingsTableCandidates,
    async (tableName) => {
      const { data: row, error } = await supabase
        .from(tableName)
        .update(updatedData)
        .eq("id", bookingId)
        .select()
        .single();

      return {
        data: (row as BookingRecord | null) ?? null,
        error,
      };
    }
  );

  return {
    data: data ?? null,
    error,
  };
}

export async function deleteBooking(bookingId: string): Promise<{ error: PostgrestError | null }> {
  const { error } = await queryFirstAvailableTable<null>(
    bookingsTableCandidates,
    async (tableName) => {
      const { error } = await supabase.from(tableName).delete().eq("id", bookingId);

      return {
        data: null,
        error,
      };
    }
  );

  return { error };
}
