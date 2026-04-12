// src/hooks/useFormValidation.d.ts - Alternative type-safe hook implementation

import { useState, useCallback, SetStateAction, Dispatch } from 'react';

/**
 * HOW TO USE useFormValidation
 * 
 * const form = useFormValidation<MyFormData>(
 *   {
 *     businessName: '',
 *     email: '',
 *     phoneNumber: '',
 *   },
 *   {
 *     businessName: { required: true, minLength: 3 },
 *     email: { required: true, pattern: /^.+@.+\\..+$/ },
 *     phoneNumber: { 
 *       required: true, 
 *       custom: (value) => isValidPhoneNumber(value) ? true : 'Invalid phone number'
 *     },
 *   }
 * );
 * 
 * // Use in component:
 * <InputField
 *   label="Business Name"
 *   value={form.values.businessName}
 *   onChangeText={(text) => form.handleChange('businessName', text)}
 *   onBlur={() => form.handleBlur('businessName')}
 *   error={form.touched.businessName ? form.errors.businessName : undefined}
 *   required
 * />
 * 
 * // Validate and submit:
 * const handleSubmit = () => {
 *   if (form.validateAll()) {
 *     // Form is valid, submit data
 *     console.log(form.values);
 *   }
 * }
 */

/**
 * TESTING COMPONENTS
 * 
 * Example with Jest and React Testing Library:
 * 
 * import { render, screen, fireEvent } from '@testing-library/react-native';
 * import { PrimaryButton } from './PrimaryButton';
 * 
 * describe('PrimaryButton', () => {
 *   it('should call onPress when pressed', () => {
 *     const mockOnPress = jest.fn();
 *     render(
 *       <PrimaryButton title="Test" onPress={mockOnPress} />
 *     );
 *     
 *     fireEvent.press(screen.getByText('Test'));
 *     expect(mockOnPress).toHaveBeenCalled();
 *   });
 * 
 *   it('should be disabled when disabled prop is true', () => {
 *     const mockOnPress = jest.fn();
 *     render(
 *       <PrimaryButton title="Test" onPress={mockOnPress} disabled />
 *     );
 *     
 *     fireEvent.press(screen.getByText('Test'));
 *     expect(mockOnPress).not.toHaveBeenCalled();
 *   });
 * });
 */

export type FormValidationHook = 'See useFormValidation.ts for implementation';
