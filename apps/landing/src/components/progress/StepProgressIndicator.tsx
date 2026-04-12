// src/components/progress/StepProgressIndicator.tsx
import React from 'react';
import { colors, spacing } from '../../theme';

interface StepProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles = [],
}) => {
  return (
    <div className="flex items-center justify-center mb-8 gap-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
              ${
                currentStep > index
                  ? `bg-${colors.primary}`
                  : currentStep === index + 1
                  ? `border-2 border-${colors.primary}`
                  : 'bg-gray-300'
              }
              ${currentStep > index || currentStep === index + 1 ? 'text-white' : 'text-gray-600'}
            `}
            style={{
              backgroundColor:
                currentStep > index
                  ? colors.primary
                  : currentStep === index + 1
                  ? 'white'
                  : '#CCCCCC',
              borderWidth: currentStep === index + 1 ? 2 : 0,
              borderColor: colors.primary,
              color:
                currentStep > index || currentStep === index + 1
                  ? currentStep > index
                    ? 'white'
                    : colors.primary
                  : 'white',
            }}
          >
            {currentStep > index ? '✓' : index + 1}
          </div>

          {/* Step Connector */}
          {index < totalSteps - 1 && (
            <div
              className="h-1 flex-1"
              style={{
                backgroundColor: currentStep > index + 1 ? colors.primary : '#E0E0E0',
                minWidth: 60,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Optional: Display step titles below
export const StepProgressWithLabels: React.FC<StepProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles = [],
}) => {
  return (
    <div>
      <StepProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      {stepTitles.length > 0 && (
        <div className="flex justify-between mt-4">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex-1 text-center">
              <p
                className={`text-sm font-medium ${
                  currentStep === index + 1 ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
