import { z } from 'zod';

const serviceTypes = ['removal', 'transport', 'storage', 'other'];
const propertyTypes = ['house', 'apartment', 'villa', 'other'];
const liftOptions = ['yes', 'no'];
const storyOptions = ['yes', 'no'];
const itemTypes = ['marble_table', 'stone_table', 'statue', 'piano', 'pool_table', 'scooters', 'e_bikes'];

// Base schema for Step 1
const step1BaseSchema = z.object({
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
});

const step2CommonSchema = z.object({
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
  recaptchaToken: z.string()
    .min(1, { message: 'reCAPTCHA verification failed' }),
});

// Step 2 schema holds property type and conditional fields
const step2Schema = z.discriminatedUnion('propertyType', [
  step2CommonSchema.extend({
    propertyType: z.literal('house'),
    multiStoryHouse: z.enum(storyOptions, {
      errorMap: () => ({ message: 'Please select yes or no' }),
    }),
  }),
  step2CommonSchema.extend({
    propertyType: z.literal('apartment'),
    buildingLift: z.enum(liftOptions, {
      errorMap: () => ({ message: 'Please select yes or no' }),
    }),
  }),
  step2CommonSchema.extend({
    propertyType: z.literal('villa'),
    itemTypes: z.array(z.enum(itemTypes), {
      errorMap: () => ({ message: 'Please select at least one item type' }),
    }).min(1, { message: 'Please select at least one item' }),
  }),
  step2CommonSchema.extend({
    propertyType: z.literal('other'),
  }),
]);

// Combined schema for server-side validation
export const contactFormSchema = step1BaseSchema.and(step2Schema);

// Export individual schemas for client-side step validation
export const contactStep1Schema = step1BaseSchema;
export const contactStep2Schema = step2Schema;
