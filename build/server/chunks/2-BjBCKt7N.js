import { a as getAccessiblePages } from './pages-RIbRYNlC.js';
import { r as redirect } from './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/+page.server.ts
var load = async ({ locals }) => {
	throw redirect(303, `/${(await getAccessiblePages(locals.userId, locals.roleIds))[0]?.slug ?? "general-info"}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 2;
const server_id = "src/routes/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-BjBCKt7N.js.map
