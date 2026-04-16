'use client';

import { Controller } from 'react-hook-form';

export default function Step1({
  control,
  errors,
  onNext,
  isSubmitting,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Your Information</h3>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              {...field}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              {...field}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="preferredDate"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date *
            </label>
            <input
              {...field}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.preferredDate && (
              <p className="text-red-600 text-sm mt-1">{errors.preferredDate.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="preferredTime"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time *
            </label>
            <select
              {...field}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select a time</option>
              {Array.from({ length: 17 }, (_, i) => {
                const hours = 9 + Math.floor(i / 2);
                const minutes = (i % 2) * 30;
                const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>
            {errors.preferredTime && (
              <p className="text-red-600 text-sm mt-1">{errors.preferredTime.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="serviceType"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type *
            </label>
            <select
              {...field}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select a service</option>
              <option value="removal">Removal</option>
              <option value="transport">Transport</option>
              <option value="storage">Storage</option>
              <option value="other">Other</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-600 text-sm mt-1">{errors.serviceType.message}</p>
            )}
          </div>
        )}
      />

      <button
        onClick={onNext}
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
}
