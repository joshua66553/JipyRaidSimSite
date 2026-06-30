import { g as getGuildId, s as searchGuildMembers } from './discord-BYjBnNev.js';
import { e as error, j as json } from './index.js-H2yCcV1v.js';

//#region src/routes/api/discord/members/+server.ts
var GET = async ({ url, locals }) => {
	if (!locals.isAdmin) error(403, "Forbidden");
	const guildId = await getGuildId();
	if (!guildId) error(400, "Guild not configured");
	return json(await searchGuildMembers(guildId, url.searchParams.get("q") ?? ""));
};

export { GET };
//# sourceMappingURL=_server.ts-akydgSxH.js.map
