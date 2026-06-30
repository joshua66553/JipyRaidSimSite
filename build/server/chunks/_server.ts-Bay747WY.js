import { j as json } from './index.js-H2yCcV1v.js';

//#region src/routes/api/health/+server.ts
var GET = async () => {
	return json({
		status: "ok",
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	});
};

export { GET };
//# sourceMappingURL=_server.ts-Bay747WY.js.map
