import { json, error } from '@sveltejs/kit';
import { getGuildId, getGuildRoles } from '$lib/server/discord';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const guildId = await getGuildId();
	if (!guildId) error(400, 'Guild not configured');

	const roles = await getGuildRoles(guildId);
	return json(roles);
};
