import { z } from 'zod';

export const PASSWORD_SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;

export const hasUppercase = (value: string) => UPPERCASE_REGEX.test(value);
export const hasLowercase = (value: string) => LOWERCASE_REGEX.test(value);
export const hasDigit = (value: string) => DIGIT_REGEX.test(value);

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be less than 50 characters long' })
      .refine(
        (val) => /^\p{L}+(?: \p{L}+)*$/u.test(val),
        'Name can only contain letters and single spaces between words (no numbers, symbols, or consecutive spaces)'
      ),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot exceed 64 characters')
      .regex(/^\S*$/, 'Password cannot contain whitespace')
      .regex(UPPERCASE_REGEX, 'Password must contain at least one uppercase letter')
      .regex(LOWERCASE_REGEX, 'Password must contain at least one lowercase letter')
      .regex(DIGIT_REGEX, 'Password must contain at least one digit')
      .regex(PASSWORD_SPECIAL_CHAR_REGEX, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    job_title: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
