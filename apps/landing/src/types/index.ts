// src/types/index.ts

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

export interface IServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface IBusinessInfo {
  businessName: string;
  category: string;
  description: string;
  address?: IAddress;
  isOnlineBusiness: boolean;
  isPhysicalLocation: boolean;
  onlinePresence?: string;
}

export interface IWorkingHours {
  day: string;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

export interface IContactPerson {
  fullName: string;
  role: string;
  phoneNumber: string;
  emailAddress: string;
  idType: 'Government ID' | 'Passport' | 'National ID' | "Driver's License";
  idNumber?: string;
  idExpiryDate?: string;
  idImageUri?: string;
}

export interface IServiceProvider {
  id: string;
  businessInfo: IBusinessInfo;
  services: string;
  workingHours: IWorkingHours[];
  contactInfo: {
    phoneNumber: string;
    emailAddress: string;
    website?: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  contactPerson: IContactPerson;
  businessPermitUri?: string;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface IBooking {
  id: string;
  serviceCategory: string;
  serviceProvider: IServiceProvider;
  bookingDate: Date;
  timeSlot: string;
  location: IAddress;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  profileImage?: string;
  address?: IAddress;
  bookings: IBooking[];
  savedProviders: string[];
  userType: 'customer' | 'provider';
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
}

export interface IStepProgress {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  isStepCompleted: (step: number) => boolean;
}
