import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
		return config;
	},
	experimental: {
		serverComponentsExternalPackages: ['@node-rs/argon2', '@node-rs/bcrypt'],
	},
};

export default withNextIntl(nextConfig);
