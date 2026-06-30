import { json, error } from '@sveltejs/kit';
import { createPage, getPageBySlug } from '$lib/server/pages';
import { renderMarkdown } from '$lib/server/markdown';
import type { RequestHandler } from './$types';

function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const body = await request.json();
	const title = typeof body.title === 'string' ? body.title.trim() : '';
	if (!title) error(400, 'Title is required');

	const slug = slugify(typeof body.slug === 'string' && body.slug ? body.slug : title);
	if (!slug) error(400, 'A valid slug is required');

	const existing = await getPageBySlug(slug);
	if (existing) error(409, 'A page with that slug already exists');

	const markdown = typeof body.markdown === 'string' ? body.markdown : '';

	await createPage({
		slug,
		title,
		description: typeof body.description === 'string' ? body.description : null,
		content: { markdown, html: renderMarkdown(markdown) },
		allowedRoleIds: Array.isArray(body.allowedRoleIds) ? body.allowedRoleIds : [],
		allowedUserIds: Array.isArray(body.allowedUserIds) ? body.allowedUserIds : [],
		createdBy: locals.userId
	});

	return json({ ok: true, slug });
};
