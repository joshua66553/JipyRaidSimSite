import { s as store_get, h as head, u as unsubscribe_stores, c as escape_html, d as attr, f as ensure_array_like, g as stringify, i as attr_class, k as spread_props, l as derived, m as getContext } from './index.js-H2yCcV1v.js';
import './client-CxkdWbJP.js';
import { I as Icon } from './Icon-B030kXqD.js';
import { S as Settings } from './settings-DXj3m5Ec.js';

//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		/** @type {typeof page} */
		page: { subscribe: stores$1.page.subscribe },
		/** @type {typeof navigating} */
		navigating: { subscribe: stores$1.navigating.subscribe },
		/** @type {typeof updated} */
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/book-open.svelte
function Book_open($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "book-open" },
		props,
		{ iconNode: [["path", { "d": "M12 7v14" }], ["path", { "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/file-text.svelte
function File_text($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "file-text" },
		props,
		{ iconNode: [
			["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }],
			["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
			["path", { "d": "M10 9H8" }],
			["path", { "d": "M16 13H8" }],
			["path", { "d": "M16 17H8" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/log-out.svelte
function Log_out($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "log-out" },
		props,
		{ iconNode: [
			["path", { "d": "m16 17 5-5-5-5" }],
			["path", { "d": "M21 12H9" }],
			["path", { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/shield.svelte
function Shield($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "shield" },
		props,
		{ iconNode: [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }]] }
	]));
}
//#endregion
//#region src/lib/components/layout/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { siteName, session, isAdmin } = $$props;
		$$renderer.push(`<header class="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur"><div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"><a href="/general-info" class="flex items-center gap-3"><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sm font-bold text-sky-400">RS</div> <span class="hidden font-semibold text-white sm:inline">${escape_html(siteName)}</span></a> `);
		if (session?.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-center gap-3">`);
			if (isAdmin) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a href="/admin" class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">`);
				Shield($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> <span class="hidden sm:inline">Admin</span></a> <a href="/admin/settings" class="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" title="Settings">`);
				Settings($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----></a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex items-center gap-2 rounded-lg border border-slate-800 px-2 py-1">`);
			if (session.user.image) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", session.user.image)} alt="" class="h-7 w-7 rounded-full"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="hidden text-sm text-slate-300 sm:inline">${escape_html(session.user.name)}</span> <button type="button" class="rounded p-1 text-slate-400 hover:text-white" title="Sign out">`);
			Log_out($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----></button></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></header>`);
	});
}
//#endregion
//#region src/lib/components/layout/SidebarNav.svelte
function SidebarNav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { pages, currentSlug } = $$props;
		const slug = derived(() => currentSlug || store_get($$store_subs ??= {}, "$page", page).url.pathname.replace(/^\//, ""));
		$$renderer.push(`<aside class="hidden w-56 shrink-0 border-r border-slate-800 md:block"><nav class="sticky top-16 p-4"><p class="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Pages</p> <ul class="space-y-1"><!--[-->`);
		const each_array = ensure_array_like(pages);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let navPage = each_array[$$index];
			$$renderer.push(`<li><a${attr("href", `/${stringify(navPage.slug)}`)}${attr_class(`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${slug() === navPage.slug ? "bg-sky-500/15 text-sky-400" : "text-slate-400 hover:bg-slate-800/60 hover:text-white"}`)}>`);
			if (navPage.slug === "general-info") {
				$$renderer.push("<!--[0-->");
				Book_open($$renderer, { class: "h-4 w-4 shrink-0" });
			} else {
				$$renderer.push("<!--[-1-->");
				File_text($$renderer, { class: "h-4 w-4 shrink-0" });
			}
			$$renderer.push(`<!--]--> <span class="truncate">${escape_html(navPage.title)}</span></a></li>`);
		}
		$$renderer.push(`<!--]--></ul></nav></aside> <nav class="mb-4 flex gap-2 overflow-x-auto border-b border-slate-800 pb-3 md:hidden"><!--[-->`);
		const each_array_1 = ensure_array_like(pages);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let navPage = each_array_1[$$index_1];
			$$renderer.push(`<a${attr("href", `/${stringify(navPage.slug)}`)}${attr_class(`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${slug() === navPage.slug ? "bg-sky-500/20 text-sky-400" : "bg-slate-800 text-slate-400"}`)}>${escape_html(navPage.title)}</a>`);
		}
		$$renderer.push(`<!--]--></nav>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children, data } = $$props;
		const isPublic = store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/login") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/auth");
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.siteName)}</title>`);
			});
		});
		if (isPublic) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="min-h-screen bg-slate-950 text-slate-100">`);
			Header($$renderer, {
				siteName: data.siteName,
				session: data.session,
				isAdmin: data.isAdmin
			});
			$$renderer.push(`<!----> <div class="mx-auto flex max-w-7xl flex-col md:flex-row">`);
			SidebarNav($$renderer, {
				pages: data.navPages,
				currentSlug: store_get($$store_subs ??= {}, "$page", page).params.slug ?? ""
			});
			$$renderer.push(`<!----> <main class="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">`);
			children($$renderer);
			$$renderer.push(`<!----></main></div></div>`);
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-pspHJpEi.js.map
