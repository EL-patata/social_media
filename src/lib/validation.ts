import { z } from 'zod';

export const signInSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'auth.validations.required')
		.email('auth.validations.email.email')
		.regex(/^((?!@gmail).)*$/, 'auth.validations.email.regex'),
	password: z.string().trim().min(8, 'auth.validations.password.min'),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'auth.validations.required')
		.email('auth.validations.email.email')
		.regex(/^((?!@gmail).)*$/, 'auth.validations.email.regex'),
	username: z
		.string()
		.trim()
		.min(1, 'auth.validations.required')
		.max(16, 'auth.validations.username.max')
		.regex(
			/^[a-z-A-Z0-9_-\s]*$/,
			'Only letters,numbers,spaces ,-, and _ are allowed'
		),
	password: z.string().trim().min(8, 'auth.validations.password.min'),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
