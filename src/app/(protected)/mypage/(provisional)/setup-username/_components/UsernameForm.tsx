'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { validateUsername } from '@/lib/username';

export function UsernameForm() {
  const t = useTranslations('setupUsername');
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  function getValidationMessage(errorKey: string): string {
    switch (errorKey) {
      case 'too_short': return t('validation.tooShort');
      case 'too_long': return t('validation.tooLong');
      case 'invalid_format': return t('validation.invalidFormat');
      case 'reserved': return t('validation.reserved');
      case 'username_taken': return t('validation.taken');
      case 'username_already_set': return t('validation.alreadySet');
      case 'username_inappropriate': return t('validation.inappropriate');
      case 'rate_limited': return t('validation.rateLimited');
      default: return t('validation.error');
    }
  }

  function handleUsernameChange(value: string) {
    setUsername(value);
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const validationError = validateUsername(username.trim());
    if (validationError) {
      setError(getValidationMessage(validationError));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          displayName: displayName.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(getValidationMessage(data.error));
        return;
      }

      router.push('/mypage');
    } catch {
      setError(t('validation.error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="username">{t('usernameLabel')}</Label>
        <p className="text-sm text-muted-foreground">{t('usernameDescription')}</p>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder={t('usernamePlaceholder')}
          maxLength={20}
          required
        />
        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
          <li>{t('usernameHint')}</li>
          <li>{t('cannotChange')}</li>
          <li>{t('inappropriateWarning')}</li>
        </ul>
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayName">{t('displayNameLabel')}</Label>
        <p className="text-sm text-muted-foreground">{t('displayNameDescription')}</p>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('displayNamePlaceholder')}
          maxLength={50}
        />
        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
          <li>{t('displayNameCanChange')}</li>
          <li>{t('displayNameMaxLength')}</li>
        </ul>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-start gap-2">
        <input
          id="agreedToTerms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="agreedToTerms" className="text-sm">
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline">
            {t('termsLink')}
          </a>
          {t('agreeToTerms')}
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting || !agreedToTerms}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
