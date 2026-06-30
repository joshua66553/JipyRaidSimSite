<script lang="ts">
	import SearchableMultiSelect from '$lib/components/ui/SearchableMultiSelect.svelte';
	import type { DiscordMember, DiscordRole } from '$lib/types/page';
	import { onMount } from 'svelte';

	interface Props {
		guildConfigured: boolean;
		allowedRoleIds: string[];
		allowedUserIds: string[];
		onRolesChange: (ids: string[]) => void;
		onUsersChange: (ids: string[]) => void;
	}

	let {
		guildConfigured,
		allowedRoleIds,
		allowedUserIds,
		onRolesChange,
		onUsersChange
	}: Props = $props();

	let roles = $state<DiscordRole[]>([]);
	let members = $state<DiscordMember[]>([]);
	let rolesLoading = $state(false);
	let membersLoading = $state(false);

	async function loadRoles() {
		rolesLoading = true;
		try {
			const res = await fetch('/api/discord/roles');
			if (res.ok) roles = await res.json();
		} finally {
			rolesLoading = false;
		}
	}

	async function searchMembers(query: string) {
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

	onMount(() => {
		if (guildConfigured) loadRoles();
	});

	const roleOptions = $derived(
		roles.map((r) => ({ id: r.id, label: r.name, color: r.color }))
	);

	const memberOptions = $derived(
		members.map((m) => ({
			id: m.id,
			label: m.displayName,
			sublabel: m.username,
			avatar: m.avatar
		}))
	);

	// Keep selected members visible even when not in search results
	const memberOptionsWithSelected = $derived.by(() => {
		const map = new Map(memberOptions.map((o) => [o.id, o]));
		for (const id of allowedUserIds) {
			if (!map.has(id)) {
				map.set(id, { id, label: `User ${id}`, sublabel: id, avatar: null });
			}
		}
		return [...map.values()];
	});
</script>

<section class="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
	<h3 class="mb-1 text-sm font-semibold text-white">Access control</h3>
	<p class="mb-4 text-xs text-slate-500">
		Leave both empty to allow all staff with the global role. Select roles or users to restrict this
		page further.
	</p>

	{#if !guildConfigured}
		<div class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
			<a href="/admin/settings" class="underline">Configure Discord Guild in Settings</a> to enable
			permission pickers.
		</div>
	{:else}
		<div class="space-y-4">
			<div>
				<label class="mb-1 block text-xs font-medium text-slate-400">Allowed roles</label>
				<SearchableMultiSelect
					options={roleOptions}
					selected={allowedRoleIds}
					placeholder="Select roles…"
					loading={rolesLoading}
					onchange={onRolesChange}
				/>
			</div>
			<div>
				<label class="mb-1 block text-xs font-medium text-slate-400">Allowed users</label>
				<SearchableMultiSelect
					options={memberOptionsWithSelected}
					selected={allowedUserIds}
					placeholder="Search and select users…"
					searchable
					loading={membersLoading}
					onchange={onUsersChange}
					onsearch={searchMembers}
				/>
			</div>
		</div>
	{/if}
</section>
