/**
 * BaseButton Component
 * Standardized button component for all pages
 */
import React from 'react';
import { DESIGN, CSS_CLASSES, mergeClasses } from '../constants/design';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      loading = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: `bg-[${DESIGN.colors.primary}] text-white hover:bg-[${DESIGN.colors.primaryHover}]`,
      secondary: `bg-[${DESIGN.colors.backgroundAlt}] text-[${DESIGN.colors.text.primary}] hover:bg-gray-200`,
      outline: `border-2 border-[${DESIGN.colors.primary}] text-[${DESIGN.colors.primary}] hover:bg-[${DESIGN.colors.primary}]/5`,
      ghost: `text-[${DESIGN.colors.primary}] hover:bg-[${DESIGN.colors.primary}]/5`,
    };

    const sizes = {
      sm: CSS_CLASSES.buttonSm,
      md: CSS_CLASSES.buttonMd,
      lg: CSS_CLASSES.buttonLg,
    };

    const baseClass = mergeClasses(
      CSS_CLASSES.buttonBase,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={baseClass}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin">⟳</span>
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            <span>{children}</span>
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  }
);

BaseButton.displayName = 'BaseButton';
