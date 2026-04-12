// src/theme/colors.ts
export const colors = {
  primary: '#00BF63',
  secondary: '#FFFFFF',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    light: '#999999',
    inverse: '#FFFFFF',
  },
  border: '#E0E0E0',
  error: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  disabled: '#CCCCCC',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export type ColorKey = keyof typeof colors;
