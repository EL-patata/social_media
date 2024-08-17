'use client';

import { locales } from '@/i18n';
import { setUserLocale } from '@/locales/locale';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu';

type Props = {};

export default function LocaleChanger({}: Props) {
	const t = useTranslations();

	function onChange(value: string) {
		const locale = value as (typeof locales)[0];
		setUserLocale(locale).then(() => {});
	}

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="gap-2">
				<Globe />
				{t('dropdown.locale_changer.title')}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				{locales.map((locale, index) => (
					<DropdownMenuItem key={index} onClick={() => onChange(locale)}>
						{locale === 'ar' ? 'العربية' : 'English'}
					</DropdownMenuItem>
				))}
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
