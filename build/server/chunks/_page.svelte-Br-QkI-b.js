import { h as head, c as escape_html, d as attr, g as stringify, k as spread_props } from './index.js-H2yCcV1v.js';
import { I as Icon } from './Icon-B030kXqD.js';
import { C as ContentRenderer } from './ContentRenderer-TFHVtxQu.js';

//#region node_modules/@lucide/svelte/dist/icons/chevron-left.svelte
function Chevron_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chevron-left" },
		props,
		{ iconNode: [["path", { "d": "m15 18-6-6 6-6" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/chevron-right.svelte
function Chevron_right($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chevron-right" },
		props,
		{ iconNode: [["path", { "d": "m9 18 6-6-6-6" }]] }
	]));
}
//#endregion
//#region src/routes/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("jot9ci", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.page.title)} | Knowledge Base</title>`);
			});
		});
		$$renderer.push(`<div class="mb-6"><h1 class="text-3xl font-bold text-white">${escape_html(data.page.title)}</h1> `);
		if (data.page.description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="mt-2 text-slate-400">${escape_html(data.page.description)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		ContentRenderer($$renderer, { content: data.page.content });
		$$renderer.push(`<!----> `);
		if (data.prev || data.next) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<nav class="mt-10 flex justify-between gap-4 border-t border-slate-800 pt-6">`);
			if (data.prev) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", `/${stringify(data.prev.slug)}`)} class="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300">`);
				Chevron_left($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> ${escape_html(data.prev.title)}</a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span></span>`);
			}
			$$renderer.push(`<!--]--> `);
			if (data.next) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", `/${stringify(data.next.slug)}`)} class="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300">${escape_html(data.next.title)} `);
				Chevron_right($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----></a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Br-QkI-b.js.map
