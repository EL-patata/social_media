import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { axios } from '@/lib/axios';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type Props = { isLoading: boolean };

export default function OAuthButtons({ isLoading }: Props) {
	const t = useTranslations();

	return (
		<div>
			<div
				aria-hidden
				className="text-sm text-muted-foreground relative w-full mb-3"
			>
				<div className="relative z-10 px-2 bg-background mx-auto w-fit h-fit">
					{t('auth.card.or')}
				</div>
				<span className="bg-muted-foreground  h-[1px] w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
			</div>
			<Button
				disabled={isLoading}
				onClick={async () => {
					const res = await axios.get('/api/auth/google');

					const data = JSON.parse(res.data) as {
						success: boolean;
						url: string | null;
						message: string;
					};
					if (data.success) window.location.href = data.url!;

					if (!data.success) toast.error(data.message);
				}}
				variant="outline"
				className="w-full gap-2 group"
				type="button"
			>
				<Image
					src={'/google_logo.svg'}
					alt="google logo"
					width={24}
					height={24}
				/>
				{t('auth.buttons.google')}
			</Button>
		</div>
	);
}
