'use server';

import { lucia } from '@/auth';
import prisma from '@/lib/prisma';
import { SignInSchemaType, SignUpSchemaType } from '@/lib/validation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

export const signUp = async (values: SignUpSchemaType) => {
	try {
		// if user already exists, throw an error
		const existingUser = await prisma.user.findUnique({
			where: {
				email: values.email,
			},
		});
		if (existingUser) {
			return { error: 'User already exists', success: false };
		}

		const hashedPassword = await new Argon2id().hash(values.password);

		const user = await prisma.user.create({
			data: {
				email: values.email.toLowerCase(),
				username: values.username,
				hashedPassword,
			},
		});
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return { success: true };
	} catch (error) {
		return { error: 'Something went wrong', success: false };
	}
};

export const signIn = async (values: SignInSchemaType) => {
	const user = await prisma.user.findUnique({
		where: {
			email: values.email,
		},
	});
	if (!user || !user.hashedPassword) {
		return { success: false, error: 'Invalid Credentials!' };
	}
	const passwordMatch = await new Argon2id().verify(
		user.hashedPassword,
		values.password
	);
	if (!passwordMatch) {
		return { success: false, error: 'Invalid Credentials!' };
	}
	// successfully login
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = await lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return { success: true };
};

export const logOut = async () => {
	const sessionCookie = await lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/sign-in');
};
