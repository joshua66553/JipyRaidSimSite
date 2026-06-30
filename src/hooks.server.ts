import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { handle as authHandle } from '$lib/server/auth';
import { hasGlobalStaffRole } from '$lib/auth/access';
import { isAdmin } from '$lib/server/pages';
import type { Handle } from '@sveltejs/kit';

const PUBLIC_PREFIXES = ['/login', '/auth'];
const PUBLIC_EXACT = new Set(['/api/health']);

const guardHandle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (PUBLIC_EXACT.has(pathname) || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
		return resolve(event);
	}

	const session = await event.locals.auth();
	if (!session?.user?.discordId) {
		throw redirect(303, `/login?callbackUrl=${encodeURIComponent(pathname)}`);
	}

	const roleIds = session.user.roleIds ?? [];
	const admin = isAdmin(session.user.discordId);

	if (!admin && !hasGlobalStaffRole(roleIds)) {
		if (pathname !== '/access-denied') {
			throw redirect(303, '/access-denied');
		}
	}

	if (pathname.startsWith('/admin') && !admin) {
		throw redirect(303, '/access-denied');
	}

	event.locals.session = session;
	event.locals.userId = session.user.discordId;
	event.locals.roleIds = roleIds;
	event.locals.isAdmin = admin;

	return resolve(event);
};

export const handle = sequence(authHandle, guardHandle);
