'use client';

import Link from 'next/link';
import Logo from '../../Logo';
import UserDropDown from './UserDropDown';

type Props = {};

export default function Navbar({}: Props) {
	return (
		<nav className="bg-background flex items-center justify-between gap-2 px-4 lg:px-32 h-16 md:sticky top-0 transition-all border-b">
			{/* {JSON.stringify(user)} */}
			<Link href="/">
				<Logo />
			</Link>
			<UserDropDown />
		</nav>
	);
}
