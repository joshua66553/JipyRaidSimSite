import { v as html } from './index.js-H2yCcV1v.js';

//#region src/lib/components/content/ContentRenderer.svelte
function ContentRenderer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content } = $$props;
		$$renderer.push(`<article class="prose-kb rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">${html(content.html)}</article>`);
	});
}

export { ContentRenderer as C };
//# sourceMappingURL=ContentRenderer-TFHVtxQu.js.map
