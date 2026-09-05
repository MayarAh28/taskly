'use client';

import { createClient } from '@/lib/supabase/client';
import { LoginFormData, loginSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remeberMe: false,
    },
  });

  async function onSubmit(data: LoginFormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    router.push('/project');
  }

  return (
    <div className="relative isolate flex min-h-lvh w-full flex-col items-center bg-[#F5F7FF] px-4 pb-12 pt-8 justify-center sm:bg-background sm:px-6 sm:py-12">
      <div className="relative z-10 w-full max-w-md rounded-lg bg-transparent p-0 sm:max-w-xl sm:rounded-lg sm:bg-card sm:p-12 sm:shadow-[0px_24px_48px_rgba(4,27,60,0.06)]">
        <div className="mb-8 space-y-2 text-center sm:mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-headline-lg">
            Welcome Back
          </h1>
          <p className="text-sm text-body-text sm:text-body-md">
            Please enter your details to access your workspace
          </p>
        </div>

        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="yourname@company.com"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-primary hover:underline sm:hidden"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      type={showPassword ? 'text' : 'password'}
                      className="pr-11"
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

            <div className="flex items-center justify-between">
              <Controller
                name="remeberMe"
                control={form.control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Remember Me"
                    />
                    Remember Me
                  </label>
                )}
              />
              <Link
                href="/forgot-password"
                className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
              >
                Forgot Password?
              </Link>
            </div>
          </FieldGroup>

          <Button
            type="submit"
            form="login-form"
            variant="gradient"
            size="cta"
            className="mt-8 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Logging in…
              </>
            ) : (
              'Log In'
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-body-text">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
