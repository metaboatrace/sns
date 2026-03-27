'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MIN_PASSWORD_LENGTH } from '@/config';
import { useServerAction } from '@/hooks/useServerAction';

import {
  getPasswordValidationError,
  isPasswordValidationErrorKey,
} from '@/lib/validations/password';

import { signUp } from '../_actions/signUp';

export function EmailSignUpForm() {
  const t = useTranslations('signUp');
  const tPassword = useTranslations('validation.password');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, isLoading, execute, setError } = useServerAction({
    rateLimitedError: t('rateLimited'),
    fallbackError: t('emailSignUpError'),
    errorMap: {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    const passwordError = getPasswordValidationError(password);
    if (passwordError) {
      setError(tPassword(passwordError, { minLength: MIN_PASSWORD_LENGTH }));
      return;
    }

    const result = await execute(() => signUp(email, password));

    if ('error' in result) {
      // Override the hook's fallback error for server-side password validation errors
      const serverError = result.error;
      if (serverError.startsWith('password:')) {
        const key = serverError.slice('password:'.length);
        if (isPasswordValidationErrorKey(key)) {
          setError(tPassword(key, { minLength: MIN_PASSWORD_LENGTH }));
        }
      }
      return;
    }

    router.push(`/sign-up/verify-email?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      {error && <FormErrorMessage message={error} />}

      <div>
        <Label htmlFor="email" className="mb-1">
          {t('emailLabel')}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="password" className="mb-1">
          {t('passwordLabel')}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          placeholder={t('passwordPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="mb-1">
          {t('confirmPasswordLabel')}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          placeholder={t('confirmPasswordPlaceholder')}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('emailSignUpLoading') : t('emailSignUp')}
      </Button>
    </form>
  );
}
