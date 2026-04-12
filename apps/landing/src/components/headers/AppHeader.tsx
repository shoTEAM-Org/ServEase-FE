// src/components/headers/AppHeader.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { colors, spacing } from '../../theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        {showBackButton && (
          <button
            onClick={onBackPress}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} color={colors.text.primary} />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      {rightIcon && (
        <button
          onClick={onRightIconPress}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
};
