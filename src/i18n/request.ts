import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['ja'];

export default getRequestConfig(async () => {
    // Try to get locale from a cookie
    const cookieStore = await cookies();
    let locale = cookieStore.get('NEXT_LOCALE')?.value || 'ja';

    // Ensure the locale is supported, otherwise fallback to 'ja'
    // This prevents errors if a cookie from another app (like 'en') is present
    if (!SUPPORTED_LOCALES.includes(locale)) {
        locale = 'ja';
    }

    return {
        locale,
        messages: (await import(`@/messages/${locale}.json`)).default,
        timeZone: 'Asia/Tokyo',
    };
});

