// src/hooks/useFormValidation.ts
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export const useFormValidation = (initialValues: Record<string, any>, validationRules: Record<string, ValidationRule>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (fieldName: string, value: any): string | undefined => {
      const rules = validationRules[fieldName];
      if (!rules) return undefined;

      if (rules.required && !value) {
        return `${fieldName} is required`;
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `${fieldName} must be at least ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `${fieldName} must be no more than ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return `${fieldName} has an invalid format`;
      }

      if (rules.custom) {
        const result = rules.custom(value);
        if (typeof result === 'string') {
          return result;
        } else if (result === false) {
          return `${fieldName} is invalid`;
        }
      }

      return undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (fieldName: string, value: any) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      if (touched[fieldName]) {
        const error = validateField(fieldName, value);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (fieldName: string) => {
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    },
    [validateField, values]
  );

  const validateAll = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, validateField, values]);

  return {
    values,
    errors,
    touched,
    setValues,
    handleChange,
    handleBlur,
    validateAll,
    setTouched,
  };
};
