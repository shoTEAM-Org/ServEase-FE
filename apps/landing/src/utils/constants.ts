// src/utils/constants.ts

export const ServiceCategories = {
  HOME_MAINTENANCE: 'Home Maintenance & Repair',
  BEAUTY_WELLNESS: 'Beauty, Wellness & Personal Care',
  EDUCATION_PROFESSIONAL: 'Education & Professional Services',
  DOMESTIC_CLEANING: 'Domestic & Cleaning Services',
  PET_SERVICES: 'Pet Services',
  EVENTS_ENTERTAINMENT: 'Events & Entertainment',
  AUTOMOTIVE_TECH: 'Automotive & Tech Support',
} as const;

export const UserTypes = {
  CUSTOMER: 'customer',
  PROVIDER: 'provider',
} as const;

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PaymentStatus = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const;

export const IDTypes = {
  GOVERNMENT_ID: 'Government ID',
  PASSPORT: 'Passport',
  NATIONAL_ID: 'National ID',
  DRIVERS_LICENSE: "Driver's License",
} as const;
