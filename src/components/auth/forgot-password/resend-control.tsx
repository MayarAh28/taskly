import { Timer } from 'lucide-react';
import { formatCountdown } from '@/lib/auth/format-countdown';

export function ResendControl({
  cooldown,
  onResend,
  variant,
}: {
  cooldown: number;
  onResend: () => void;
  variant: 'button' | 'inline';
}) {
  const label = cooldown > 0 ? `Resend in ${formatCountdown(cooldown)}` : 'Resend link';

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-between">
        <span className="text-label-sm uppercase text-success-foreground/70">
          Didn&apos;t receive email?
        </span>
        <button
          type="button"
          onClick={onResend}
          disabled={cooldown > 0}
          className="text-label-sm uppercase text-primary transition enabled:hover:text-primary-700 disabled:cursor-not-allowed disabled:text-success-foreground/60"
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="text-label-sm mt-6 text-center uppercase text-muted-foreground">
        Didn&apos;t receive the email?
      </p>
      <button
        type="button"
        onClick={onResend}
        disabled={cooldown > 0}
        className="text-body-md mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-muted py-3.5 font-medium text-muted-foreground transition enabled:hover:bg-primary-200 enabled:hover:text-card-foreground disabled:cursor-not-allowed"
      >
        <Timer className="h-4 w-4" strokeWidth={2} />
        {label}
      </button>
    </>
  );
}
