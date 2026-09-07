import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PASSWORD_SPECIAL_CHAR_REGEX,
  hasUppercase,
  hasLowercase,
  hasDigit,
} from '@/lib/validation/auth';

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    {
      label: 'One uppercase, lowercase, and digit',
      met: hasUppercase(password) && hasLowercase(password) && hasDigit(password),
    },
    { label: 'One special character', met: PASSWORD_SPECIAL_CHAR_REGEX.test(password) },
  ];

  return (
    <ul aria-live="polite" className="space-y-2 rounded-lg bg-primary-200 p-4">
      {requirements.map((req) => (
        <li key={req.label} className="flex items-center gap-2 text-xs text-body-text">
          <span
            aria-hidden="true"
            className={cn(
              'flex h-3 w-3 shrink-0 items-center justify-center rounded-full',
              req.met ? 'bg-emerald-700 text-white' : 'bg-slate-200'
            )}
          >
            {req.met && <Check className="h-2.5 w-2.5" strokeWidth={4} />}
          </span>
          {req.label}
        </li>
      ))}
    </ul>
  );
}
