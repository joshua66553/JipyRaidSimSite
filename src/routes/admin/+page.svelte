<script lang="ts">
	import { Settings, Pencil, ShieldHalf } from '@lucide/svelte';
	import { getTier } from '$lib/utils/tiers';

	let { data } = $props();
</script>

<svelte:head>
	<title>Admin | Raid Simulator Staff Docs</title>
</svelte:head>

<div class="mx-auto max-w-5xl">
	<div class="mb-8 flex items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<span
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary-soft"
			>
				<ShieldHalf class="h-5 w-5" />
			</span>
			<div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">Content management</h1>
				<p class="text-sm text-muted">Edit documentation pages and access rules.</p>
			</div>
		</div>
		<a
			href="/admin/settings"
			class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
		>
			<Settings class="h-4 w-4" />
			<span class="hidden sm:inline">Guild settings</span>
		</a>
	</div>

	{#if !data.guildConfigured}
		<div
			class="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200"
		>
			Discord guild is not configured. <a href="/admin/settings" class="font-medium underline"
				>Set it up</a
			> to use role and user pickers.
		</div>
	{/if}

	<div class="overflow-hidden rounded-xl border border-border bg-card">
		<table class="w-full text-left text-sm">
			<thead class="border-b border-border bg-elevated text-faint">
				<tr>
					<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Page</th>
					<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Tier</th>
					<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Restrictions</th>
					<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Updated</th>
					<th class="px-4 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each data.pages as page (page.slug)}
					{@const tier = getTier(page)}
					<tr class="transition-colors hover:bg-elevated/60">
						<td class="px-4 py-3 font-medium text-foreground">{page.title}</td>
						<td class="px-4 py-3">
							<span
								class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
								style="background: color-mix(in srgb, {tier.color} 14%, transparent); color: {tier.color}"
							>
								<span class="h-1.5 w-1.5 rounded-full" style="background:{tier.color}"></span>
								{tier.label}
							</span>
						</td>
						<td class="px-4 py-3 text-muted">
							{#if page.allowedRoleIds.length === 0 && page.allowedUserIds.length === 0}
								All staff
							{:else}
								{page.allowedRoleIds.length} roles, {page.allowedUserIds.length} users
							{/if}
						</td>
						<td class="px-4 py-3 text-faint">
							{new Date(page.updatedAt).toLocaleDateString()}
						</td>
						<td class="px-4 py-3 text-right">
							<a
								href="/admin/{page.slug}"
								class="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-primary-soft transition-colors hover:border-border-strong hover:text-foreground"
							>
								<Pencil class="h-3.5 w-3.5" />
								Edit
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
