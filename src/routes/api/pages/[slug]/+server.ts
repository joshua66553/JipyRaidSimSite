import { json, error } from '@sveltejs/kit';
import { updatePage, getPageBySlug } from '$lib/server/pages';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const page = await getPageBySlug(params.slug);
	if (!page) error(404, 'Page not found');

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
