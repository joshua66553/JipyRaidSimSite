import type { Session } from '@auth/core/types';
import type { Handle } from '@sveltejs/kit';

declare global {
	namespace App {
		interface Locals {
			auth: () => Promise<Session | null>;
			session: Session | null;
			userId: string;
			roleIds: string[];
			isAdmin: boolean;
		}
	}
}

export {};
