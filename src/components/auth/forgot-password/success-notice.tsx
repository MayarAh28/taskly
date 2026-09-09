import { Check } from 'lucide-react';

export function SuccessNotice({ email }: { email: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-success/15 p-4" role="status">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-foreground">
        <Check className="h-3 w-3 text-success" strokeWidth={3} />
      </span>
      <p className="text-body-md text-success-foreground">
        If an account exists with <span className="font-medium">{email}</span>, we&apos;ve sent a
        password reset link.
      </p>
    </div>
  );
}
