import { json, error } from '@sveltejs/kit';
import { updatePage, deletePage, getPageBySlug } from '$lib/server/pages';
import { renderMarkdown } from '$lib/server/markdown';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const page = await getPageBySlug(params.slug);
	if (!page) error(404, 'Page not found');

	const body = await request.json();
	const markdown = typeof body.markdown === 'string' ? body.markdown : '';

	await updatePage(params.slug, {
		title: body.title,
		description: body.description,
		content: { markdown, html: renderMarkdown(markdown) },
		allowedRoleIds: body.allowedRoleIds,
		allowedUserIds: body.allowedUserIds,
		updatedBy: locals.userId
	});

	return json({ ok: true });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const page = await getPageBySlug(params.slug);
	if (!page) error(404, 'Page not found');

	await deletePage(params.slug, locals.userId);
	return json({ ok: true });
};
