'use client';

import { SignUpFormData, signUpSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import PasswordRequirements from './PasswordRequirements';

const inputClassName =
  'h-12 rounded border-0 bg-primary-400 px-4 text-base text-foreground placeholder:text-muted-foreground sm:h-14 sm:rounded-lg';

const eyebrowLabelClassName = 'text-label-sm uppercase text-muted-foreground';

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      job_title: '',
    },
  });
  const password = form.watch('password');

  async function onSubmit(data: SignUpFormData) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          job_title: data.job_title,
        },
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    router.push('/project');
  }

  return (
    <div className="relative isolate flex min-h-full w-full items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6">
     
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 hidden h-64 w-64 rounded-xl bg-primary/20 opacity-40 blur-3xl sm:block"
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-card p-8 shadow-[0px_24px_48px_rgba(4,27,60,0.06)] sm:max-w-xl sm:rounded-lg sm:p-12">
        <div className="mb-8 space-y-2 text-center sm:mb-10 sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-headline-lg">
            Create your workspace
          </h1>
          <p className="text-sm text-body-text sm:text-body-md">
            Join the editorial approach to task management.
          </p>
        </div>

        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={eyebrowLabelClassName}>
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    className={inputClassName}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>3–50 characters, letters only.</FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={eyebrowLabelClassName}>
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="yourname@company.com"
                    className={inputClassName}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="job_title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={eyebrowLabelClassName}>
                    Job title <span className="normal-case">(optional)</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Project Manager"
                    className={inputClassName}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className={eyebrowLabelClassName}>
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        className={`${inputClassName} pr-11`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                        className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <Eye className="h-5 w-5" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className={eyebrowLabelClassName}>
                      Confirm password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Repeat your password"
                      type={showPassword ? 'text' : 'password'}
                      className={inputClassName}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="hidden sm:block">
              <PasswordRequirements password={password} />
            </div>
          </FieldGroup>

          <Button
            type="submit"
            form="sign-up-form"
            disabled={form.formState.isSubmitting}
            className="mt-8 h-14 w-full rounded bg-gradient-to-r from-primary-700 to-primary-500 text-base font-semibold text-primary-foreground shadow-sm hover:opacity-95 sm:rounded-lg"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-body-text">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
