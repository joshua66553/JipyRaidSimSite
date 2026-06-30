import { signIn } from '$lib/server/auth';
import { getSiteName } from '$lib/config/site';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => ({
	siteName: getSiteName(env.PUBLIC_SITE_NAME),
	callbackUrl: url.searchParams.get('callbackUrl') ?? '/general-info'
});

export const actions: Actions = {
	default: signIn
};
