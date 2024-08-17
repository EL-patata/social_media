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

	const signUpSchema = z.object({
		email: z
			.string()
			.trim()
			.min(1, t('auth.validations.required'))
			.email(t('auth.validations.email.email'))
			.regex(/^((?!@gmail).)*$/, t('auth.validations.email.regex')),
		username: z
			.string()
			.trim()
			.min(1, t('auth.validations.required'))
			.max(16, t('auth.validations.username.max'))
			.regex(
				/^[a-z-A-Z0-9_-\s]*$/,
				'Only letters,numbers,spaces ,-, and _ are allowed'
			),
		password: z.string().trim().min(8, t('auth.validations.password.min')),
	});

	type SignUpSchemaType = z.infer<typeof signUpSchema>;

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
	});

	const router = useRouter();

	async function onSubmit(values: SignUpSchemaType) {
		setIsLoading(true);
		const res = await axios
			.post('/api/auth/sign-up', JSON.stringify(values))
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
					{t('auth.card.sign_up.title')}
				</CardTitle>
				<CardDescription>{t('auth.card.sign_up.sub_title')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<Label
							htmlFor="username"
							className="flex items-center justify-between flex-wrap gap-2"
						>
							{t('auth.card.sign_up.username')}
							<span className="text-destructive">
								{form.formState.errors.username?.message}
							</span>
						</Label>
						<Input
							{...form.register('username')}
							id="username"
							type="username"
							placeholder="example"
						/>
					</div>
					<div className="grid gap-2">
						<Label
							htmlFor="email"
							className="flex items-center justify-between"
						>
							{t('auth.card.sign_up.email')}
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
							{t('auth.card.sign_up.password')}
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
						{t('auth.buttons.sign_up')}
						{isLoading ? <Loader2 className="animate-spin" /> : null}
					</Button>

					<OAuthButtons isLoading={isLoading} />
				</form>
				<div className="mt-4 text-center text-sm">
					{t('auth.card.sign_up.footer') + ' '}
					<Link
						href="/sign-in"
						className="font-semibold hover:underline text-primary"
					>
						{t('auth.buttons.sign_in')}
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
