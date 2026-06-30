import { p as private_env } from './index.js-H2yCcV1v.js';
import { g as getSiteName } from './site-DK3SaLMK.js';
import { s as signIn } from './auth-DhpCFoFY.js';
import './discord-BYjBnNev.js';
import '@auth/core';
import '@auth/core/errors';
import '@auth/core/providers/discord';

//#region src/routes/login/+page.server.ts
var load = async () => ({ siteName: getSiteName(private_env.PUBLIC_SITE_NAME) });
var actions = { default: signIn };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DaNyQ4Pu.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/7.CpBHj6_I.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CYqnJkxj.js","_app/immutable/chunks/C8yttuNe.js","_app/immutable/chunks/DBfKggBr.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-DRAemN-s.js.map
