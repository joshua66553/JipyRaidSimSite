import { g as getPageBySlug, c as getSiteConfig, p as parsePageContent } from './pages-RIbRYNlC.js';
import { e as error } from './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/admin/[slug]/+page.server.ts
var load = async ({ params }) => {
	const [page, config] = await Promise.all([getPageBySlug(params.slug), getSiteConfig()]);
	if (!page) error(404, "Page not found");
	return {
		page: {
			slug: page.slug,
			title: page.title,
			description: page.description ?? "",
			content: parsePageContent(page.content),
			allowedRoleIds: page.allowedRoleIds,
			allowedUserIds: page.allowedUserIds
		},
		guildConfigured: Boolean(config?.discordGuildId)
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D5Axdn4C.js')).default;
const server_id = "src/routes/admin/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/6.DtMa2vF9.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-KmybQP.js","_app/immutable/chunks/S0b2DgJu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-C2aUrhwh.js.map
