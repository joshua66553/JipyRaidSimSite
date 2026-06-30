import { json, error } from '@sveltejs/kit';
import { getGuildId, searchGuildMembers } from '$lib/server/discord';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const guildId = await getGuildId();
	if (!guildId) error(400, 'Guild not configured');

	const q = url.searchParams.get('q') ?? '';
	const members = await searchGuildMembers(guildId, q);
	return json(members);
};
