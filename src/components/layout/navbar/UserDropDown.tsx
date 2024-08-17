'use client';
import { Loader2 } from 'lucide-react';
import SignOutButton from '../../auth/SignOutButton';
import { useSession } from '../../context/session-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import LocaleChanger from './LocaleChanger';
import ThemeChanger from './ThemeChanger';

export default function UserDropDown() {
	const { user } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="rounded-full w-11 h-11" variant={'ghost'}>
					<Avatar>
						<AvatarImage src={user.image || '/default.png'} alt="@shadcn" />
						<AvatarFallback>
							<Loader2 className="animate-spin" />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="center"
				className="flex flex-col justify-center gap-1 md:w-48"
			>
				<DropdownMenuLabel>{user.username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ThemeChanger />
				<LocaleChanger />
				<DropdownMenuItem asChild>
					<SignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
