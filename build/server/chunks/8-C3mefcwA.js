import { g as getPageBySlug, e as canViewPage, b as getAllPages, p as parsePageContent } from './pages-RIbRYNlC.js';
import { e as error, r as redirect } from './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/[slug]/+page.server.ts
var load = async ({ params, locals }) => {
	const page = await getPageBySlug(params.slug);
	if (!page) error(404, "Page not found");
	if (!canViewPage(locals.userId, page, locals.roleIds)) throw redirect(303, "/access-denied");
	const accessible = (await getAllPages()).filter((p) => canViewPage(locals.userId, p, locals.roleIds));
	const idx = accessible.findIndex((p) => p.slug === params.slug);
	return {
		page: {
			slug: page.slug,
			title: page.title,
			description: page.description,
			content: parsePageContent(page.content),
			updatedAt: page.updatedAt
		},
		prev: idx > 0 ? accessible[idx - 1] : null,
		next: idx < accessible.length - 1 ? accessible[idx + 1] : null
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Br-QkI-b.js')).default;
const server_id = "src/routes/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/8.CKAr3eVM.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-KmybQP.js","_app/immutable/chunks/S0b2DgJu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-C3mefcwA.js.map
