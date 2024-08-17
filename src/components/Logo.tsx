import Image from 'next/image';

export default function Logo() {
	return (
		<div className="relative  bg-gradient-to-br from-primary via-rose-500 to-primary  h-8 w-8 grid place-items-center rounded-full  ">
			<Image src="/main.svg" alt="logo" width={24} height={24} />
		</div>
	);
}
