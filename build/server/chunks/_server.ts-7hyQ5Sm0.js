import { g as getGuildId, a as getGuildRoles } from './discord-BYjBnNev.js';
import { e as error, j as json } from './index.js-H2yCcV1v.js';

//#region src/routes/api/discord/roles/+server.ts
var GET = async ({ locals }) => {
	if (!locals.isAdmin) error(403, "Forbidden");
	const guildId = await getGuildId();
	if (!guildId) error(400, "Guild not configured");
	return json(await getGuildRoles(guildId));
};

export { GET };
//# sourceMappingURL=_server.ts-7hyQ5Sm0.js.map
