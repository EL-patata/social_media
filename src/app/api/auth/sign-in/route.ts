import { lucia } from '@/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Argon2id } from 'oslo/password';

export async function POST(req: Request) {
	const values = await req.json();

	const user = await prisma.user.findUnique({
		where: {
			email: values.email,
		},
	});
	if (!user) {
		return new NextResponse(
			JSON.stringify({
				message: 'Invalid credentials.',
				success: false,
			}),
			{ status: 404 }
		);
	}
	if (!user || !user.hashedPassword) {
		return new NextResponse(
			JSON.stringify({
				message: 'Invalid credentials.',
				success: false,
			}),
			{ status: 404 }
		);
	}
	const passwordMatch = await new Argon2id().verify(
		user.hashedPassword,
		values.password
	);
	if (!passwordMatch) {
		return new NextResponse(
			JSON.stringify({
				message: 'Invalid credentials.',
				success: false,
			}),
			{ status: 404 }
		);
	}
	// successfully login
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = await lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return new NextResponse(
		JSON.stringify({
			message: 'Signed in successfully.',
			success: true,
		}),
		{ status: 200 }
	);
}
