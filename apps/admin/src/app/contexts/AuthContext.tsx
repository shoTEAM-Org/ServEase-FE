"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  sessionExpired: boolean;
  clearSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for testing
const DEMO_ADMIN = {
  email: "juan@servease.ph",
  password: "admin123",
  admin: {
    id: "ADM-001",
    name: "Juan Dela Cruz",
    email: "juan@servease.ph",
    role: "Super Admin",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("servease_admin");
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        localStorage.removeItem("servease_admin");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo validation
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      setAdmin(DEMO_ADMIN.admin);
      localStorage.setItem("servease_admin", JSON.stringify(DEMO_ADMIN.admin));
      setSessionExpired(false);
      return { success: true };
    }

    // Check for other demo scenarios
    if (email === "inactive@servease.ph") {
      return {
        success: false,
        error: "This admin account is inactive. Contact a Super Admin.",
      };
    }

    if (email === "user@servease.ph") {
      return {
        success: false,
        error: "Access restricted. This portal is for authorized admins only.",
      };
    }

    return {
      success: false,
      error: "Incorrect email or password.",
    };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("servease_admin");
  };

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
        sessionExpired,
        clearSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
