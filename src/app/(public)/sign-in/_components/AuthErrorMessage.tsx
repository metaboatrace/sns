import { getTranslations } from 'next-intl/server';

import { FormErrorMessage } from '@/components/ui/form-error-message';

type Props = {
  namespace?: 'signIn' | 'signUp';
};

export async function AuthErrorMessage({ namespace = 'signIn' }: Props) {
  const t = await getTranslations(namespace);

  return (
    <FormErrorMessage
      message={t('authError')}
      className="max-w-sm mx-auto mb-4"
    />
  );
}
