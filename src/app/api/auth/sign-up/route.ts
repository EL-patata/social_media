import { lucia } from '@/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Argon2id } from 'oslo/password';

export async function POST(req: Request) {
	const values = await req.json();

	try {
		// if user already exists, throw an error
		const existingUser = await prisma.user.findUnique({
			where: {
				email: values.email,
			},
		});
		if (existingUser) {
			return new NextResponse(
				JSON.stringify({
					message: 'Email already in use.',
					success: false,
				}),
				{ status: 409 }
			);
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
		return new NextResponse(
			JSON.stringify({
				message: 'Signed up successfully.',
				success: true,
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: 'Something went wrong.',
				success: false,
			})
		);
	}
}
