'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, contactStep1Schema } from '@/lib/schemas/contactSchema';
import Step1 from './Step1';
import Step2 from './Step2';

const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';

function loadRecaptchaV3(siteKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('reCAPTCHA can only run in the browser'));
      return;
    }

    if (window.grecaptcha?.execute) {
      resolve(window.grecaptcha);
      return;
    }

    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha) {
          resolve(window.grecaptcha);
        } else {
          reject(new Error('reCAPTCHA failed to initialize'));
        }
      };
      script.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
      document.head.appendChild(script);
      return;
    }

    const waitForGrecaptcha = () => {
      if (window.grecaptcha?.execute) {
        resolve(window.grecaptcha);
        return;
      }

      window.setTimeout(waitForGrecaptcha, 50);
    };

    waitForGrecaptcha();
  });
}

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const isRecaptchaEnabled =
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === 'true';

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
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
    clearErrors(['name', 'email', 'preferredDate', 'preferredTime', 'serviceType']);

    const step1Payload = {
      name: getValues('name'),
      email: getValues('email'),
      preferredDate: getValues('preferredDate'),
      preferredTime: getValues('preferredTime'),
      serviceType: getValues('serviceType'),
    };

    const step1Result = contactStep1Schema.safeParse(step1Payload);
    const isValid = step1Result.success;

    if (!isValid) {
      const fieldErrors = step1Result.error.flatten().fieldErrors;
      for (const [fieldName, messages] of Object.entries(fieldErrors)) {
        if (messages?.[0]) {
          setError(fieldName, { type: 'manual', message: messages[0] });
        }
      }
    }

    if (isValid) {
      setStep(2);
    }
  };

  const handleStep2Back = () => {
    setErrorMessage('');
    setStep(1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let submissionToken = recaptchaToken;

      if (isRecaptchaEnabled) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
          throw new Error('reCAPTCHA site key is missing');
        }

        const grecaptcha = await loadRecaptchaV3(siteKey);
        await new Promise((resolve) => grecaptcha.ready(resolve));
        submissionToken = await grecaptcha.execute(siteKey, { action: 'contact_form' });
        setRecaptchaToken(submissionToken);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: submissionToken || '',
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
            recaptchaEnabled={isRecaptchaEnabled}
          />
        </form>
      )}
    </div>
  );
}
