<script lang="ts">
	import { Settings, Pencil } from '@lucide/svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Admin | Knowledge Base</title>
</svelte:head>

<div class="mb-6 flex items-center justify-between">
	<h1 class="text-2xl font-bold text-white">Admin</h1>
	<a
		href="/admin/settings"
		class="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
	>
		<Settings class="h-4 w-4" />
		Guild settings
	</a>
</div>

{#if !data.guildConfigured}
	<div class="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
		Discord guild is not configured. <a href="/admin/settings" class="underline">Set it up</a> to use
		role and user pickers.
	</div>
{/if}

<div class="overflow-hidden rounded-xl border border-slate-800">
	<table class="w-full text-left text-sm">
		<thead class="bg-slate-900/80 text-slate-400">
			<tr>
				<th class="px-4 py-3 font-medium">Page</th>
				<th class="px-4 py-3 font-medium">Restrictions</th>
				<th class="px-4 py-3 font-medium">Updated</th>
				<th class="px-4 py-3 font-medium"></th>
			</tr>
		</thead>
		<tbody class="divide-y divide-slate-800">
			{#each data.pages as page (page.slug)}
				<tr class="hover:bg-slate-900/40">
					<td class="px-4 py-3 font-medium text-white">{page.title}</td>
					<td class="px-4 py-3 text-slate-400">
						{#if page.allowedRoleIds.length === 0 && page.allowedUserIds.length === 0}
							All staff
						{:else}
							{page.allowedRoleIds.length} roles, {page.allowedUserIds.length} users
						{/if}
					</td>
					<td class="px-4 py-3 text-slate-500">
						{new Date(page.updatedAt).toLocaleDateString()}
					</td>
					<td class="px-4 py-3">
						<a
							href="/admin/{page.slug}"
							class="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
						>
							<Pencil class="h-4 w-4" />
							Edit
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
