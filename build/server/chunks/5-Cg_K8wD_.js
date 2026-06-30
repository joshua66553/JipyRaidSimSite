import { v as verifyGuild } from './discord-BYjBnNev.js';
import { d as upsertSiteConfig, c as getSiteConfig } from './pages-RIbRYNlC.js';
import { z as fail } from './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/admin/settings/+page.server.ts
var load = async () => {
	return { guildId: (await getSiteConfig())?.discordGuildId ?? "" };
};
var actions = { save: async ({ request, locals }) => {
	const guildId = (await request.formData()).get("guildId")?.trim();
	if (!guildId) return fail(400, {
		error: "Guild ID is required",
		guildId: ""
	});
	try {
		const guild = await verifyGuild(guildId);
		await upsertSiteConfig(guildId, locals.userId);
		return {
			success: true,
			guildName: guild.name,
			guildId
		};
	} catch (e) {
		return fail(400, {
			error: e instanceof Error ? e.message : "Failed to verify guild",
			guildId
		});
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BtIIr36G.js')).default;
const server_id = "src/routes/admin/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/5.CS3Bwwwy.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C8yttuNe.js","_app/immutable/chunks/DBfKggBr.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-Cg_K8wD_.js.map
