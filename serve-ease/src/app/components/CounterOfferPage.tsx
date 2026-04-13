import { useState } from 'react';
import { Clock, DollarSign, Calendar, FileText, User, Briefcase } from 'lucide-react';
import logo from '@/assets/d5c1631be6e8531539bd8040a765725f4a4ddc2c.png';

export function CounterOfferPage() {
  const [formData, setFormData] = useState({
    proposedDateTime: '',
    proposedPrice: '',
    estimatedDuration: '',
    reason: '',
    validityPeriod: '24h'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleValidityChange = (value: string) => {
    setFormData(prev => ({ ...prev, validityPeriod: value }));
  };

  const handleSubmit = () => {
    console.log('Counter offer submitted:', formData);
    // Handle submission logic
  };

  const handleCancel = () => {
    console.log('Counter offer cancelled');
    // Handle cancel logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      <div className="max-w-7xl mx-auto p-8 pb-32">
        {/* Page Header with Branding */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo.src} alt="ServEase" className="h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Review & Counter Offer</h1>
          <p className="text-lg text-gray-600">Review the booking request and propose changes if needed</p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* LEFT SIDE: Booking Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-8 bg-green-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Overview</h2>
            </div>
            
            {/* Customer Info */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center ring-2 ring-green-100">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Customer</p>
                <p className="text-xl font-bold text-gray-900">John Martinez</p>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 flex items-center justify-center flex-shrink-0 border border-green-100">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Service Type</p>
                  <p className="text-lg font-semibold text-gray-900">Home Cleaning Service</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 flex items-center justify-center flex-shrink-0 border border-green-100">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Requested Date & Time</p>
                  <p className="text-lg font-semibold text-gray-900">March 25, 2026</p>
                  <p className="text-base text-gray-600">2:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 flex items-center justify-center flex-shrink-0 border border-green-100">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">3 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-gradient-to-br from-green-50/50 to-transparent p-5 rounded-xl border border-green-100/50">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-700 mb-1.5 uppercase tracking-wide">Requested Price</p>
                  <p className="text-3xl font-bold text-gray-900">₱2,500.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Counter Offer Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-8 bg-green-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Propose Changes</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="proposedDateTime" className="block text-sm font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                  Proposed Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="proposedDateTime"
                  name="proposedDateTime"
                  value={formData.proposedDateTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium hover:border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="proposedPrice" className="block text-sm font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                  Proposed Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₱</span>
                  <input
                    type="number"
                    id="proposedPrice"
                    name="proposedPrice"
                    value={formData.proposedPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-semibold text-lg hover:border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="estimatedDuration" className="block text-sm font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  id="estimatedDuration"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 hours"
                  className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium hover:border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Width: Reason Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-8 bg-green-600 rounded-full"></div>
            <label htmlFor="reason" className="text-2xl font-bold text-gray-900">
              Reason for Counter Offer
            </label>
          </div>
          <p className="text-base text-gray-600 mb-5">Explain why you're suggesting changes to help the customer understand</p>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows={5}
            placeholder="e.g., I have availability earlier in the day which would work better for both of us..."
            className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all text-gray-900 font-medium leading-relaxed hover:border-gray-300"
          />
        </div>

        {/* Validity Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-8 bg-green-600 rounded-full"></div>
            <label className="text-2xl font-bold text-gray-900">
              Offer Validity
            </label>
          </div>
          <p className="text-base text-gray-600 mb-6">How long should this counter offer remain valid?</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleValidityChange('24h')}
              className={`px-8 py-4 rounded-xl font-bold text-base transition-all shadow-sm ${
                formData.validityPeriod === '24h'
                  ? 'bg-green-600 text-white shadow-md ring-2 ring-green-600 ring-offset-2 scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
              }`}
            >
              24 hours
            </button>
            
            <button
              onClick={() => handleValidityChange('48h')}
              className={`px-8 py-4 rounded-xl font-bold text-base transition-all shadow-sm ${
                formData.validityPeriod === '48h'
                  ? 'bg-green-600 text-white shadow-md ring-2 ring-green-600 ring-offset-2 scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
              }`}
            >
              48 hours
            </button>
            
            <button
              onClick={() => handleValidityChange('72h')}
              className={`px-8 py-4 rounded-xl font-bold text-base transition-all shadow-sm ${
                formData.validityPeriod === '72h'
                  ? 'bg-green-600 text-white shadow-md ring-2 ring-green-600 ring-offset-2 scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
              }`}
            >
              72 hours
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <p className="text-base font-semibold text-gray-700">
              Review your changes before sending
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-base hover:border-gray-400 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-3.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Send Counter Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
