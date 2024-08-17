import { getUser, validateRequest } from '@/auth';
import SessionProvider from '@/components/context/session-provider';
import Navbar from '@/components/layout/navbar/Navbar';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function layout({ children }: PropsWithChildren) {
	const user = await getUser();

	const { session } = await validateRequest();

	if (!user || !session) return redirect('/sign-in');

	return (
		<main className="bg-secondary min-h-[1000vh] w-full">
			<SessionProvider value={{ user: user!, session }}>
				<Navbar />
				{children}
			</SessionProvider>
		</main>
	);
}
