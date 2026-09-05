import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 items-center rounded bg-[#D7E2FF] px-4 py-3 text-sm text-foreground outline-none transition-colors',
        'placeholder:text-[#6B7280]',
        'focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:bg-[#FFDAD6] aria-invalid:text-[#93000A] aria-invalid:placeholder:text-[#93000A]/70',
        'md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Input };
