import { error, redirect } from '@sveltejs/kit';
import { canViewPage } from '$lib/auth/access';
import { getPageBySlug, parsePageContent, getAllPages } from '$lib/server/pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const page = await getPageBySlug(params.slug);
	if (!page) error(404, 'Page not found');

	if (!canViewPage(locals.userId, page, locals.roleIds)) {
		throw redirect(303, '/access-denied');
	}

	const allPages = await getAllPages();
	const accessible = allPages.filter((p) => canViewPage(locals.userId, p, locals.roleIds));
	const idx = accessible.findIndex((p) => p.slug === params.slug);

	return {
		page: {
			slug: page.slug,
			title: page.title,
			description: page.description,
			content: parsePageContent(page.content),
			updatedAt: page.updatedAt
		},
		prev: idx > 0 ? accessible[idx - 1] : null,
		next: idx < accessible.length - 1 ? accessible[idx + 1] : null
	};
};
