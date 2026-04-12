// src/screens/ServiceProviderApplicationScreen.tsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  AppHeader,
  PrimaryButton,
  SecondaryButton,
  InputField,
  TextAreaField,
  SectionCard,
  FileUploadCard,
  StepProgressWithLabels,
} from '../components';
import { colors, spacing } from '../theme';
import { useFormValidation } from '../hooks/useFormValidation';
import { IServiceProvider, IContactPerson, IBusinessInfo, IWorkingHours } from '../types';

const SERVICE_CATEGORIES = [
  'Home Maintenance & Repair',
  'Beauty, Wellness & Personal Care',
  'Education & Professional Services',
  'Domestic & Cleaning Services',
  'Pet Services',
  'Events & Entertainment',
  'Automotive & Tech Support',
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ID_TYPES = ['Government ID', 'Passport', 'National ID', "Driver's License"];

interface FormDataStep1 {
  businessName: string;
  category: string;
  businessDescription: string;
  isOnlineBusiness: boolean;
  isPhysicalLocation: boolean;
  streetAddress: string;
  city: string;
  state: string;
  onlinePresence: string;
}

interface FormDataStep2 {
  services: string;
  workingHours: Record<string, { open: boolean; startTime: string; endTime: string }>;
  phoneNumber: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  contactPersonName: string;
  contactPersonRole: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  idType: string;
  idNumber: string;
  idExpiryDate: string;
  validIdFile: File | null;
  businessPermitFile: File | null;
}

export const ServiceProviderApplicationScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Form
  const step1Form = useFormValidation<FormDataStep1>(
    {
      businessName: '',
      category: '',
      businessDescription: '',
      isOnlineBusiness: true,
      isPhysicalLocation: false,
      streetAddress: '',
      city: '',
      state: '',
      onlinePresence: '',
    },
    {
      businessName: { required: true, minLength: 3 },
      category: { required: true },
    }
  );

  // Step 2 Form
  const step2Form = useFormValidation<FormDataStep2>(
    {
      services: '',
      workingHours: Object.fromEntries(
        DAYS_OF_WEEK.map((day) => [
          day.toLowerCase(),
          {
            open: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
            startTime: '09:00',
            endTime: '17:00',
          },
        ])
      ),
      phoneNumber: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      contactPersonName: '',
      contactPersonRole: '',
      contactPersonPhone: '',
      contactPersonEmail: '',
      idType: 'Government ID',
      idNumber: '',
      idExpiryDate: '',
      validIdFile: null,
      businessPermitFile: null,
    },
    {
      phoneNumber: {
        required: true,
        pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      contactPersonName: { required: true, minLength: 2 },
    }
  );

  const handleNextStep = () => {
    if (step1Form.validateAll()) {
      setCurrentStep(2);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (step2Form.validateAll()) {
      // Combine both forms data
      const formData = {
        ...step1Form.values,
        ...step2Form.values,
      };
      console.log('Form submitted:', formData);
      alert('Registration submitted successfully!');
      // TODO: Send to backend
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppHeader
        title="Service Provider Registration"
        showBackButton
        onBackPress={() => window.history.back()}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            Service Provider Registration
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Partner with ServEase as a trusted service provider and grow your business while
            earning on your own terms.
          </p>
        </div>

        {/* Step Progress */}
        <StepProgressWithLabels
          currentStep={currentStep}
          totalSteps={2}
          stepTitles={['Business Registration', 'Profile Completion']}
        />

        {/* Form Card */}
        <div
          className="bg-white rounded-xl p-8 md:p-12"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {currentStep === 1 ? (
            // STEP 1: Business Registration
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                STEP 1: Business Registration
              </h2>

              {/* Basic Business Information */}
              <SectionCard title="Basic Business Information">
                <InputField
                  label="Business Name"
                  placeholder="Enter your business name"
                  value={step1Form.values.businessName}
                  onChangeText={(text) => step1Form.handleChange('businessName', text)}
                  onBlur={() => step1Form.handleBlur('businessName')}
                  required
                  error={step1Form.touched.businessName ? step1Form.errors.businessName : undefined}
                />

                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-gray-800">
                    Select a Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={step1Form.values.category}
                    onChange={(e) => step1Form.handleChange('category', e.target.value)}
                    onBlur={() => step1Form.handleBlur('category')}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:outline-none transition-all
                      ${step1Form.touched.category && step1Form.errors.category ? 'border-red-500' : 'border-gray-300'}
                    `}
                  >
                    <option value="">Choose a category</option>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {step1Form.touched.category && step1Form.errors.category && (
                    <p className="text-red-500 text-sm mt-1">{step1Form.errors.category}</p>
                  )}
                </div>

                <TextAreaField
                  label="Business Description"
                  placeholder="Describe your business and what makes you unique"
                  value={step1Form.values.businessDescription}
                  onChangeText={(text) => step1Form.handleChange('businessDescription', text)}
                  numberOfLines={4}
                />
              </SectionCard>

              {/* Business Address */}
              <SectionCard title="Business Address">
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={step1Form.values.isOnlineBusiness}
                      onChange={(e) => step1Form.handleChange('isOnlineBusiness', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">Online Business</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={step1Form.values.isPhysicalLocation}
                      onChange={(e) =>
                        step1Form.handleChange('isPhysicalLocation', e.target.checked)
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">Physical Location</span>
                  </label>
                </div>

                {step1Form.values.isPhysicalLocation && (
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <InputField
                      label="Street Address"
                      placeholder="Enter street address"
                      value={step1Form.values.streetAddress}
                      onChangeText={(text) => step1Form.handleChange('streetAddress', text)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="City"
                        placeholder="Enter city"
                        value={step1Form.values.city}
                        onChangeText={(text) => step1Form.handleChange('city', text)}
                      />
                      <InputField
                        label="State / Province"
                        placeholder="Enter state/province"
                        value={step1Form.values.state}
                        onChangeText={(text) => step1Form.handleChange('state', text)}
                      />
                    </div>
                  </div>
                )}
              </SectionCard>

              {/* Online Presence Details */}
              <SectionCard title="Online Presence Details">
                <TextAreaField
                  label="Online Presence"
                  placeholder="Describe your website or social media presence"
                  value={step1Form.values.onlinePresence}
                  onChangeText={(text) => step1Form.handleChange('onlinePresence', text)}
                  numberOfLines={4}
                />
              </SectionCard>

              {/* Navigation */}
              <div className="flex justify-end gap-4 mt-8">
                <PrimaryButton
                  title="Next"
                  onPress={handleNextStep}
                  size="medium"
                  fullWidth={false}
                />
              </div>
            </div>
          ) : (
            // STEP 2: Profile Completion
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                STEP 2: Profile Completion
              </h2>

              {/* Services */}
              <SectionCard title="Services">
                <TextAreaField
                  label="Describe your services"
                  placeholder="Describe the services you offer in detail"
                  value={step2Form.values.services}
                  onChangeText={(text) => step2Form.handleChange('services', text)}
                  numberOfLines={4}
                />
              </SectionCard>

              {/* Working Hours */}
              <SectionCard title="Working Hours">
                <div className="space-y-3">
                  {DAYS_OF_WEEK.map((day, index) => {
                    const dayKey = day.toLowerCase();
                    const dayData = step2Form.values.workingHours[dayKey];

                    return (
                      <div
                        key={day}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <label className="flex items-center gap-3 w-32 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dayData.open}
                            onChange={(e) =>
                              step2Form.handleChange('workingHours', {
                                ...step2Form.values.workingHours,
                                [dayKey]: { ...dayData, open: e.target.checked },
                              })
                            }
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-gray-800">{day}</span>
                        </label>

                        {dayData.open && (
                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="time"
                              value={dayData.startTime}
                              onChange={(e) =>
                                step2Form.handleChange('workingHours', {
                                  ...step2Form.values.workingHours,
                                  [dayKey]: { ...dayData, startTime: e.target.value },
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <span className="text-gray-600">to</span>
                            <input
                              type="time"
                              value={dayData.endTime}
                              onChange={(e) =>
                                step2Form.handleChange('workingHours', {
                                  ...step2Form.values.workingHours,
                                  [dayKey]: { ...dayData, endTime: e.target.value },
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        )}
                        {!dayData.open && <span className="text-gray-500">Closed</span>}
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Contact Information */}
              <SectionCard title="Contact Information">
                <InputField
                  label="Phone Number"
                  placeholder="+63 917 123 4567"
                  keyboardType="phone-pad"
                  value={step2Form.values.phoneNumber}
                  onChangeText={(text) => step2Form.handleChange('phoneNumber', text)}
                  onBlur={() => step2Form.handleBlur('phoneNumber')}
                  required
                  error={
                    step2Form.touched.phoneNumber ? step2Form.errors.phoneNumber : undefined
                  }
                />
                <InputField
                  label="Email Address"
                  placeholder="your.email@example.com"
                  keyboardType="email-address"
                  value={step2Form.values.email}
                  onChangeText={(text) => step2Form.handleChange('email', text)}
                  onBlur={() => step2Form.handleBlur('email')}
                  required
                  error={step2Form.touched.email ? step2Form.errors.email : undefined}
                />
                <InputField
                  label="Website (Optional)"
                  placeholder="https://yourwebsite.com"
                  value={step2Form.values.website}
                  onChangeText={(text) => step2Form.handleChange('website', text)}
                />
              </SectionCard>

              {/* Social Media */}
              <SectionCard title="Social Media Presence">
                <InputField
                  label="Facebook"
                  placeholder="https://facebook.com/yourpage"
                  value={step2Form.values.facebook}
                  onChangeText={(text) => step2Form.handleChange('facebook', text)}
                />
                <InputField
                  label="Instagram"
                  placeholder="https://instagram.com/yourprofile"
                  value={step2Form.values.instagram}
                  onChangeText={(text) => step2Form.handleChange('instagram', text)}
                />
                <InputField
                  label="Twitter / X"
                  placeholder="https://twitter.com/yourprofile"
                  value={step2Form.values.twitter}
                  onChangeText={(text) => step2Form.handleChange('twitter', text)}
                />
                <InputField
                  label="LinkedIn"
                  placeholder="https://linkedin.com/company/yourpage"
                  value={step2Form.values.linkedin}
                  onChangeText={(text) => step2Form.handleChange('linkedin', text)}
                />
              </SectionCard>

              {/* Contact Person */}
              <SectionCard title="Contact Person (Company Representative)">
                <InputField
                  label="Contact Person Full Name"
                  placeholder="Michelle Anne Garcia"
                  value={step2Form.values.contactPersonName}
                  onChangeText={(text) => step2Form.handleChange('contactPersonName', text)}
                  onBlur={() => step2Form.handleBlur('contactPersonName')}
                  required
                  error={
                    step2Form.touched.contactPersonName
                      ? step2Form.errors.contactPersonName
                      : undefined
                  }
                />
                <InputField
                  label="Contact Person Role / Position"
                  placeholder="Business Owner / General Manager"
                  value={step2Form.values.contactPersonRole}
                  onChangeText={(text) => step2Form.handleChange('contactPersonRole', text)}
                />
                <InputField
                  label="Contact Person Phone Number"
                  placeholder="+63 917 123 4567"
                  keyboardType="phone-pad"
                  value={step2Form.values.contactPersonPhone}
                  onChangeText={(text) => step2Form.handleChange('contactPersonPhone', text)}
                />
                <InputField
                  label="Contact Person Email Address"
                  placeholder="michelle.garcia@handyfixhome.ph"
                  keyboardType="email-address"
                  value={step2Form.values.contactPersonEmail}
                  onChangeText={(text) => step2Form.handleChange('contactPersonEmail', text)}
                />
              </SectionCard>

              {/* Valid ID */}
              <SectionCard title="Valid ID of Contact Person">
                <FileUploadCard
                  title="Upload Valid ID"
                  onFileSelect={(file) => step2Form.handleChange('validIdFile', file)}
                  selectedFile={step2Form.values.validIdFile}
                />

                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">ID Type</label>
                    <select
                      value={step2Form.values.idType}
                      onChange={(e) => step2Form.handleChange('idType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      {ID_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputField
                    label="ID Number (Optional)"
                    placeholder="1234-5678-9012"
                    value={step2Form.values.idNumber}
                    onChangeText={(text) => step2Form.handleChange('idNumber', text)}
                  />
                  <InputField
                    label="Expiry Date (Optional)"
                    value={step2Form.values.idExpiryDate}
                    onChangeText={(text) => step2Form.handleChange('idExpiryDate', text)}
                  />
                </div>
              </SectionCard>

              {/* Business Permit */}
              <SectionCard title="Business Permit">
                <FileUploadCard
                  title="Upload Business Permit"
                  onFileSelect={(file) => step2Form.handleChange('businessPermitFile', file)}
                  selectedFile={step2Form.values.businessPermitFile}
                  maxSize={10}
                />
              </SectionCard>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 mt-8">
                <SecondaryButton title="Back" onPress={handleBackStep} fullWidth />
                <PrimaryButton title="Complete Registration" onPress={handleSubmit} fullWidth />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
