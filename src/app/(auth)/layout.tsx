import { getUser } from '@/auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function layout({ children }: PropsWithChildren) {
	const user = await getUser();

	if (user && user?.id) return redirect('/');
	else
		return (
			<div className="flex h-screen my-auto bg-background">{children}</div>
		);
}
