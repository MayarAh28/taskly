'use client';

import { createClient } from '@/lib/supabase/client';
import { UpdatePasswordFormData, updatePasswordSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PasswordRequirements from '../PasswordRequirements';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: UpdatePasswordFormData) {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
    }
    toast.success('Password updated successfully');
    router.push('/login');
  }
  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="password">New Password:</label>
        <input type="password" id="password" {...form.register('password')} required />
        {form.formState.errors.password && (
          <p style={{ color: 'red' }}>{form.formState.errors.password.message}</p>
        )}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...form.register('confirmPassword')}
          required
        />
        {form.formState.errors.confirmPassword && (
          <p style={{ color: 'red' }}>{form.formState.errors.confirmPassword.message}</p>
        )}
        <PasswordRequirements password={form.watch('password')} />
        <button type="submit" disabled={form.formState.isSubmitting}>
          Update Password
        </button>
      </form>
    </div>
  );
}
