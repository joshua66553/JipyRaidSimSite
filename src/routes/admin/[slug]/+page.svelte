<script lang="ts">
	import TipTapEditor from '$lib/components/admin/TipTapEditor.svelte';
	import PageAccessControl from '$lib/components/admin/PageAccessControl.svelte';
	import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
	import { ArrowLeft } from '@lucide/svelte';

	let { data } = $props();

	let title = $state(data.page.title);
	let description = $state(data.page.description);
	let html = $state(data.page.content.html);
	let allowedRoleIds = $state([...data.page.allowedRoleIds]);
	let allowedUserIds = $state([...data.page.allowedUserIds]);
	let saving = $state(false);
	let message = $state('');

	async function save() {
		saving = true;
		message = '';
		try {
			const res = await fetch(`/api/pages/${data.page.slug}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					description,
					content: { html },
					allowedRoleIds,
					allowedUserIds
				})
			});
			if (!res.ok) throw new Error(await res.text());
			message = 'Saved successfully';
		} catch (e) {
			message = e instanceof Error ? e.message : 'Save failed';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Edit {data.page.title} | Admin</title>
</svelte:head>

<a href="/admin" class="mb-4 inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300">
	<ArrowLeft class="h-4 w-4" />
	Back to admin
</a>

<div class="grid gap-6 lg:grid-cols-2">
	<div class="space-y-4">
		<h1 class="text-xl font-bold text-white">Edit: {data.page.title}</h1>

		<div>
			<label class="mb-1 block text-xs font-medium text-slate-400">Title</label>
			<input
				bind:value={title}
				class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"
			/>
		</div>

		<div>
			<label class="mb-1 block text-xs font-medium text-slate-400">Description</label>
			<input
				bind:value={description}
				class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white"
			/>
		</div>

		<PageAccessControl
			guildConfigured={data.guildConfigured}
			{allowedRoleIds}
			{allowedUserIds}
			onRolesChange={(ids) => (allowedRoleIds = ids)}
			onUsersChange={(ids) => (allowedUserIds = ids)}
		/>

		<div>
			<label class="mb-1 block text-xs font-medium text-slate-400">Content</label>
			<TipTapEditor content={html} onupdate={(v) => (html = v)} />
		</div>

		<div class="flex items-center gap-3">
			<button
				type="button"
				disabled={saving}
				onclick={save}
				class="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50"
			>
				{saving ? 'Saving…' : 'Save changes'}
			</button>
			{#if message}
				<span class="text-sm {message.includes('success') ? 'text-emerald-400' : 'text-red-400'}"
					>{message}</span
				>
			{/if}
		</div>
	</div>

	<div>
		<p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Preview</p>
		<ContentRenderer content={{ html }} />
	</div>
</div>
