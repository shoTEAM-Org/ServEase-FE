// src/components/buttons/SecondaryButton.tsx
import React from 'react';
import { colors, spacing } from '../../theme';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
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
        flex items-center justify-center rounded-lg border-2 transition-all
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
        ${fullWidth ? 'w-full' : ''}
      `}
      style={{
        borderColor: disabled ? colors.disabled : colors.primary,
        color: disabled ? colors.disabled : colors.primary,
        ...getSizeStyles(),
        fontWeight: '600',
      }}
    >
      {title}
    </div>
  );
};
