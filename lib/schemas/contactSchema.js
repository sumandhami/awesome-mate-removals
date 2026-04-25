import { z } from 'zod';

const serviceTypes = ['removal', 'transport', 'storage', 'other'];
const propertyTypes = ['house', 'apartment', 'villa', 'other'];
const liftOptions = ['yes', 'no'];
const storyOptions = ['yes', 'no'];
const itemTypes = ['marble_table', 'stone_table', 'statue', 'piano', 'pool_table', 'scooters', 'e_bikes'];

const singleLineSafeText = z.string().refine(
  (value) => !/[\u0000-\u001F\u007F<>]/.test(value),
  { message: 'Contains invalid characters' }
);

const multilineSafeText = z.string().refine(
  (value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/.test(value),
  { message: 'Contains invalid characters' }
);

// Common fields for both steps
const commonFields = {
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name must be less than 80 characters' })
    .trim()
    .pipe(singleLineSafeText),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .max(254, { message: 'Email is too long' })
    .trim(),
  phone: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(20, { message: 'Phone number must be less than 20 characters' })
    .regex(/^[\d\s\-\+\(\)]+$/, { message: 'Please enter a valid phone number' })
    .trim(),
  preferredDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format' })
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, { message: 'Please select a future date' }),
  preferredTime: z.string()
    .trim()
    .min(1, { message: 'Please enter a preferred time' })
    .refine((time) => {
      const normalized = time.toLowerCase().replace(/\s+/g, '');
      const is24Hour = /^([01]?\d|2[0-3]):[0-5]\d$/.test(normalized);
      const is12Hour = /^(0?[1-9]|1[0-2])([:.][0-5]\d)?(am|pm)$/.test(normalized);
      return is24Hour || is12Hour;
    }, {
      message: 'Enter time like 8am, 1pm, or 13:00',
    }),
  serviceType: z.enum(serviceTypes, {
    errorMap: () => ({ message: 'Please select a service type' }),
  }),
  propertyType: z.enum(propertyTypes, {
    errorMap: () => ({ message: 'Please select a property type' }),
  }),
  movingFrom: z.string()
    .min(2, { message: 'Please enter where you are moving from' })
    .max(300, { message: 'Address is too long' })
    .trim()
    .pipe(singleLineSafeText),
  movingTo: z.string()
    .min(2, { message: 'Please enter where you are moving to' })
    .max(300, { message: 'Address is too long' })
    .trim()
    .pipe(singleLineSafeText),
  additionalDetails: z.string()
    .max(1000, { message: 'Additional details must be less than 1000 characters' })
    .pipe(multilineSafeText)
    .optional()
    .transform((val) => val?.trim() || ''),
  recaptchaToken: z.string().max(4096, { message: 'Invalid verification token length' }).optional().default(''),
};

// Step 1 schema for client-side validation only
export const contactStep1Schema = z.object({
  name: commonFields.name,
  email: commonFields.email,
  phone: commonFields.phone,
  preferredDate: commonFields.preferredDate,
  preferredTime: commonFields.preferredTime,
  serviceType: commonFields.serviceType,
}).passthrough();

// Step 2 schema  
export const contactStep2Schema = z.object({
  movingFrom: commonFields.movingFrom,
  movingTo: commonFields.movingTo,
  additionalDetails: commonFields.additionalDetails,
  recaptchaToken: commonFields.recaptchaToken,
}).passthrough();

// Full form schema - discriminated union with conditional fields
export const contactFormSchema = z.discriminatedUnion('propertyType', [
  z.object({
    ...commonFields,
    propertyType: z.literal('house'),
    multiStoryHouse: z.enum(storyOptions, {
      errorMap: () => ({ message: 'Please select yes or no' }),
    }),
  }),
  z.object({
    ...commonFields,
    propertyType: z.literal('apartment'),
    buildingLift: z.enum(liftOptions, {
      errorMap: () => ({ message: 'Please select yes or no' }),
    }),
  }),
  z.object({
    ...commonFields,
    propertyType: z.literal('villa'),
    itemTypes: z.array(z.enum(itemTypes), {
      errorMap: () => ({ message: 'Please select at least one item type' }),
    }).min(1, { message: 'Please select at least one item' }),
  }),
  z.object({
    ...commonFields,
    propertyType: z.literal('other'),
  }),
]);
