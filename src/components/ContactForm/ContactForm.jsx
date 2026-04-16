'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/schemas/contactSchema';
import Step1 from './Step1';
import Step2 from './Step2';

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      serviceType: '',
      propertyType: '',
      multiStoryHouse: '',
      buildingLift: '',
      itemTypes: [],
      movingFrom: '',
      movingTo: '',
      additionalDetails: '',
      recaptchaToken: '',
    },
  });

  // Listen for reCAPTCHA token
  useEffect(() => {
    const handleRecaptchaToken = (e) => {
      setRecaptchaToken(e.detail);
    };

    document.addEventListener('recaptchaToken', handleRecaptchaToken);
    return () => document.removeEventListener('recaptchaToken', handleRecaptchaToken);
  }, []);

  const handleStep1Next = async () => {
    setErrorMessage('');
    const isValid = await trigger([
      'name',
      'email',
      'preferredDate',
      'preferredTime',
      'serviceType',
    ]);

    if (isValid) {
      setStep(2);
    }
  };

  const handleStep2Back = () => {
    setErrorMessage('');
    setStep(1);
  };

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      setErrorMessage('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSuccessMessage('Thank you! Your message has been sent successfully. We will contact you soon.');
      reset();
      setStep(1);
      setRecaptchaToken('');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0 md:max-w-none">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
          step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          1
        </div>
        <div className={`w-12 h-1 mx-2 ${
          step > 1 ? 'bg-blue-600' : 'bg-gray-300'
        }`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
          step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          2
        </div>
      </div>

      {/* Form Content */}
      {step === 1 ? (
        <Step1
          control={control}
          errors={errors}
          onNext={handleStep1Next}
          isSubmitting={isSubmitting}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Step2
            control={control}
            watch={watch}
            errors={errors}
            onBack={handleStep2Back}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        </form>
      )}
    </div>
  );
}
