// src/components/inputs/TextAreaField.tsx
import React, { useState } from 'react';

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  numberOfLines?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  required = false,
  disabled = false,
  error,
  maxLength,
  numberOfLines = 4,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="block font-semibold mb-2 text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        maxLength={maxLength}
        rows={numberOfLines}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all resize-none
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
