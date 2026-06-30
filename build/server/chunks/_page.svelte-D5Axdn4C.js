import { h as head, c as escape_html, d as attr, k as spread_props, o as onDestroy, f as ensure_array_like, n as attr_style, g as stringify, l as derived } from './index.js-H2yCcV1v.js';
import { I as Icon } from './Icon-B030kXqD.js';
import { C as ContentRenderer } from './ContentRenderer-TFHVtxQu.js';
import '@tiptap/core';
import '@tiptap/starter-kit';
import '@tiptap/extension-table';
import '@tiptap/extension-table-row';
import '@tiptap/extension-table-cell';
import '@tiptap/extension-table-header';

//#region node_modules/@lucide/svelte/dist/icons/arrow-left.svelte
function Arrow_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "arrow-left" },
		props,
		{ iconNode: [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]] }
	]));
}
//#endregion
//#region src/lib/components/admin/TipTapEditor.svelte
function TipTapEditor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		onDestroy(() => {});
		$$renderer.push(`<div class="mb-2 flex flex-wrap gap-2"><button type="button" class="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700">Bold</button> <button type="button" class="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700">H2</button> <button type="button" class="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700">List</button> <button type="button" class="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700">Table</button></div> <div></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/SearchableMultiSelect.svelte
function SearchableMultiSelect($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { options, selected, placeholder = "Select…", searchable = false, loading = false, onchange, onsearch } = $$props;
		function roleColor(color) {
			if (!color) return "#64748b";
			return `#${color.toString(16).padStart(6, "0")}`;
		}
		const selectedOptions = derived(() => selected.map((id) => options.find((o) => o.id === id)).filter(Boolean));
		$$renderer.push(`<div class="relative"><button type="button" class="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-left text-sm text-slate-300 hover:border-slate-600"><span class="truncate">${escape_html(placeholder)}</span> <span class="text-slate-500">${escape_html(selected.length)} selected</span></button> `);
		if (selectedOptions().length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
			const each_array = ensure_array_like(selectedOptions());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let opt = each_array[$$index];
				$$renderer.push(`<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200">`);
				if (opt.avatar) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", opt.avatar)} alt="" class="h-4 w-4 rounded-full"/>`);
				} else if (opt.color !== void 0) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="h-2.5 w-2.5 rounded-full"${attr_style(`background: ${stringify(roleColor(opt.color))}`)}></span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> ${escape_html(opt.label)} <button type="button" class="text-slate-400 hover:text-white">×</button></span>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/admin/PageAccessControl.svelte
function PageAccessControl($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { guildConfigured, allowedRoleIds, allowedUserIds, onRolesChange, onUsersChange } = $$props;
		let roles = [];
		let members = [];
		let rolesLoading = false;
		let membersLoading = false;
		async function searchMembers(query) {
			if (!query.trim()) {
				members = [];
				return;
			}
			membersLoading = true;
			try {
				const res = await fetch(`/api/discord/members?q=${encodeURIComponent(query)}`);
				if (res.ok) members = await res.json();
			} finally {
				membersLoading = false;
			}
		}
		const roleOptions = derived(() => roles.map((r) => ({
			id: r.id,
			label: r.name,
			color: r.color
		})));
		const memberOptions = derived(() => members.map((m) => ({
			id: m.id,
			label: m.displayName,
			sublabel: m.username,
			avatar: m.avatar
		})));
		const memberOptionsWithSelected = derived(() => {
			const map = new Map(memberOptions().map((o) => [o.id, o]));
			for (const id of allowedUserIds) if (!map.has(id)) map.set(id, {
				id,
				label: `User ${id}`,
				sublabel: id,
				avatar: null
			});
			return [...map.values()];
		});
		$$renderer.push(`<section class="rounded-xl border border-slate-800 bg-slate-900/40 p-4"><h3 class="mb-1 text-sm font-semibold text-white">Access control</h3> <p class="mb-4 text-xs text-slate-500">Leave both empty to allow all staff with the global role. Select roles or users to restrict this
		page further.</p> `);
		if (!guildConfigured) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"><a href="/admin/settings" class="underline">Configure Discord Guild in Settings</a> to enable
			permission pickers.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><div><label class="mb-1 block text-xs font-medium text-slate-400">Allowed roles</label> `);
			SearchableMultiSelect($$renderer, {
				options: roleOptions(),
				selected: allowedRoleIds,
				placeholder: "Select roles…",
				loading: rolesLoading,
				onchange: onRolesChange
			});
			$$renderer.push(`<!----></div> <div><label class="mb-1 block text-xs font-medium text-slate-400">Allowed users</label> `);
			SearchableMultiSelect($$renderer, {
				options: memberOptionsWithSelected(),
				selected: allowedUserIds,
				placeholder: "Search and select users…",
				searchable: true,
				loading: membersLoading,
				onchange: onUsersChange,
				onsearch: searchMembers
			});
			$$renderer.push(`<!----></div></div>`);
		}
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
//#region src/routes/admin/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let title = data.page.title;
		let description = data.page.description;
		let html = data.page.content.html;
		let allowedRoleIds = [...data.page.allowedRoleIds];
		let allowedUserIds = [...data.page.allowedUserIds];
		let saving = false;
		head("14s6qdu", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Edit ${escape_html(data.page.title)} | Admin</title>`);
			});
		});
		$$renderer.push(`<a href="/admin" class="mb-4 inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300">`);
		Arrow_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> Back to admin</a> <div class="grid gap-6 lg:grid-cols-2"><div class="space-y-4"><h1 class="text-xl font-bold text-white">Edit: ${escape_html(data.page.title)}</h1> <div><label class="mb-1 block text-xs font-medium text-slate-400">Title</label> <input${attr("value", title)} class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"/></div> <div><label class="mb-1 block text-xs font-medium text-slate-400">Description</label> <input${attr("value", description)} class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"/></div> `);
		PageAccessControl($$renderer, {
			guildConfigured: data.guildConfigured,
			allowedRoleIds,
			allowedUserIds,
			onRolesChange: (ids) => allowedRoleIds = ids,
			onUsersChange: (ids) => allowedUserIds = ids
		});
		$$renderer.push(`<!----> <div><label class="mb-1 block text-xs font-medium text-slate-400">Content</label> `);
		TipTapEditor($$renderer);
		$$renderer.push(`<!----></div> <div class="flex items-center gap-3"><button type="button"${attr("disabled", saving, true)} class="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50">${escape_html("Save changes")}</button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div><p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Preview</p> `);
		ContentRenderer($$renderer, { content: { html } });
		$$renderer.push(`<!----></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D5Axdn4C.js.map
