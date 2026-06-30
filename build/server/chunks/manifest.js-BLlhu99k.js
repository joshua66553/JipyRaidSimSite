const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Ba7MY9KB.js",app:"_app/immutable/entry/app.C2gz701N.js",imports:["_app/immutable/entry/start.Ba7MY9KB.js","_app/immutable/chunks/DBfKggBr.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/entry/app.C2gz701N.js","_app/immutable/chunks/azTdROIj.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-a-_3-rn9.js')),
			__memo(() => import('./1-BA3gL0ej.js')),
			__memo(() => import('./2-BjBCKt7N.js')),
			__memo(() => import('./3-CKlslFU6.js')),
			__memo(() => import('./4-jWCcksrV.js')),
			__memo(() => import('./5-Cg_K8wD_.js')),
			__memo(() => import('./6-C2aUrhwh.js')),
			__memo(() => import('./7-DRAemN-s.js')),
			__memo(() => import('./8-C3mefcwA.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/access-denied",
				pattern: /^\/access-denied\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/[slug]",
				pattern: /^\/admin\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/api/discord/members",
				pattern: /^\/api\/discord\/members\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-akydgSxH.js'))
			},
			{
				id: "/api/discord/roles",
				pattern: /^\/api\/discord\/roles\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-7hyQ5Sm0.js'))
			},
			{
				id: "/api/health",
				pattern: /^\/api\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-Bay747WY.js'))
			},
			{
				id: "/api/pages/[slug]",
				pattern: /^\/api\/pages\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./_server.ts-COSz5KGW.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-BLlhu99k.js.map
