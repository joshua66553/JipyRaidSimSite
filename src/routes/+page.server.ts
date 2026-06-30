import { redirect } from '@sveltejs/kit';
import { getAccessiblePages } from '$lib/server/pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const pages = await getAccessiblePages(locals.userId, locals.roleIds);
	const target = pages[0]?.slug ?? 'general-info';
	throw redirect(303, `/${target}`);
};
