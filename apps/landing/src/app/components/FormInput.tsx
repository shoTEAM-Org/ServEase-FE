/**
 * FormInput Component
 * Reusable form input with consistent styling and error handling
 */
import React from 'react';
import { DESIGN, CSS_CLASSES } from '../constants/design';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helper,
      icon,
      iconPosition = 'left',
      required = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-['Poppins',sans-serif] text-sm font-medium text-gray-700 block mb-2 flex items-center gap-1"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${CSS_CLASSES.formInput} ${
              icon && iconPosition === 'left' ? 'pl-12' : ''
            } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className || ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="font-['Poppins',sans-serif] text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
        {helper && !error && (
          <p id={`${inputId}-helper`} className="font-['Poppins',sans-serif] text-sm text-gray-500 mt-1">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

/**
 * FormTextarea Component
 * Reusable textarea with consistent styling
 */
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      helper,
      required = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-['Poppins',sans-serif] text-sm font-medium text-gray-700 block mb-2 flex items-center gap-1"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${CSS_CLASSES.formInput} resize-none ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
          } ${className || ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helper ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="font-['Poppins',sans-serif] text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
        {helper && !error && (
          <p id={`${textareaId}-helper`} className="font-['Poppins',sans-serif] text-sm text-gray-500 mt-1">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
