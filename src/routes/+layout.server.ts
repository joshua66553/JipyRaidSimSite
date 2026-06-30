import { getAccessiblePages, isAdmin } from '$lib/server/pages';
import { getSiteName } from '$lib/config/site';
import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const publicRoute =
		url.pathname.startsWith('/login') ||
		url.pathname.startsWith('/auth') ||
		url.pathname === '/access-denied';

	const siteName = getSiteName(env.PUBLIC_SITE_NAME);

	if (publicRoute || !locals.userId) {
		return {
			navPages: [],
			session: null,
			isAdmin: false,
			siteName
		};
	}

	const navPages = await getAccessiblePages(locals.userId, locals.roleIds);

	return {
		navPages,
		session: locals.session,
		isAdmin: locals.isAdmin ?? isAdmin(locals.userId),
		siteName
	};
};
