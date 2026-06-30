import { h as head, f as ensure_array_like, c as escape_html, d as attr, g as stringify, k as spread_props } from './index.js-H2yCcV1v.js';
import { I as Icon } from './Icon-B030kXqD.js';
import { S as Settings } from './settings-DXj3m5Ec.js';

//#region node_modules/@lucide/svelte/dist/icons/pencil.svelte
function Pencil($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "pencil" },
		props,
		{ iconNode: [["path", { "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }], ["path", { "d": "m15 5 4 4" }]] }
	]));
}
//#endregion
//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1jef3w8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin | Knowledge Base</title>`);
			});
		});
		$$renderer.push(`<div class="mb-6 flex items-center justify-between"><h1 class="text-2xl font-bold text-white">Admin</h1> <a href="/admin/settings" class="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">`);
		Settings($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> Guild settings</a></div> `);
		if (!data.guildConfigured) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">Discord guild is not configured. <a href="/admin/settings" class="underline">Set it up</a> to use
		role and user pickers.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="overflow-hidden rounded-xl border border-slate-800"><table class="w-full text-left text-sm"><thead class="bg-slate-900/80 text-slate-400"><tr><th class="px-4 py-3 font-medium">Page</th><th class="px-4 py-3 font-medium">Restrictions</th><th class="px-4 py-3 font-medium">Updated</th><th class="px-4 py-3 font-medium"></th></tr></thead><tbody class="divide-y divide-slate-800"><!--[-->`);
		const each_array = ensure_array_like(data.pages);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let page = each_array[$$index];
			$$renderer.push(`<tr class="hover:bg-slate-900/40"><td class="px-4 py-3 font-medium text-white">${escape_html(page.title)}</td><td class="px-4 py-3 text-slate-400">`);
			if (page.allowedRoleIds.length === 0 && page.allowedUserIds.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`All staff`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(page.allowedRoleIds.length)} roles, ${escape_html(page.allowedUserIds.length)} users`);
			}
			$$renderer.push(`<!--]--></td><td class="px-4 py-3 text-slate-500">${escape_html(new Date(page.updatedAt).toLocaleDateString())}</td><td class="px-4 py-3"><a${attr("href", `/admin/${stringify(page.slug)}`)} class="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300">`);
			Pencil($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> Edit</a></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B6AzL7gh.js.map
