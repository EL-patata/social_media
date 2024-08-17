import { Lucia, Session, User } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './lib/prisma';
import { cookies } from 'next/headers';
import { cache } from 'react';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'youssif-auth-cookie',
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);

		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
		} catch {}

		return result;
	}
);

export const getUser = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
	if (!sessionId) {
		return null;
	}
	const { session, user } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			// refreshing their session cookie
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch (error) {}
	const dbUser = await prisma.user.findUnique({
		where: {
			id: user?.id,
		},
		select: {
			id: true,
			username: true,
			email: true,
			image: true,
			createdAt: true,
		},
	});
	return dbUser;
};
