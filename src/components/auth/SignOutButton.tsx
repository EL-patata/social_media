'use client';

import { Loader2, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Props = {};

export default function SignOutButton({}: Props) {
	const t = useTranslations();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	async function signOut() {
		setIsLoading(true);

		await axios.get('/api/auth/sign-out').finally(() => setIsLoading(false));

		return router.push('/sign-in');
	}

	return (
		<Button
			size={'sm'}
			disabled={isLoading}
			onClick={signOut}
			className="gap-2"
		>
			{t('auth.buttons.sign_out')}{' '}
			{isLoading ? (
				<Loader2 className="animate-spin w-4 h-4" />
			) : (
				<LogOut className="w-4 h-4" />
			)}
		</Button>
	);
}
