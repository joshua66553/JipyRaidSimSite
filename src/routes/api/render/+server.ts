import { json, error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/server/markdown';
import type { RequestHandler } from './$types';

/** On-demand Markdown -> HTML rendering for the editor's live preview. */
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.isAdmin) error(403, 'Forbidden');

	const body = await request.json();
	const markdown = typeof body.markdown === 'string' ? body.markdown : '';

	return json({ html: renderMarkdown(markdown) });
};
