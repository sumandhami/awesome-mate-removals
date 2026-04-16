import { z } from 'zod';

const serviceTypes = ['removal', 'transport', 'storage', 'other'];
const propertyTypes = ['house', 'apartment', 'villa', 'other'];
const liftOptions = ['yes', 'no'];
const storyOptions = ['yes', 'no'];
const itemTypes = ['marble_table', 'stone_table', 'statue', 'piano', 'pool_table', 'scooters', 'e_bikes'];

// Common fields for both steps
const commonFields = {
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .trim(),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  preferredDate: z.string()
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, { message: 'Please select a future date' }),
  preferredTime: z.string()
    .min(5, { message: 'Please select a time' })
    .refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
      message: 'Invalid time format',
    }),
  serviceType: z.enum(serviceTypes, {
    errorMap: () => ({ message: 'Please select a service type' }),
  }),
  propertyType: z.enum(propertyTypes, {
    errorMap: () => ({ message: 'Please select a property type' }),
  }),
  movingFrom: z.string()
    .min(5, { message: 'Please enter the moving from address' })
    .max(200, { message: 'Address is too long' })
    .trim(),
  movingTo: z.string()
    .min(5, { message: 'Please enter the moving to address' })
    .max(200, { message: 'Address is too long' })
    .trim(),
  additionalDetails: z.string()
    .max(1000, { message: 'Additional details must be less than 1000 characters' })
    .optional()
    .transform((val) => val?.trim() || ''),
  recaptchaToken: z.string().optional().default(''),
};

// Step 1 schema for client-side validation only
export const contactStep1Schema = z.object({
  name: commonFields.name,
  email: commonFields.email,
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
