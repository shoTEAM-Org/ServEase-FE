// src/components/cards/SectionCard.tsx
import React from 'react';
import { colors, spacing, shadows, borderRadius } from '../../theme';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children, icon }) => {
  return (
    <div
      className="rounded-lg p-6 mb-6 bg-white"
      style={{
        ...shadows.md,
        borderRadius: borderRadius.lg,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-green-500">{icon}</div>}
        <h3 className="text-xl font-semibold text-green-600" style={{ fontSize: 20 }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};
