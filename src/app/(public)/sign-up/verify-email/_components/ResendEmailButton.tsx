'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';

import { resendEmail } from '../_actions/resendEmail';

type Props = {
  email: string;
};

const COOLDOWN_SECONDS = 60;

export function ResendEmailButton({ email }: Props) {
  const t = useTranslations('verifyEmail');
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const { error, isLoading, execute } = useServerAction({
    rateLimitedError: t('rateLimited'),
    fallbackError: t('resendError'),
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    setMessage('');

    const result = await execute(() => resendEmail(email));

    if (!('error' in result)) {
      setMessage(t('resendSuccess'));
      setCooldown(COOLDOWN_SECONDS);
    }
  };

  const isDisabled = isLoading || !email || cooldown > 0;
  const displayMessage = error || message;

  return (
    <div className="space-y-2">
      <Button
        onClick={handleResend}
        disabled={isDisabled}
      >
        {isLoading
          ? t('resendLoading')
          : cooldown > 0
            ? t('resendCooldown', { seconds: cooldown })
            : t('resendButton')}
      </Button>
      {displayMessage && <p className="text-sm text-muted-foreground">{displayMessage}</p>}
    </div>
  );
}
