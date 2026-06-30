import { fail } from '@sveltejs/kit';
import { getSiteConfig, upsertSiteConfig } from '$lib/server/pages';
import { verifyGuild } from '$lib/server/discord';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const config = await getSiteConfig();
	return { guildId: config?.discordGuildId ?? '' };
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const form = await request.formData();
		const guildId = (form.get('guildId') as string)?.trim();

		if (!guildId) {
			return fail(400, { error: 'Guild ID is required', guildId: '' });
		}

		try {
			const guild = await verifyGuild(guildId);
			await upsertSiteConfig(guildId, locals.userId);
			return { success: true, guildName: guild.name, guildId };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Failed to verify guild';
			return fail(400, { error: message, guildId });
		}
	}
};
