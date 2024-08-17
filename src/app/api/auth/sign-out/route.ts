import { lucia, getUser } from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return new NextResponse(
			JSON.stringify({ message: 'Not signed in', success: false }),
			{ status: 401 }
		);
	}

	await lucia.invalidateSession(sessionId);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return new NextResponse(
		JSON.stringify({ message: 'Signed out successfully', success: true }),
		{ status: 200 }
	);
}
