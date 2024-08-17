import { useTranslations } from 'next-intl';

type Props = {};

export default function Page({}: Props) {
	const t = useTranslations();

	return <div>{'home'}</div>;
}
