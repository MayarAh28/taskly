import { z } from 'zod';

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
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
    jobTitle: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
