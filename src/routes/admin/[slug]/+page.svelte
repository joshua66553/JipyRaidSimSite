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

<a
	href="/admin"
	class="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft transition-colors hover:text-foreground"
>
	<ArrowLeft class="h-4 w-4" />
	Back to admin
</a>

<div class="grid gap-8 lg:grid-cols-2">
	<div class="space-y-4">
		<h1 class="text-xl font-bold tracking-tight text-foreground">Edit: {data.page.title}</h1>

		<div>
			<label class="mb-1.5 block text-xs font-medium text-muted">Title</label>
			<input
				bind:value={title}
				class="w-full rounded-lg border border-border bg-elevated px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
			/>
		</div>

		<div>
			<label class="mb-1.5 block text-xs font-medium text-muted">Description</label>
			<input
				bind:value={description}
				class="w-full rounded-lg border border-border bg-elevated px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
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
			<label class="mb-1.5 block text-xs font-medium text-muted">Content</label>
			<TipTapEditor content={html} onupdate={(v) => (html = v)} />
		</div>

		<div class="flex items-center gap-3">
			<button
				type="button"
				disabled={saving}
				onclick={save}
				class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong disabled:opacity-50"
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
		<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">Live preview</p>
		<div class="rounded-xl border border-border bg-card p-5">
			<ContentRenderer content={{ html }} />
		</div>
	</div>
</div>
