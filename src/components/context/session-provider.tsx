'use client';

import { User } from '@prisma/client';
import { Session } from 'lucia';
import React, { createContext, useContext } from 'react';

interface SessionContext {
	user: {
		id: string;
		username: string | null;
		email: string;
		image: string | null;
		createdAt: Date;
	};
	session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
	children,
	value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

export function useSession() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useSession must be used within a SessionProvider');
	}
	return context;
}
