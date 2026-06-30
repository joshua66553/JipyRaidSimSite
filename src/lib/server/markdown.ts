import JPMarkDown from 'jp-markdown';

/**
 * Single shared parser instance. We render clean HTML fragments (no inline
 * <style>/<script>) — the code-block CSS (jp-markdown/code.css) and the
 * copy-button script (jp-markdown/code.js) are loaded once globally in the
 * root layout so they apply to every rendered page and the live preview.
 */
const parser = new JPMarkDown({
	codeTheme: 'github-dark',
	codeCopyButton: true,
	codeLineNumbers: true
});

/** Convert Markdown source into an HTML fragment for storage / preview. */
export function renderMarkdown(markdown: string): string {
	if (!markdown || !markdown.trim()) return '';
	return parser.Parse(markdown, {
		fullDocument: false,
		includeStyle: false,
		includeCodeStyle: false,
		includeCodeScript: false
	});
}
