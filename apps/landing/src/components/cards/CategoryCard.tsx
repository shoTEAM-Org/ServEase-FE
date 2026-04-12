// src/components/cards/CategoryCard.tsx
import React from 'react';
import { colors, spacing, shadows, borderRadius } from '../../theme';
import { IServiceCategory } from '../../types';

interface CategoryCardProps {
  category: IServiceCategory;
  onPress: (categoryId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  size = 'medium',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 120,
          padding: spacing.md,
        };
      case 'large':
        return {
          height: 240,
          padding: spacing.lg,
        };
      default:
        return {
          height: 180,
          padding: spacing.lg,
        };
    }
  };

  const styles = getSizeStyles();

  return (
    <div
      onClick={() => onPress(category.id)}
      className="rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1"
      style={{
        ...shadows.md,
        height: styles.height,
        backgroundColor: colors.surface,
      }}
    >
      {category.image && (
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-2/3 object-cover"
        />
      )}
      <div className="p-4 bg-white h-1/3 flex flex-col justify-center">
        <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
        {size !== 'small' && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.description}</p>
        )}
      </div>
    </div>
  );
};
