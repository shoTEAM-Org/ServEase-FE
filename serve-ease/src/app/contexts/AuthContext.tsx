"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  clearStoredAuthSession,
  fetchCurrentUser,
  getStoredAccessToken,
  getStoredUser,
  loginWithBackend,
  logoutFromBackend,
  persistAuthSession,
  refreshBackendSession,
  type PortalUser,
} from "@/lib/api/provider-portal";

type AuthResponse = {
  error?: string;
  success: boolean;
};

type AuthContextType = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  user: PortalUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const storedToken = getStoredAccessToken();
      const storedUser = getStoredUser();

      if (!storedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      if (storedUser && isMounted) {
        setUser(storedUser);
      }

      try {
        const currentUser = await fetchCurrentUser();

        if (!isMounted) {
          return;
        }

        setAccessToken(storedToken);
        setUser(currentUser);
      } catch {
        try {
          const refreshedSession = await refreshBackendSession();

          if (!isMounted) {
            return;
          }

          persistAuthSession(refreshedSession);
          setAccessToken(refreshedSession.access_token);
          setUser(refreshedSession.user);
        } catch {
          clearStoredAuthSession();

          if (isMounted) {
            setAccessToken(null);
            setUser(null);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const session = await loginWithBackend(email, password);
      persistAuthSession(session);
      setAccessToken(session.access_token);
      setUser(session.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unable to sign in.",
      };
    }
  };

  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    void email;
    void password;
    return {
      success: false,
      error: "Provider signup should use the backend onboarding endpoint.",
    };
  };

  const logout = async () => {
    try {
      await logoutFromBackend();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      clearStoredAuthSession();
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoading,
        isAuthenticated: !!accessToken && !!user,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
