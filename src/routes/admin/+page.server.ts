import { getAllPages, getSiteConfig } from '$lib/server/pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [pages, config] = await Promise.all([getAllPages(), getSiteConfig()]);
	return {
		pages: pages.map((p) => ({
			slug: p.slug,
			title: p.title,
			updatedAt: p.updatedAt,
			allowedRoleIds: p.allowedRoleIds,
			allowedUserIds: p.allowedUserIds
		})),
		guildConfigured: Boolean(config?.discordGuildId)
	};
};
