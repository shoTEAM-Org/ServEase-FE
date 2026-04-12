// src/screens/ServiceCategoriesScreen.tsx - Service categories with filtering and search

import React, { useState, useMemo } from 'react';
import { colors, spacing, typography } from '../theme';
import { AppHeader, CategoryCard, PrimaryButton, SecondaryButton, InputField } from '../components';
import { IServiceCategory } from '../types';

const ALL_CATEGORIES: IServiceCategory[] = [
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
  {
    id: '4',
    name: 'Pet Care Services',
    description: 'Complete care for your beloved pets',
    icon: '🐕',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '5',
    name: 'Cleaning & Laundry',
    description: 'Professional cleaning and laundry services',
    icon: '🧹',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '6',
    name: 'Delivery & Moving',
    description: 'Quick and reliable delivery services',
    icon: '🚚',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '7',
    name: 'Event Planning & Services',
    description: 'Make your events memorable',
    icon: '🎉',
    image: 'https://via.placeholder.com/300x200',
  },
];

export const ServiceCategoriesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'name' | 'popularity'>('name');

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = ALL_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Simulate popularity sorting
      filtered.sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [searchQuery, selectedSort]);

  const handleCategorySelect = (categoryId: string) => {
    console.log('Selected category:', categoryId);
    // Navigate to provider list screen with category filter
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <AppHeader
        title="Service Categories"
        subtitle="Choose a service category to get started"
        showBackButton
        onBackPress={() => console.log('Back')}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Search Section */}
        <div className="mb-8">
          <InputField
            label="Search Services"
            placeholder="Search for a service..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon="🔍"
          />
        </div>

        {/* Sorting Options */}
        <div className="flex gap-4 mb-8">
          <SecondaryButton
            title="Sort by Name"
            onPress={() => setSelectedSort('name')}
            size="small"
          />
          <SecondaryButton
            title="Most Popular"
            onPress={() => setSelectedSort('popularity')}
            size="small"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: colors.textSecondary }}>
            Showing {filteredCategories.length} of {ALL_CATEGORIES.length} services
          </p>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCategorySelect(category.id);
                  }
                }}
                className="cursor-pointer transform transition-transform hover:scale-105"
              >
                <CategoryCard
                  category={category}
                  onPress={() => handleCategorySelect(category.id)}
                  size="large"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p
              className="text-lg mb-6"
              style={{ color: colors.textSecondary }}
            >
              No services found matching "{searchQuery}"
            </p>
            <SecondaryButton
              title="Clear Search"
              onPress={() => setSearchQuery('')}
              size="medium"
            />
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4" style={{ color: colors.textSecondary }}>
            Can't find what you're looking for?
          </p>
          <PrimaryButton
            title="Request a New Service"
            onPress={() => console.log('Request service')}
            size="medium"
            fullWidth={false}
          />
        </div>
      </div>
    </div>
  );
};

// Export for use in navigation
export default ServiceCategoriesScreen;
