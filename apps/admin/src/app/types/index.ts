// Core types for the ServEase Admin Application

export type AdminRole = "Super Admin" | "Finance Admin" | "Support Admin" | "Operations Admin" | "Marketplace Admin";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions?: string[];
  lastLogin?: string;
  status: "Active" | "Inactive";
}

export type ProviderStatus = "Active" | "Inactive" | "Suspended";

export interface ServiceProvider {
  id: string;
  businessName: string;
  categoryId: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: ProviderStatus;
  rating: number;
  totalBookings: number;
  completedBookings: number;
  completionRate: number;
  joinedDate: string;
  location: string;
  totalRevenue: number;
  totalEarnings: number;
}

export type BookingStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  categoryId: string;
  serviceDescription: string;
  scheduledDate: string;
  completedDate?: string;
  amount: number;
  commissionAmount: number;
  providerEarnings: number;
  status: BookingStatus;
  paymentStatus: "Pending" | "Paid" | "Refunded" | "Failed";
  paymentMethod: "Credit Card" | "Debit Card";
  location: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  memberSince: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  commissionRate: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeProviders: number;
  activeCustomers: number;
  completionRate: number;
  avgBookingValue: number;
}
