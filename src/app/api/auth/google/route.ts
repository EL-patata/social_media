import { googleOAuthClient } from '@/lib/googleOauth';
import { generateCodeVerifier, generateState } from 'arctic';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();

		cookies().set('codeVerifier', codeVerifier, {
			httpOnly: true,
			// secure: process.env.NODE_ENV === 'production',
		});
		cookies().set('state', state, {
			httpOnly: true,
			// secure: process.env.NODE_ENV === 'production',
		});

		const authUrl = await googleOAuthClient.createAuthorizationURL(
			state,
			codeVerifier,
			{
				scopes: ['email', 'profile'],
			}
		);
		return new NextResponse(
			JSON.stringify({
				success: true,
				url: authUrl.toString(),
				message: 'Initiating Oauth.',
			})
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				success: false,
				url: null,
				message: 'Something went wrong',
			})
		);
	}
}
