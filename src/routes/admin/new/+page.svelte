<script lang="ts">
	import { goto } from '$app/navigation';
	import MarkdownEditor from '$lib/components/admin/MarkdownEditor.svelte';
	import PageAccessControl from '$lib/components/admin/PageAccessControl.svelte';
	import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
	import { ArrowLeft, Eye, Plus, X } from '@lucide/svelte';

	let { data } = $props();

	let title = $state('');
	let slug = $state('');
	let slugEdited = $state(false);
	let description = $state('');
	let markdown = $state('');
	let allowedRoleIds = $state<string[]>([]);
	let allowedUserIds = $state<string[]>([]);

	let creating = $state(false);
	let message = $state('');

	let previewing = $state(false);
	let previewLoading = $state(false);
	let previewHtml = $state('');

	function slugify(input: string) {
		return input
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}

	// keep slug in sync with title until the user edits the slug manually
	$effect(() => {
		if (!slugEdited) slug = slugify(title);
	});

	async function create() {
		creating = true;
		message = '';
		try {
			const res = await fetch('/api/pages', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, slug, description, markdown, allowedRoleIds, allowedUserIds })
			});
			if (!res.ok) throw new Error(await res.text());
			const body = await res.json();
			await goto(`/admin/${body.slug}`);
		} catch (e) {
			message = e instanceof Error ? e.message : 'Create failed';
			creating = false;
		}
	}

	async function openPreview() {
		previewing = true;
		previewLoading = true;
		try {
			const res = await fetch('/api/render', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ markdown })
			});
			const body = await res.json();
			previewHtml = body.html ?? '';
		} catch {
			previewHtml = '<p>Failed to render preview.</p>';
		} finally {
			previewLoading = false;
		}
	}
</script>

<svelte:head>
	<title>New page | Admin</title>
</svelte:head>

<div class="mx-auto max-w-5xl">
	<a
		href="/admin"
		class="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft transition-colors hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to admin
	</a>

	<div
		class="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:-mx-10 md:px-10"
	>
		<div class="min-w-0">
			<h1 class="truncate text-lg font-bold tracking-tight text-foreground">
				{title || 'New page'}
			</h1>
			<p class="font-mono text-xs text-faint">/{slug || 'slug'}</p>
		</div>
		<div class="flex items-center gap-2">
			{#if message}
				<span class="mr-1 text-sm text-red-400">{message}</span>
			{/if}
			<button
				type="button"
				onclick={openPreview}
				class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
			>
				<Eye class="h-4 w-4" />
				Preview
			</button>
			<button
				type="button"
				disabled={creating || !title.trim() || !slug.trim()}
				onclick={create}
				class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong disabled:opacity-50"
			>
				<Plus class="h-4 w-4" />
				{creating ? 'Creating…' : 'Create page'}
			</button>
		</div>
	</div>

	<div class="space-y-5">
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<label for="page-title" class="mb-1.5 block text-xs font-medium text-muted">Title</label>
				<input
					id="page-title"
					bind:value={title}
					placeholder="e.g. Moderator Handbook"
					class="w-full rounded-lg border border-border bg-elevated px-3 py-2 text-foreground transition-colors placeholder:text-faint focus:border-primary focus:outline-none"
				/>
			</div>
			<div>
				<label for="page-slug" class="mb-1.5 block text-xs font-medium text-muted">
					Slug <span class="text-faint">(URL)</span>
				</label>
				<input
					id="page-slug"
					bind:value={slug}
					oninput={() => (slugEdited = true)}
					placeholder="moderator-handbook"
					class="w-full rounded-lg border border-border bg-elevated px-3 py-2 font-mono text-sm text-foreground transition-colors placeholder:text-faint focus:border-primary focus:outline-none"
				/>
			</div>
		</div>

		<div>
			<label for="page-desc" class="mb-1.5 block text-xs font-medium text-muted">Description</label>
			<input
				id="page-desc"
				bind:value={description}
				placeholder="Short summary shown under the page title"
				class="w-full rounded-lg border border-border bg-elevated px-3 py-2 text-foreground transition-colors placeholder:text-faint focus:border-primary focus:outline-none"
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
			<label for="md-editor" class="mb-1.5 block text-xs font-medium text-muted"
				>Content (Markdown)</label
			>
			<MarkdownEditor bind:value={markdown} onupdate={(v) => (markdown = v)} />
		</div>
	</div>
</div>

{#if previewing}
	<div class="fixed inset-0 z-50 overflow-y-auto bg-background">
		<div
			class="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur md:px-8"
		>
			<div class="flex items-center gap-2 text-sm text-muted">
				<Eye class="h-4 w-4 text-primary-soft" />
				<span class="font-medium text-foreground">Preview</span>
				<span class="text-faint">— {title || 'Untitled'}</span>
			</div>
			<button
				type="button"
				onclick={() => (previewing = false)}
				class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
			>
				<X class="h-4 w-4" />
				Close
			</button>
		</div>

		<div class="mx-auto max-w-4xl px-4 py-10 md:px-8">
			<h1 class="mb-2 text-3xl font-bold tracking-tight text-foreground text-balance">
				{title || 'Untitled'}
			</h1>
			{#if description}
				<p class="mb-8 text-lg text-muted text-pretty">{description}</p>
			{/if}
			{#if previewLoading}
				<p class="text-sm text-faint">Rendering preview…</p>
			{:else}
				<ContentRenderer content={{ markdown, html: previewHtml }} />
			{/if}
		</div>
	</div>
{/if}
