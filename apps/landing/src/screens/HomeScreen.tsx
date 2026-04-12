// src/screens/HomeScreen.tsx - Example Home Screen using the design system

import React, { useState } from 'react';
import { colors, spacing } from '../theme';
import {
  AppHeader,
  PrimaryButton,
  CategoryCard,
  ServiceProviderCard,
} from '../components';
import { IServiceCategory, IServiceProvider } from '../types';

// Mock data
const MOCK_CATEGORIES: IServiceCategory[] = [
  {
    id: '1',
    name: 'Home Maintenance & Repair',
    description: 'Fix, install, or maintain your home',
    icon: '🔧',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '2',
    name: 'Beauty, Wellness & Personal Care',
    description: 'Professional beauty and wellness services',
    icon: '💅',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '3',
    name: 'Education & Professional Services',
    description: 'Tutoring and professional development',
    icon: '📚',
    image: 'https://via.placeholder.com/300x200',
  },
];

const MOCK_PROVIDERS: IServiceProvider[] = [
  {
    id: '1',
    businessInfo: {
      businessName: 'HandyFix Home Services',
      category: 'Home Maintenance & Repair',
      description: 'Professional home maintenance and repair services for over 10 years',
      address: {
        street: '123 Main St',
        city: 'Manila',
        state: 'Metro Manila',
        zipCode: '1000',
        country: 'Philippines',
      },
      isOnlineBusiness: false,
      isPhysicalLocation: true,
      onlinePresence: 'Available on Facebook and Instagram',
    },
    services: 'Plumbing, Electrical, Carpentry, General Maintenance',
    workingHours: [],
    contactInfo: {
      phoneNumber: '+63 917 123 4567',
      emailAddress: 'contact@handyfix.com',
      website: 'https://handyfix.com',
    },
    socialMedia: {
      facebook: 'https://facebook.com/handyfix',
      instagram: 'https://instagram.com/handyfix',
    },
    contactPerson: {
      fullName: 'John Doe',
      role: 'Manager',
      phoneNumber: '+63 917 987 6543',
      emailAddress: 'john@handyfix.com',
      idType: 'Government ID',
    },
    isVerified: true,
    rating: 4.8,
    reviewCount: 156,
    createdAt: new Date(),
  },
];

export const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <AppHeader
        title="Welcome to ServEase"
        subtitle="Find trusted services near you"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div
          className="rounded-xl text-white p-8 mb-8"
          style={{
            backgroundColor: colors.primary,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 className="text-3xl font-bold mb-3">Book Trusted Services Anytime</h2>
          <p className="text-lg mb-6 opacity-90">
            Connect with verified professionals for all your service needs
          </p>
          <PrimaryButton
            title="Browse Services"
            onPress={() => console.log('Browse')}
            size="large"
            fullWidth={false}
          />
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Popular Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={setSelectedCategory}
                size="medium"
              />
            ))}
          </div>
        </div>

        {/* Top Providers */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Top Rated Providers
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MOCK_PROVIDERS.map((provider) => (
              <ServiceProviderCard
                key={provider.id}
                provider={provider}
                onPress={() => console.log('View provider')}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="rounded-xl text-white p-8 text-center"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-2xl font-bold mb-3">Become a Service Provider</h3>
          <p className="mb-6 opacity-90">
            Grow your business and reach more customers on ServEase
          </p>
          <PrimaryButton
            title="Apply Now"
            onPress={() => console.log('Apply')}
            size="medium"
            fullWidth={false}
          />
        </div>
      </div>
    </div>
  );
};
