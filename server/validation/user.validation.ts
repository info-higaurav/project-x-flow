import { z } from 'zod';
import mongoose from 'mongoose';

// Helper for ObjectId validation
const isValidObjectId = (value: string) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Email validation regex
// This follows RFC 5322 official standard
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Password requirements
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

// Token validation - JWT format validation
const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;

export const authVal = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  })
    .trim()
    .min(1, { message: "Email cannot be empty" })
    .max(255, { message: "Email is too long" })
    .regex(EMAIL_REGEX, { message: "Invalid email format" })
    .toLowerCase(),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
    .min(PASSWORD_MIN_LENGTH, { message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` })
    .regex(PASSWORD_REGEX, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),

  accessToken: z.string({
    invalid_type_error: "Access token must be a string"
  })
    .regex(JWT_REGEX, { message: "Invalid JWT token format" })
    .optional()
    .nullable(),

  refreshToken: z.string({
    invalid_type_error: "Refresh token must be a string"
  })
    .regex(JWT_REGEX, { message: "Invalid JWT token format" })
    .optional()
    .nullable(),

  lastLogin: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      return arg;
    },
    z.date({
      invalid_type_error: "Last login must be a valid date"
    })
      .optional()
      .nullable()
      .refine((date) => {
        // Ensure date is not in the future
        return !date || date <= new Date();
      }, {
        message: "Last login date cannot be in the future"
      })
  ),

  isActive: z.boolean({
    invalid_type_error: "isActive must be a boolean"
  })
    .default(true),

    userId: z
    .custom<mongoose.Types.ObjectId>(
      (value) => isValidObjectId(value) && new mongoose.Types.ObjectId(value),
      {
        message: "User ID must be a valid MongoDB ObjectId",
      }
    )
});

export type IAuthInput = z.infer<typeof authVal>


const roles = ["admin","user"] as const;
export const userZodSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string"
    })
    .min(1, "First name can't be empty")
    .max(255, "First name is too long")
    .regex(/^[a-zA-Z ]+$/, "First name must contain only letters")
    .optional()
    .nullable(),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string"
    })
    .min(1, "Last name can't be empty")
    .max(255, "Last name is too long")
    .regex(/^[a-zA-Z ]+$/, "Last name must contain only letters")
    .optional()
    .nullable(),

  role: z.enum(roles)
});

export type IUserInput = z.infer<typeof userZodSchema>

