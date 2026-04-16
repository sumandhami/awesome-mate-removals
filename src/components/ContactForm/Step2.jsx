'use client';

import { Controller } from 'react-hook-form';
import { useEffect, useRef } from 'react';

export default function Step2({
  control,
  watch,
  errors,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const recaptchaLoaded = useRef(false);
  const propertyType = watch('propertyType');

  useEffect(() => {
    // Load reCAPTCHA script
    if (!window.grecaptcha && !recaptchaLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      recaptchaLoaded.current = true;
    }
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Moving Details</h3>

      {/* Property Type */}
      <Controller
        name="propertyType"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type *
            </label>
            <select
              {...field}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select property type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="other">Other</option>
            </select>
            {errors.propertyType && (
              <p className="text-red-600 text-sm mt-1">{errors.propertyType.message}</p>
            )}
          </div>
        )}
      />

      {/* Conditional Fields */}
      {propertyType === 'house' && (
        <Controller
          name="multiStoryHouse"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Multi-Story House? *
              </label>
              <select
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Select yes or no</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.multiStoryHouse && (
                <p className="text-red-600 text-sm mt-1">{errors.multiStoryHouse.message}</p>
              )}
            </div>
          )}
        />
      )}

      {propertyType === 'apartment' && (
        <Controller
          name="buildingLift"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building Has Lift? *
              </label>
              <select
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Select yes or no</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.buildingLift && (
                <p className="text-red-600 text-sm mt-1">{errors.buildingLift.message}</p>
              )}
            </div>
          )}
        />
      )}

      {propertyType === 'villa' && (
        <Controller
          name="itemTypes"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Items to Move (Select any) *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'marble_table', label: 'Marble Table' },
                  { value: 'stone_table', label: 'Stone Table' },
                  { value: 'statue', label: 'Statue' },
                  { value: 'piano', label: 'Piano' },
                  { value: 'pool_table', label: 'Pool Table' },
                  { value: 'scooters', label: 'Scooters' },
                  { value: 'e_bikes', label: 'E-Bikes' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value?.includes(item.value) || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange([...(value || []), item.value]);
                        } else {
                          onChange(value?.filter((v) => v !== item.value) || []);
                        }
                      }}
                      disabled={isSubmitting}
                      className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
              {errors.itemTypes && (
                <p className="text-red-600 text-sm mt-1">{errors.itemTypes.message}</p>
              )}
            </div>
          )}
        />
      )}

      {/* Moving From Address */}
      <Controller
        name="movingFrom"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Moving From Address *
            </label>
            <input
              {...field}
              type="text"
              placeholder="Unit 1, 123 Main Street, Perth WA 6000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.movingFrom && (
              <p className="text-red-600 text-sm mt-1">{errors.movingFrom.message}</p>
            )}
          </div>
        )}
      />

      {/* Moving To Address */}
      <Controller
        name="movingTo"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Moving To Address *
            </label>
            <input
              {...field}
              type="text"
              placeholder="Unit 2, 456 Oak Avenue, Perth WA 6001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.movingTo && (
              <p className="text-red-600 text-sm mt-1">{errors.movingTo.message}</p>
            )}
          </div>
        )}
      />

      {/* Additional Details */}
      <Controller
        name="additionalDetails"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              {...field}
              placeholder="Any special instructions or additional information..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={isSubmitting}
            />
            {errors.additionalDetails && (
              <p className="text-red-600 text-sm mt-1">{errors.additionalDetails.message}</p>
            )}
          </div>
        )}
      />

      {/* reCAPTCHA */}
      <Controller
        name="recaptchaToken"
        control={control}
        render={({ field }) => (
          <div>
            <div
              className="g-recaptcha"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              data-callback="onRecaptchaSuccess"
            />
            <script>
              {`
                window.onRecaptchaSuccess = function(token) {
                  const event = new CustomEvent('recaptchaToken', { detail: token });
                  document.dispatchEvent(event);
                };
              `}
            </script>
            {errors.recaptchaToken && (
              <p className="text-red-600 text-sm mt-1">{errors.recaptchaToken.message}</p>
            )}
          </div>
        )}
      />

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
