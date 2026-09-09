'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

const RESEND_SECONDS = 300;

export function useResetPasswordRequest() {
  const supabase = createClient();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  async function request(email: string, { silent = false } = {}) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      toast.error(error.message);
      return false;
    }
    if (silent) toast.success('Reset link sent again.');
    setSentTo(email);
    setCooldown(RESEND_SECONDS);
    return true;
  }

  return { sentTo, cooldown, request };
}
