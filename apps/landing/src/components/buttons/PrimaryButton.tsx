// src/components/buttons/PrimaryButton.tsx
import React from 'react';
import { colors, spacing, typography } from '../../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = 'medium',
  fullWidth = true,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
          fontSize: 18,
        };
      default:
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          fontSize: 16,
        };
    }
  };

  return (
    <div
      onClick={onPress}
      className={`
        flex items-center justify-center rounded-lg transition-all
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
        ${fullWidth ? 'w-full' : ''}
      `}
      style={{
        backgroundColor: disabled ? colors.disabled : colors.primary,
        color: colors.text.inverse,
        ...getSizeStyles(),
        fontWeight: '600',
      }}
    >
      {loading ? 'Loading...' : title}
    </div>
  );
};
