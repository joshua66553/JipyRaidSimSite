import { error } from '@sveltejs/kit';
import { getPageBySlug, parsePageContent, getSiteConfig } from '$lib/server/pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [page, config] = await Promise.all([
		getPageBySlug(params.slug),
		getSiteConfig()
	]);

	if (!page) error(404, 'Page not found');

	return {
		page: {
			slug: page.slug,
			title: page.title,
			description: page.description ?? '',
			content: parsePageContent(page.content),
			allowedRoleIds: page.allowedRoleIds,
			allowedUserIds: page.allowedUserIds
		},
		guildConfigured: Boolean(config?.discordGuildId)
	};
};
