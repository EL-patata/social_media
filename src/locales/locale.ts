'use server';

import { cookies } from 'next/headers';
import { locales, defaultLocale } from '@/i18n';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
	const locale = cookies().get(COOKIE_NAME)?.value || defaultLocale;

	const localeExists = locales.find((mappedLocale) => mappedLocale === locale);

	return localeExists ? locale : defaultLocale;
}

export async function setUserLocale(locale: (typeof locales)[0]) {
	cookies().set(COOKIE_NAME, locale);
}
