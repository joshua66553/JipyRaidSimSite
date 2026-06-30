import { h as head, d as attr, c as escape_html } from './index.js-H2yCcV1v.js';
import './client-CxkdWbJP.js';

//#region src/routes/admin/settings/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("1gjcsm", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Guild Settings | Admin</title>`);
			});
		});
		$$renderer.push(`<div class="mx-auto max-w-lg"><h1 class="mb-2 text-2xl font-bold text-white">Discord guild settings</h1> <p class="mb-6 text-sm text-slate-400">Set your Discord server ID. This powers the role and user pickers on each page.</p> <form method="POST" action="?/save" class="space-y-4"><div><label for="guildId" class="mb-1 block text-sm font-medium text-slate-300">Guild ID</label> <input id="guildId" name="guildId" type="text"${attr("value", form?.guildId ?? data.guildId)} class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:border-sky-500 focus:outline-none" placeholder="123456789012345678"/></div> <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400">Save &amp; verify</button> `);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-sm text-red-400">${escape_html(form.error)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-sm text-emerald-400">Connected to guild: <strong>${escape_html(form.guildName)}</strong></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></form></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BtIIr36G.js.map
