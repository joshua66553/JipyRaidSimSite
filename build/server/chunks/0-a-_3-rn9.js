import { p as private_env } from './index.js-H2yCcV1v.js';
import { i as isAdmin, a as getAccessiblePages } from './pages-RIbRYNlC.js';
import { g as getSiteName } from './site-DK3SaLMK.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/+layout.server.ts
var load = async ({ locals, url }) => {
	const publicRoute = url.pathname.startsWith("/login") || url.pathname.startsWith("/auth") || url.pathname === "/access-denied";
	const siteName = getSiteName(private_env.PUBLIC_SITE_NAME);
	if (publicRoute || !locals.userId) return {
		navPages: [],
		session: null,
		isAdmin: false,
		siteName
	};
	return {
		navPages: await getAccessiblePages(locals.userId, locals.roleIds),
		session: locals.session,
		isAdmin: locals.isAdmin ?? isAdmin(locals.userId),
		siteName
	};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-pspHJpEi.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.C3QeTcUP.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/DBfKggBr.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-KmybQP.js","_app/immutable/chunks/BNPiJ2cw.js"];
const stylesheets = ["_app/immutable/assets/0.jitVAQdd.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-a-_3-rn9.js.map
