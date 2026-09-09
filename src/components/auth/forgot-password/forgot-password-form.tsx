'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/lib/validation/auth';
import { useResetPasswordRequest } from './use-reset-password-request';
import { SuccessNotice } from './success-notice';
import { ResendControl } from './resend-control';

export default function ForgotPasswordForm() {
  const { sentTo, cooldown, request } = useResetPasswordRequest();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    await request(data.email);
  }

  function onResend() {
    if (sentTo && cooldown === 0) request(sentTo, { silent: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="rounded-xl border border-border-subtle bg-card p-8 shadow-[0_1px_2px_rgba(4,27,60,0.04),0_20px_40px_-20px_rgba(4,27,60,0.15)] sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-200 sm:hidden">
            <KeyRound className="h-7 w-7 text-primary" strokeWidth={2} />
          </div>

          <h1 className="text-headline-lg text-center text-card-foreground sm:text-left">
            Forgot password?
          </h1>
          <p className="text-body-md mx-auto mt-2 max-w-[260px] text-center text-muted-foreground sm:mx-0 sm:max-w-none sm:text-left">
            No worries, we&apos;ll send you reset instructions.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7" noValidate>
            <label
              htmlFor="email"
              className="text-label-sm mb-2 block uppercase text-muted-foreground"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
              {...form.register('email')}
              className="text-body-md w-full rounded-md border border-transparent bg-primary-300 px-4 py-3.5 text-card-foreground placeholder:text-slate-500 outline-none transition focus:bg-card focus:ring-2 focus:ring-ring"
            />
            {form.formState.errors.email && (
              <p id="email-error" className="mt-1.5 text-[13px] text-destructive" role="alert">
                {form.formState.errors.email.message}
              </p>
            )}

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="text-title-md mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-primary-foreground transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
              )}
              {form.formState.isSubmitting ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>

          <Link
            href="/login"
            className="text-body-md mt-6 flex items-center justify-center gap-2 font-medium text-primary transition hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Back to log in
          </Link>

          {sentTo && (
            <div className="hidden sm:block">
              <div className="my-7 h-px bg-border" />
              <SuccessNotice email={sentTo} />
              <ResendControl cooldown={cooldown} onResend={onResend} variant="button" />
            </div>
          )}
        </div>

        {sentTo && (
          <div className="mt-4 rounded-xl bg-success/15 p-4 sm:hidden">
            <SuccessNotice email={sentTo} />
            <div className="my-3 h-px bg-success-foreground/15" />
            <ResendControl cooldown={cooldown} onResend={onResend} variant="inline" />
          </div>
        )}
      </div>
    </div>
  );
}
