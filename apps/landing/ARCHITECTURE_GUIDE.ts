// ARCHITECTURE GUIDE: ServEase React Native + TypeScript App

/**
 * PROJECT STRUCTURE
 * 
 * src/
 * ├── components/
 * │   ├── buttons/
 * │   │   ├── PrimaryButton.tsx
 * │   │   └── SecondaryButton.tsx
 * │   ├── inputs/
 * │   │   ├── InputField.tsx
 * │   │   └── TextAreaField.tsx
 * │   ├── cards/
 * │   │   ├── SectionCard.tsx
 * │   │   ├── CategoryCard.tsx
 * │   │   ├── ServiceProviderCard.tsx
 * │   │   └── FileUploadCard.tsx
 * │   ├── headers/
 * │   │   └── AppHeader.tsx
 * │   ├── progress/
 * │   │   └── StepProgressIndicator.tsx
 * │   └── index.ts (barrel export)
 * │
 * ├── screens/
 * │   ├── HomeScreen.tsx
 * │   ├── ServiceCategoriesScreen.tsx
 * │   ├── ServiceProviderApplicationScreen.tsx
 * │   ├── BookingScreen.tsx
 * │   ├── ProviderProfileScreen.tsx
 * │   └── UserProfileScreen.tsx
 * │
 * ├── navigation/
 * │   ├── RootNavigator.tsx
 * │   ├── AuthNavigator.tsx
 * │   ├── AppNavigator.tsx
 * │   └── LinkingConfiguration.ts
 * │
 * ├── hooks/
 * │   ├── useFormValidation.ts
 * │   ├── useAuth.ts
 * │   ├── useBooking.ts
 * │   └── useServiceProviders.ts
 * │
 * ├── theme/
 * │   ├── colors.ts
 * │   ├── spacing.ts
 * │   ├── typography.ts
 * │   └── theme.ts
 * │
 * ├── types/
 * │   └── index.ts (all TypeScript interfaces)
 * │
 * ├── utils/
 * │   ├── validation.ts
 * │   ├── formatting.ts
 * │   └── constants.ts
 * │
 * ├── services/
 * │   ├── api.ts
 * │   ├── authService.ts
 * │   ├── bookingService.ts
 * │   └── providerService.ts
 * │
 * ├── store/ (Redux/Context API)
 * │   ├── slices/
 * │   │   ├── authSlice.ts
 * │   │   ├── bookingSlice.ts
 * │   │   └── providerSlice.ts
 * │   └── store.ts
 * │
 * └── App.tsx
 */

/**
 * KEY DESIGN DECISIONS
 * 
 * 1. COMPONENT ARCHITECTURE
 *    - All reusable UI components in `/components`
 *    - Each component is a pure, functional React component
 *    - Props are typed with TypeScript interfaces
 *    - Components accept `onPress` or `onChange` callbacks for interactions
 * 
 * 2. SCREEN STRUCTURE
 *    - Full-page components in `/screens`
 *    - Screens compose multiple UI components
 *    - Business logic separated from UI
 *    - Use hooks for state management and validation
 * 
 * 3. THEMING
 *    - Centralized design tokens in `/theme`
 *    - Colors, spacing, typography, and shadows defined once
 *    - Easy to update brand colors globally
 *    - Consistent sizing and spacing throughout the app
 * 
 * 4. TYPING
 *    - All interfaces in `/types/index.ts`
 *    - Strong typing across components and screens
 *    - Better IDE autocomplete and type safety
 *    - Reduces runtime errors
 * 
 * 5. VALIDATION
 *    - Centralized validation rules using `useFormValidation` hook
 *    - Real-time validation on blur/change
 *    - Reusable validation utilities
 * 
 * 6. STATE MANAGEMENT (Recommendation)
 *    - Use Redux Toolkit for complex state
 *    - Use Context API for theme/auth
 *    - Use local useState for component-level state
 */

/**
 * BEST PRACTICES
 * 
 * 1. COMPONENT NAMING
 *    ✓ PrimaryButton.tsx (exports PrimaryButton)
 *    ✗ button.tsx or Button.tsx
 * 
 * 2. PROP INTERFACE NAMING
 *    ✓ PrimaryButtonProps
 *    ✗ ButtonProps, IButton
 * 
 * 3. FILE ORGANIZATION
 *    - One component per file
 *    - Related files in dedicated folders
 *    - Barrel exports (index.ts) for easy imports
 * 
 * 4. IMPORT PATTERNS
 *    ✓ import { PrimaryButton } from '@/components'
 *    ✗ import PrimaryButton from '@/components/buttons/PrimaryButton'
 * 
 * 5. TYPESCRIPT
 *    - Enable strict mode
 *    - Use interfaces for objects, enums for constants
 *    - Avoid 'any' type
 *    - Use union types for multiple allowed values
 */

/**
 * EXAMPLE: ADDING A NEW FEATURE
 * 
 * 1. Define types in `/types/index.ts`
 * 2. Add constants in `/utils/constants.ts` if needed
 * 3. Create new utility functions if needed
 * 4. Create new components in `/components`
 * 5. Create screen in `/screens`
 * 6. Add navigation in `/navigation`
 * 7. Create API service if needed in `/services`
 * 8. Add Redux slices if needed in `/store`
 */

/**
 * RESPONSIVE DESIGN IN REACT NATIVE
 * 
 * Use React Native's Dimensions and Platform APIs:
 * 
 * import { Dimensions, Platform } from 'react-native';
 * 
 * const { width, height } = Dimensions.get('window');
 * const isTablet = width > 600;
 * const isIOS = Platform.OS === 'ios';
 * 
 * For Web (React):
 * Use CSS media queries or Tailwind's responsive classes
 */

/**
 * ACCESSIBILITY
 * 
 * - Add testID props for testing
 * - Use proper semantic HTML (web) or accessibility labels (native)
 * - Ensure text contrast is sufficient
 * - Make interactive elements at least 44x44pt (mobile) or 48x48dp
 * - Support keyboard navigation
 */

/**
 * PERFORMANCE OPTIMIZATION
 * 
 * 1. Memoization
 *    - Use React.memo for PureComponent optimization
 *    - Use useCallback for stable function references
 *    - Use useMemo for expensive computations
 * 
 * 2. List Rendering
 *    - Use FlatList (React Native) for efficient list rendering
 *    - Use virtualization for long lists
 *    - Add key props correctly
 * 
 * 3. Image Optimization
 *    - Use appropriately sized images
 *    - Lazy load images when off-screen
 *    - Use caching strategies
 */

export const ARCHITECTURE_GUIDE = 'See comments above for comprehensive architecture guide';
