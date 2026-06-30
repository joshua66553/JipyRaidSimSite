import { b as getAllPages, c as getSiteConfig } from './pages-RIbRYNlC.js';
import './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/admin/+page.server.ts
var load = async () => {
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B6AzL7gh.js')).default;
const server_id = "src/routes/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/4.BVZuGqhP.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-KmybQP.js","_app/immutable/chunks/BNPiJ2cw.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-jWCcksrV.js.map
