'use client';
import { Monitor, Moon, Paintbrush, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu';

type Props = {};

export default function ThemeChanger({}: Props) {
	const t = useTranslations();

	const { setTheme } = useTheme();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="gap-2">
				<Paintbrush />
				{t('dropdown.theme_changer.title')}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuItem className="gap-2" onClick={() => setTheme('light')}>
					<Sun /> {t('dropdown.theme_changer.light')}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2" onClick={() => setTheme('dark')}>
					<Moon />
					{t('dropdown.theme_changer.dark')}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2" onClick={() => setTheme('system')}>
					<Monitor /> {t('dropdown.theme_changer.system')}
				</DropdownMenuItem>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
