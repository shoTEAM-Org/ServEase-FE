/**
 * Section Heading Component
 * Consistent heading for sections across all pages
 */
import React from 'react';
import { CSS_CLASSES } from '../constants/design';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  color?: 'text-white' | 'text-gray-900' | 'text-gray-700';
  maxWidth?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  color = 'text-gray-900',
  maxWidth = 'max-w-2xl',
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const alignMargin = {
    left: 'ml-0',
    center: 'mx-auto',
    right: 'ml-auto',
  }[align];

  return (
    <div className={`${alignClass} ${alignMargin} ${maxWidth}`}>
      <h2 className={`${CSS_CLASSES.heading2} ${color} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-['Poppins',sans-serif] text-base md:text-lg ${
          color === 'text-white' ? 'text-white/90' : 'text-gray-600'
        } leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
