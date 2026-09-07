'use client';

import { createClient } from '@/lib/supabase/client';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ForgotPasswordForm() {
  const supabase = createClient();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email for a reset link.');
    }
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...form.register('email')} required />
        {form.formState.errors.email && (
          <p style={{ color: 'red' }}>{form.formState.errors.email.message}</p>
        )}
        <button type="submit" disabled={form.formState.isSubmitting}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
