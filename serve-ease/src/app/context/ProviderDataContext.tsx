import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import {
  getProviderAvailability,
  getProviderProfile,
  getProviderServices,
  type ProviderProfileResponse,
  type ProviderServiceResponse,
} from "@/lib/api/provider-portal";

import { useAuth } from "../contexts/AuthContext";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  baseRate: string;
  priceUnit: string;
  estimatedDuration: string;
  isActive: boolean;
}

interface ProviderProfile {
  id?: string;
  averageRating?: number;
  businessName: string;
  bio: string;
  serviceAreas: string;
  totalReviews?: number;
  trustScore?: number;
  verificationStatus?: string;
  yearsExperience: string;
  languages: string[];
  facebook: string;
  instagram: string;
  website: string;
  coverPhotoUrl: string;
  profilePhotoUrl: string;
}

interface DaySchedule {
  available: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

interface ProviderData {
  blockedDates: string[];
  portfolioItems: PortfolioItem[];
  services: Service[];
  profile: ProviderProfile;
  availability: { [key: string]: DaySchedule };
}

interface ProviderDataContextType {
  isSyncing: boolean;
  providerData: ProviderData;
  setProviderData: (data: ProviderData) => void;
  blockedDates: string[];
  addBlockedDates: (dates: string[]) => void;
  removeBlockedDate: (date: string) => void;
  portfolioItems: PortfolioItem[];
  setPortfolioItems: (items: PortfolioItem[]) => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  profile: ProviderProfile;
  updateProfile: (updates: Partial<ProviderProfile>) => void;
}

const ProviderDataContext = createContext<ProviderDataContextType | undefined>(undefined);

const defaultProviderData: ProviderData = {
  blockedDates: ["2026-03-25", "2026-03-26"],
  portfolioItems: [
    {
      id: "1",
      title: "Modern Office Renovation",
      description: "Complete office deep cleaning and sanitization",
      category: "Commercial Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      featured: true,
    },
    {
      id: "2",
      title: "Residential Deep Cleaning",
      description: "3-bedroom house complete cleaning service",
      category: "Residential Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      featured: false,
    },
  ],
  services: [
    {
      id: "1",
      name: "House Cleaning",
      category: "Residential",
      description: "Standard house cleaning service including all rooms",
      baseRate: "500",
      priceUnit: "per hour",
      estimatedDuration: "3-4 hours",
      isActive: true,
    },
    {
      id: "2",
      name: "Deep Cleaning",
      category: "Residential",
      description: "Thorough deep cleaning with sanitization",
      baseRate: "800",
      priceUnit: "per hour",
      estimatedDuration: "4-6 hours",
      isActive: true,
    },
    {
      id: "3",
      name: "Office Cleaning",
      category: "Commercial",
      description: "Professional office cleaning service",
      baseRate: "1200",
      priceUnit: "per hour",
      estimatedDuration: "2-3 hours",
      isActive: true,
    },
  ],
  profile: {
    businessName: "Juan's Professional Cleaning",
    bio: "With over 8 years of professional cleaning experience, I take pride in delivering exceptional service to every client.",
    serviceAreas: "Metro Manila, Philippines",
    yearsExperience: "8",
    languages: ["English", "Filipino"],
    facebook: "",
    instagram: "",
    website: "",
    coverPhotoUrl:
      "https://images.unsplash.com/photo-1640963269654-3fe248c5fba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzM5MzU3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1770392988936-dc3d8581e0c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM4OTQ1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  availability: {
    Monday: {
      available: true,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Tuesday: {
      available: true,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Wednesday: {
      available: true,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Thursday: {
      available: true,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Friday: {
      available: true,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Saturday: {
      available: false,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    Sunday: {
      available: false,
      startTime: "08:00",
      endTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
  },
};

function toDisplayList(value: string[] | string | null | undefined) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

function mapProfileRecordToState(profile: ProviderProfileResponse): ProviderProfile {
  return {
    id: profile.user_id,
    averageRating: Number(profile.average_rating ?? 0),
    businessName: profile.business_name ?? defaultProviderData.profile.businessName,
    bio: profile.service_description ?? defaultProviderData.profile.bio,
    serviceAreas: defaultProviderData.profile.serviceAreas,
    totalReviews: Number(profile.total_reviews ?? 0),
    trustScore: Number(profile.trust_score ?? 0),
    verificationStatus: profile.verification_status ?? undefined,
    yearsExperience: defaultProviderData.profile.yearsExperience,
    languages: toDisplayList(undefined),
    facebook: "",
    instagram: "",
    website: "",
    coverPhotoUrl: defaultProviderData.profile.coverPhotoUrl,
    profilePhotoUrl: defaultProviderData.profile.profilePhotoUrl,
  };
}

function mapServicesToState(services: ProviderServiceResponse[]): Service[] {
  return services.map((service) => ({
    id: service.id,
    name: service.title ?? "Service",
    category: service.category_id ?? "General",
    description: service.description ?? "",
    baseRate: String(service.price ?? ""),
    priceUnit: "per service",
    estimatedDuration: "Flexible",
    isActive: true,
  }));
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function normalizeDayName(dayOfWeek?: string | null) {
  if (!dayOfWeek) {
    return null;
  }

  const normalized = dayOfWeek.trim().toLowerCase();
  const match = weekDays.find((day) => day.toLowerCase() === normalized);
  return match ?? null;
}

export function ProviderDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [providerData, setProviderData] = useState<ProviderData>(defaultProviderData);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncProviderProfile = async () => {
      if (!user?.id) {
        if (isMounted) {
          setProviderData(defaultProviderData);
          setIsSyncing(false);
        }
        return;
      }

      setIsSyncing(true);

      try {
        const [profile, services, availability] = await Promise.all([
          getProviderProfile(user.id),
          getProviderServices(),
          getProviderAvailability(user.id),
        ]);

        if (!isMounted) {
          return;
        }

        const updatedAvailability = { ...defaultProviderData.availability };

        for (const slot of availability.weeklySchedule ?? []) {
          const dayName = normalizeDayName(slot.day_of_week);

          if (!dayName) {
            continue;
          }

          updatedAvailability[dayName] = {
            available: !!slot.is_available,
            startTime: slot.start_time ?? defaultProviderData.availability[dayName].startTime,
            endTime: slot.end_time ?? defaultProviderData.availability[dayName].endTime,
            breakStart:
              slot.break_start ?? defaultProviderData.availability[dayName].breakStart,
            breakEnd: slot.break_end ?? defaultProviderData.availability[dayName].breakEnd,
          };
        }

        setProviderData((prev) => ({
          ...prev,
          profile: mapProfileRecordToState(profile),
          services: services.length ? mapServicesToState(services) : prev.services,
          blockedDates:
            availability.daysOff?.map((day) => day.off_date) ?? prev.blockedDates,
          availability: updatedAvailability,
        }));
      } catch (error) {
        console.error("Error fetching provider data:", error);
        setIsSyncing(false);
        return;
      }

      setIsSyncing(false);
    };

    syncProviderProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const addBlockedDates = (dates: string[]) => {
    setProviderData((prev) => ({
      ...prev,
      blockedDates: [...new Set([...prev.blockedDates, ...dates])],
    }));
  };

  const removeBlockedDate = (date: string) => {
    setProviderData((prev) => ({
      ...prev,
      blockedDates: prev.blockedDates.filter((d) => d !== date),
    }));
  };

  const updateProfile = (updates: Partial<ProviderProfile>) => {
    setProviderData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const contextValue = {
    isSyncing,
    providerData,
    setProviderData,
    blockedDates: providerData.blockedDates,
    addBlockedDates,
    removeBlockedDate,
    portfolioItems: providerData.portfolioItems,
    setPortfolioItems: (items: PortfolioItem[]) =>
      setProviderData((prev) => ({ ...prev, portfolioItems: items })),
    services: providerData.services,
    setServices: (services: Service[]) =>
      setProviderData((prev) => ({ ...prev, services: services })),
    profile: providerData.profile,
    updateProfile,
  };

  return (
    <ProviderDataContext.Provider value={contextValue}>
      {children}
    </ProviderDataContext.Provider>
  );
}

export function useProviderData() {
  const context = useContext(ProviderDataContext);
  if (context === undefined) {
    throw new Error("useProviderData must be used within a ProviderDataProvider");
  }
  return context;
}
