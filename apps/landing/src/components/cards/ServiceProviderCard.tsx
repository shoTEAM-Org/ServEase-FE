// src/components/cards/ServiceProviderCard.tsx
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { colors, spacing, shadows, borderRadius } from '../../theme';
import { IServiceProvider } from '../../types';

interface ServiceProviderCardProps {
  provider: IServiceProvider;
  onPress: (providerId: string) => void;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
  onPress,
}) => {
  return (
    <div
      onClick={() => onPress(provider.id)}
      className="rounded-lg overflow-hidden bg-white cursor-pointer transition-all hover:shadow-lg"
      style={shadows.md}
    >
      {/* Provider Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">
              {provider.businessInfo.businessName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{provider.businessInfo.category}</p>
          </div>
          {provider.isVerified && (
            <div
              className="px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: colors.primary }}
            >
              Verified
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(provider.rating || 0) ? colors.primary : '#E0E0E0'}
                color={i < Math.floor(provider.rating || 0) ? colors.primary : '#E0E0E0'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {provider.rating?.toFixed(1)} ({provider.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Provider Info */}
      <div className="p-4">
        {provider.businessInfo.address && (
          <div className="flex items-start gap-2 mb-3">
            <MapPin size={16} color={colors.primary} className="mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              {provider.businessInfo.address.city}, {provider.businessInfo.address.state}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-700 line-clamp-2 mb-4">
          {provider.businessInfo.description}
        </p>

        {/* Services */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-600 font-medium">View Profile</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <span className="text-white text-sm">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
