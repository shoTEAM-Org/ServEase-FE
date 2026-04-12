import { useState } from "react";
import { ChevronRight, Upload, Download, Eye } from "lucide-react";

interface FormData {
  // Step 1
  businessName: string;
  category: string;
  businessDescription: string;
  isOnlineBusiness: boolean;
  isPhysicalLocation: boolean;
  streetAddress: string;
  city: string;
  state: string;
  onlinePresence: string;
  // Step 2
  services: string;
  workingHours: {
    [key: string]: { open: boolean; startTime: string; endTime: string };
  };
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

export function ServiceProviderApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    businessName: "",
    category: "",
    businessDescription: "",
    isOnlineBusiness: true,
    isPhysicalLocation: false,
    streetAddress: "",
    city: "",
    state: "",
    onlinePresence: "",
    // Step 2
    services: "",
    workingHours: {
      monday: { open: true, startTime: "09:00", endTime: "17:00" },
      tuesday: { open: true, startTime: "09:00", endTime: "17:00" },
      wednesday: { open: true, startTime: "09:00", endTime: "17:00" },
      thursday: { open: true, startTime: "09:00", endTime: "17:00" },
      friday: { open: true, startTime: "09:00", endTime: "17:00" },
      saturday: { open: false, startTime: "09:00", endTime: "17:00" },
      sunday: { open: false, startTime: "09:00", endTime: "17:00" },
    },
    phoneNumber: "",
    email: "",
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    contactPersonName: "",
    contactPersonRole: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    idType: "Government ID",
    idNumber: "",
    idExpiryDate: "",
    validIdFile: null,
    businessPermitFile: null,
  });

  const categories = [
    "Home Maintenance & Repair",
    "Beauty, Wellness & Personal Care",
    "Education & Professional Services",
    "Domestic & Cleaning Services",
    "Pet Services",
    "Events & Entertainment",
    "Automotive & Tech Support",
  ];

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day as keyof typeof prev.workingHours], [field]: value }
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: "validIdFile" | "businessPermitFile") => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, [fileType]: e.target.files![0] }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.businessName || !formData.category) {
        alert("Please fill in all required fields");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    // Validate step 2
    if (!formData.phoneNumber || !formData.email || !formData.contactPersonName) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Registration submitted successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Poppins',sans-serif] text-4xl md:text-5xl font-bold mb-4">
            Service Provider Registration
          </h1>
          <p className="font-['Inter',sans-serif] text-lg text-gray-600 max-w-2xl mx-auto">
            Partner with ServEase as a trusted service provider and grow your business while earning on your own terms.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-lg ${
              currentStep >= 1 ? "bg-[#00BF63] text-white" : "bg-gray-300 text-gray-600"
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-[#00BF63]" : "bg-gray-300"}`}></div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-lg ${
              currentStep >= 2 ? "bg-[#00BF63] text-white" : "bg-gray-300 text-gray-600"
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {currentStep === 1 ? (
            // STEP 1: Business Registration
            <div>
              <h2 className="font-['Poppins',sans-serif] text-3xl font-bold mb-8">STEP 1: Business Registration</h2>

              {/* Basic Business Information */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Basic Business Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>

                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Select a Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    >
                      <option value="">Choose a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Business Description
                    </label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your business and what makes you unique"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Business Address
                </h3>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isOnlineBusiness}
                      onChange={(e) => setFormData(prev => ({ ...prev, isOnlineBusiness: e.target.checked }))}
                      className="w-5 h-5 accent-[#00BF63]"
                    />
                    <span className="font-['Inter',sans-serif] text-gray-700">Online Business</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPhysicalLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPhysicalLocation: e.target.checked }))}
                      className="w-5 h-5 accent-[#00BF63]"
                    />
                    <span className="font-['Inter',sans-serif] text-gray-700">Physical Location</span>
                  </label>
                </div>

                {formData.isPhysicalLocation && (
                  <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                    <div>
                      <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        placeholder="Enter street address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                        />
                      </div>
                      <div>
                        <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state/province"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Online Presence Details */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Online Presence Details
                </h3>
                <textarea
                  name="onlinePresence"
                  value={formData.onlinePresence}
                  onChange={handleInputChange}
                  placeholder="Describe your website or social media presence"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                />
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[#00BF63] hover:bg-[#00a852] text-white font-['Poppins',sans-serif] font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            // STEP 2: Profile Completion
            <div>
              <h2 className="font-['Poppins',sans-serif] text-3xl font-bold mb-8">STEP 2: Profile Completion</h2>

              {/* Services */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Services
                </h3>
                <textarea
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="Describe the services you offer in detail"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                />
              </div>

              {/* Working Hours */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Working Hours
                </h3>
                <div className="space-y-4">
                  {days.map((day, index) => (
                    <div key={day} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center gap-3 w-24 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.workingHours[day as keyof typeof formData.workingHours].open}
                          onChange={(e) => handleWorkingHoursChange(day, "open", e.target.checked)}
                          className="w-5 h-5 accent-[#00BF63]"
                        />
                        <span className="font-['Poppins',sans-serif] font-semibold text-gray-800">{dayLabels[index]}</span>
                      </label>
                      {formData.workingHours[day as keyof typeof formData.workingHours].open && (
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={formData.workingHours[day as keyof typeof formData.workingHours].startTime}
                              onChange={(e) => handleWorkingHoursChange(day, "startTime", e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63]"
                            />
                            <span className="text-gray-600">to</span>
                            <input
                              type="time"
                              value={formData.workingHours[day as keyof typeof formData.workingHours].endTime}
                              onChange={(e) => handleWorkingHoursChange(day, "endTime", e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63]"
                            />
                          </div>
                        </div>
                      )}
                      {!formData.workingHours[day as keyof typeof formData.workingHours].open && (
                        <span className="text-gray-500">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+63 917 123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Presence */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Social Media Presence
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">Facebook</label>
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/yourpage"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">Instagram</label>
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/yourprofile"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">Twitter / X</label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/yourprofile"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/company/yourpage"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Contact Person (Company Representative)
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Contact Person Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      placeholder="Michelle Anne Garcia"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Contact Person Role / Position
                    </label>
                    <input
                      type="text"
                      name="contactPersonRole"
                      value={formData.contactPersonRole}
                      onChange={handleInputChange}
                      placeholder="Business Owner / General Manager"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Contact Person Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contactPersonPhone"
                      value={formData.contactPersonPhone}
                      onChange={handleInputChange}
                      placeholder="+63 917 123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Contact Person Email Address
                    </label>
                    <input
                      type="email"
                      name="contactPersonEmail"
                      value={formData.contactPersonEmail}
                      onChange={handleInputChange}
                      placeholder="michelle.garcia@handyfixhome.ph"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* Valid ID */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Valid ID of Contact Person
                </h3>
                <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300 mb-6">
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload size={32} className="text-[#00BF63] mb-2" />
                    <span className="font-['Poppins',sans-serif] font-semibold text-gray-800">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-sm text-gray-500">PNG, JPG, or PDF (Max 5MB)</span>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "validIdFile")}
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                  </label>
                  {formData.validIdFile && (
                    <p className="mt-4 text-center font-['Inter',sans-serif] text-gray-700">
                      File: {formData.validIdFile.name}
                    </p>
                  )}
                </div>

                <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      ID Type
                    </label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    >
                      <option>Government ID</option>
                      <option>Passport</option>
                      <option>National ID</option>
                      <option>Driver's License</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      ID Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="1234-5678-9012"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins',sans-serif] font-semibold mb-2 text-gray-800">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="idExpiryDate"
                      value={formData.idExpiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF63] focus:ring-2 focus:ring-[#00BF63]/20 font-['Inter',sans-serif]"
                    />
                  </div>
                </div>

                {formData.validIdFile && (
                  <div className="flex gap-4 mt-6">
                    <button className="flex items-center gap-2 text-[#00BF63] hover:text-[#00a852] font-['Poppins',sans-serif] font-semibold py-2 px-6 border border-[#00BF63] rounded-lg transition-colors">
                      <Eye size={20} /> Preview
                    </button>
                    <button className="flex items-center gap-2 text-[#00BF63] hover:text-[#00a852] font-['Poppins',sans-serif] font-semibold py-2 px-6 border border-[#00BF63] rounded-lg transition-colors">
                      <Download size={20} /> Download
                    </button>
                  </div>
                )}
              </div>

              {/* Business Permit */}
              <div className="mb-10">
                <h3 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#00BF63] mb-6">
                  Business Permit
                </h3>
                <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300">
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload size={32} className="text-[#00BF63] mb-2" />
                    <span className="font-['Poppins',sans-serif] font-semibold text-gray-800">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-sm text-gray-500">PNG, JPG, or PDF (Max 10MB)</span>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "businessPermitFile")}
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                  </label>
                  {formData.businessPermitFile && (
                    <p className="mt-4 text-center font-['Inter',sans-serif] text-gray-700">
                      File: {formData.businessPermitFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <button
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-['Poppins',sans-serif] font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#00BF63] hover:bg-[#00a852] text-white font-['Poppins',sans-serif] font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
