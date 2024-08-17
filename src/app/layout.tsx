import { Inter as FontSans, Cairo, Roboto_Mono } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import ReactQueryProvider from '@/components/context/react-query-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/context/theme-provider';
import { getLocale, getMessages } from 'next-intl/server';
import DirectionProvider from '@/components/context/direction-provider';
import { NextIntlClientProvider } from 'next-intl';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default async function RootLayout({ children }: PropsWithChildren) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head />
			<body
				className={cn(
					'min-h-screen bg-background',
					locale === 'ar' ? 'font-cairo' : 'font-sans'
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<DirectionProvider locale={locale}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<ReactQueryProvider>{children}</ReactQueryProvider>
							<Toaster richColors={true} position="top-center" />
						</ThemeProvider>
					</DirectionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
