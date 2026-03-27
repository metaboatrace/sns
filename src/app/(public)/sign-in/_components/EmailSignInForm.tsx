'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useServerAction } from '@/hooks/useServerAction';

import { signIn } from '../_actions/signIn';

export function EmailSignInForm() {
  const t = useTranslations('signIn');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading, execute, setIsLoading } = useServerAction({
    rateLimitedError: t('rateLimited'),
    fallbackError: t('emailSignInError'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await execute(() => signIn(email, password));

    if (!('error' in result)) {
      router.push('/mypage');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      {error && <FormErrorMessage message={error} />}

      <div>
        <Label htmlFor="signin-email" className="mb-1">
          {t('emailLabel')}
        </Label>
        <Input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="signin-password" className="mb-1">
          {t('passwordLabel')}
        </Label>
        <Input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder={t('passwordPlaceholder')}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('emailSignInLoading') : t('emailSignIn')}
      </Button>
    </form>
  );
}
