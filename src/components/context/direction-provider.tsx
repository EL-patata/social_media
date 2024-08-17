'use client';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { PropsWithChildren } from 'react';

export default function DirectionProvider({
	locale,
	children,
}: PropsWithChildren<{ locale: string }>) {
	return (
		<RadixDirectionProvider dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			{children}
		</RadixDirectionProvider>
	);
}
