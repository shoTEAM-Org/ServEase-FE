// src/components/inputs/InputField.tsx
import React, { useState } from 'react';
import { colors, spacing, typography } from '../../theme';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric' | 'decimal-pad';
  secureTextEntry?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  required = false,
  disabled = false,
  error,
  maxLength,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="block font-semibold mb-2 text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={keyboardType === 'email-address' ? 'email' : keyboardType === 'phone-pad' ? 'tel' : secureTextEntry ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all
          focus:outline-none
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${error ? 'border-red-500' : isFocused ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-300'}
        `}
        style={{
          fontFamily: '"Inter", sans-serif',
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
