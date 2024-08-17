import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { getUserLocale } from './locales/locale';

export const locales = ['en', 'ar'] as const;

export const defaultLocale = 'en';

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
