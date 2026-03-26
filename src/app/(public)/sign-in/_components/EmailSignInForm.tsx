'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { FormErrorMessage } from '@/components/ui/form-error-message';

import { signIn } from '../_actions/signIn';

export function EmailSignInForm() {
  const t = useTranslations('signIn');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if ('error' in result) {
        switch (result.error) {
          case 'rateLimited':
            setError(t('rateLimited'));
            break;
          case 'invalidCredentials':
            setError(t('emailSignInError'));
            break;
          default:
            setError(t('emailSignInError'));
        }
        setIsLoading(false);
        return;
      }

      router.push('/mypage');
      router.refresh();
    } catch {
      setError(t('emailSignInError'));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      {error && <FormErrorMessage message={error} />}

      <div>
        <label htmlFor="signin-email" className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
          {t('emailLabel')}
        </label>
        <input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder={t('emailPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="signin-password" className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
          {t('passwordLabel')}
        </label>
        <input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder={t('passwordPlaceholder')}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('emailSignInLoading') : t('emailSignIn')}
      </button>
    </form>
  );
}
