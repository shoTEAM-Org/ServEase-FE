// README: ServEase Mobile App Architecture

# ServEase - React Native + TypeScript Architecture

This document outlines the modern, scalable architecture for the ServEase mobile application built with React Native and TypeScript.

## 🎯 Architecture Overview

The app follows a clean, modular architecture with clear separation of concerns:

```
UI Components ← State Management ← API Services ← Backend
     ↓                 ↓                 ↓
  Screens       Context/Redux      Authentication
```

## 📁 Folder Structure

### `/components` - Reusable UI Components
- **buttons/**: PrimaryButton, SecondaryButton
- **inputs/**: InputField, TextAreaField, SelectField
- **cards/**: SectionCard, CategoryCard, ServiceProviderCard, FileUploadCard
- **headers/**: AppHeader, TabHeader
- **progress/**: StepProgressIndicator

### `/screens` - Full-Screen Components
- HomeScreen
- ServiceCategoriesScreen
- ServiceProviderApplicationScreen
- BookingScreen
- ProviderProfileScreen
- UserProfileScreen

### `/theme` - Design System
- **colors.ts**: Color palette (primary: #00BF63)
- **spacing.ts**: Padding, margin, border radius, shadows
- **typography.ts**: Font sizes, weights, families
- **theme.ts**: Centralized theme export

### `/types` - TypeScript Interfaces
- IUser, IServiceProvider, IBooking
- IServiceCategory, IAddress, IWorkingHours
- All request/response types

### `/utils` - Helper Functions
- **validation.ts**: Email, phone, URL, credit card validation
- **formatting.ts**: Currency, date, time, phone formatting
- **constants.ts**: App-wide constants

### `/hooks` - Custom Hooks
- **useFormValidation**: Real-time form validation
- **useAuth**: Authentication logic
- **useBooking**: Booking management
- **useServiceProviders**: Provider data fetching

### `/services` - API Integration
- **api.ts**: HTTP client setup
- **authService.ts**: Login, signup, logout
- **bookingService.ts**: Booking CRUD operations
- **providerService.ts**: Provider data fetching

### `/store` - State Management (Redux/Context)
- **slices/**: Redux slices for auth, booking, providers
- **actions**: Async thunks
- **selectors**: Memoized state selectors

## 🎨 Design System

### Colors
```typescript
Primary: #00BF63 (Green)
Secondary: #FFFFFF (White)
Text Primary: #1A1A1A (Dark Gray)
Text Secondary: #666666 (Medium Gray)
```

### Spacing Scale
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
xxl: 32px
xxxl: 48px
```

### Typography
- **H1**: 32px, Bold, Poppins
- **H2**: 28px, Bold, Poppins
- **Body**: 16px, Regular, Inter
- **Caption**: 12px, Regular, Inter

## 🔗 Component Usage

### Button Component
```typescript
<PrimaryButton
  title="Next"
  onPress={() => setCurrentStep(2)}
  size="medium"
  fullWidth
  disabled={!isFormValid}
/>
```

### Form Input
```typescript
<InputField
  label="Email Address"
  placeholder="user@example.com"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
  required
  error={errors.email}
/>
```

### Section Card
```typescript
<SectionCard title="Contact Information">
  {/* Input fields inside */}
</SectionCard>
```

## 📝 Form Validation

Use the `useFormValidation` hook for real-time validation:

```typescript
const form = useFormValidation(
  {
    businessName: '',
    email: '',
  },
  {
    businessName: { required: true, minLength: 3 },
    email: { required: true, pattern: /^.+@.+\..+$/ },
  }
);
```

## 🚀 Best Practices

1. **Component Props**: Always type component props with interfaces
2. **Error Handling**: Use error boundaries and try-catch for API calls
3. **Performance**: Use React.memo, useCallback, useMemo judiciously
4. **Testing**: Write unit tests for utilities, integration tests for screens
5. **Accessibility**: Add proper labels, test with accessibility tools
6. **Code Organization**: Keep files small and focused (< 300 lines)
7. **Type Safety**: Enable TypeScript strict mode

## 🔄 Data Flow

1. User interacts with component
2. Component handler calls hook or dispatches action
3. Hook/redux connects to API service
4. API service makes HTTP request
5. Response updates state
6. Component re-renders with new data

## 📚 Additional Resources

- React Native Docs: https://reactnative.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Redux Toolkit: https://redux-toolkit.js.org
- Testing Library: https://testing-library.com
