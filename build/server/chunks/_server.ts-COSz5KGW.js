import { g as getPageBySlug, u as updatePage } from './pages-RIbRYNlC.js';
import { e as error, j as json } from './index.js-H2yCcV1v.js';
import './db2-CI-JqqkQ.js';
import '@prisma/client';

//#region src/routes/api/pages/[slug]/+server.ts
var PATCH = async ({ params, request, locals }) => {
	if (!locals.isAdmin) error(403, "Forbidden");
	if (!await getPageBySlug(params.slug)) error(404, "Page not found");
	const body = await request.json();
	await updatePage(params.slug, {
		title: body.title,
		description: body.description,
		content: body.content,
		allowedRoleIds: body.allowedRoleIds,
		allowedUserIds: body.allowedUserIds,
		updatedBy: locals.userId
	});
	return json({ ok: true });
};

export { PATCH };
//# sourceMappingURL=_server.ts-COSz5KGW.js.map
