/**
 * Centralized Design System
 * Ensures consistency across all pages and components
 */

export const DESIGN = {
  // Color Palette
  colors: {
    primary: '#00BF63', // Main green
    primaryHover: '#00a855',
    primaryLight: '#00BF63',
    primaryDark: '#008c47',
    
    secondary: '#ffffff',
    secondaryHover: '#f5f5f5',
    
    background: '#ffffff',
    backgroundAlt: '#f1f1f1',
    
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      light: '#999999',
      white: '#ffffff',
    },
    
    border: '#e0e0e0',
    borderDark: '#d0d0d0',
    
    error: '#d4183d',
    success: '#00BF63',
    warning: '#ff9800',
    info: '#2196f3',
  },

  // Typography
  typography: {
    fontPrimary: '"Poppins", sans-serif',
    fontSecondary: '"Inter", sans-serif',
    
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },

    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },

  // Border Radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // Layout
  layout: {
    maxWidth: '1280px',
    containerPadding: {
      mobile: '24px',
      tablet: '24px',
      desktop: '64px',
    },
  },
} as const;

/**
 * Common CSS Classes for Consistency
 */
export const CSS_CLASSES = {
  // Containers
  container: 'max-w-7xl mx-auto',
  containerMd: 'max-w-4xl mx-auto',
  containerSm: 'max-w-3xl mx-auto',
  
  // Padding
  paddingPage: 'px-6 md:px-16 py-16 md:py-24',
  paddingSection: 'py-16 md:py-24 px-6 md:px-16',
  
  // Flexbox
  centerFlex: 'flex items-center justify-center',
  centerFlexCol: 'flex flex-col items-center justify-center',
  
  // Grid
  gridCols3: 'grid grid-cols-1 md:grid-cols-3 gap-8',
  gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
  
  // Typography
  heading1: `font-['Poppins',sans-serif] text-3xl md:text-5xl font-bold`,
  heading2: `font-['Poppins',sans-serif] text-2xl md:text-4xl font-bold`,
  heading3: `font-['Poppins',sans-serif] text-xl md:text-2xl font-bold`,
  heading4: `font-['Poppins',sans-serif] text-lg md:text-xl font-semibold`,
  
  bodyBase: `font-['Poppins',sans-serif] text-base`,
  bodySm: `font-['Poppins',sans-serif] text-sm`,
  bodyXs: `font-['Poppins',sans-serif] text-xs`,
  
  // Links
  linkBase: 'no-underline transition-colors duration-300 cursor-pointer',
  
  // Cards
  cardBase: 'rounded-2xl p-6 md:p-8 transition-all duration-300',
  cardShadow: 'shadow-md hover:shadow-lg',
  
  // Buttons
  buttonBase: 'rounded-xl px-6 py-3 font-[\'Poppins\',sans-serif] transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 font-semibold',
  buttonSm: 'text-sm px-4 py-2',
  buttonMd: 'text-base px-6 py-3',
  buttonLg: 'text-lg px-8 py-4',
  
  // Forms
  formInput: 'w-full border border-gray-300 rounded-xl px-4 py-3 font-[\'Poppins\',sans-serif] text-sm focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 transition-colors bg-white placeholder-gray-400',
  
  // Hover effects
  hoverLift: 'hover:-translate-y-1 transition-transform duration-300',
  hoverScale: 'hover:scale-105 transition-transform duration-300',
  hoverBrightness: 'hover:brightness-110 transition-all duration-300',
};

/**
 * Helper function to merge classes
 */
export function mergeClasses(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
