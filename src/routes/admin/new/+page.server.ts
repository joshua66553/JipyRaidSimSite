import { getSiteConfig } from '$lib/server/pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const config = await getSiteConfig();
	return {
		guildConfigured: Boolean(config?.discordGuildId)
	};
};
