'use client';
import OAuthButtons from '@/components/auth/OAuthButtons';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { axios } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function Page() {
	const t = useTranslations();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInSchema = z.object({
		email: z
			.string()
			.trim()
			.min(1, t('auth.validations.required'))
			.email(t('auth.validations.email.email'))
			.regex(/^((?!@gmail).)*$/, t('auth.validations.email.regex')),
		password: z.string().trim().min(8, t('auth.validations.password.min')),
	});

	type SignInSchemaType = z.infer<typeof signInSchema>;

	const form = useForm<SignInSchemaType>({
		resolver: zodResolver(signInSchema),
	});

	const router = useRouter();

	async function onSubmit(values: SignInSchemaType) {
		setIsLoading(true);

		const res = await axios
			.post('/api/auth/sign-in', JSON.stringify(values))
			.finally(() => setIsLoading(false));

		const data = JSON.parse(res.data) as {
			message: string;
			success: boolean;
		};

		if (!data.success)
			return toast.error(data.message, {
				duration: 10000,
				position: 'top-center',
			});

		if (data.success) {
			toast.success(data.message, { position: 'top-center' });

			return router.push('/');
		}
	}

	return (
		<Card className="mx-auto w-full md:my-auto md:max-w-xl">
			<CardHeader className="text-center">
				<span className="self-center">
					<Logo />
				</span>
				<CardTitle className="text-xl">
					{t('auth.card.sign_in.title')}
				</CardTitle>
				<CardDescription>{t('auth.card.sign_in.sub_title')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<Label
							htmlFor="email"
							className="flex items-center justify-between"
						>
							{t('auth.card.sign_in.email')}
							<span className="text-destructive">
								{form.formState.errors.email?.message}
							</span>
						</Label>
						<Input
							{...form.register('email')}
							id="email"
							type="email"
							placeholder="me@example.com"
						/>
					</div>
					<div className="grid gap-2">
						<Label
							htmlFor="password"
							className="flex items-center justify-between"
						>
							{t('auth.card.sign_in.password')}
							<span className="text-destructive">
								{form.formState.errors.password?.message}
							</span>
						</Label>
						<Input
							{...form.register('password')}
							id="password"
							type="password"
							placeholder="••••••••••"
						/>
					</div>
					<Button disabled={isLoading} type="submit" className="w-full">
						{t('auth.buttons.sign_in')}
						{isLoading ? <Loader2 className="animate-spin" /> : null}
					</Button>

					<OAuthButtons isLoading={isLoading} />
				</form>
				<div className="mt-4 text-center text-sm">
					{t('auth.card.sign_in.footer') + ' '}
					<Link
						href="/sign-up"
						className="font-semibold hover:underline text-primary"
					>
						{t('auth.buttons.sign_up')}
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
