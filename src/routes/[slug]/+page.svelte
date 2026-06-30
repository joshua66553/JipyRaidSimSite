<script lang="ts">
	import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
	import { ChevronRight, ArrowLeft, ArrowRight, Clock } from '@lucide/svelte';
	import { getTier } from '$lib/utils/tiers';

	let { data } = $props();

	const tier = $derived(getTier(data.page));
	const updated = $derived(
		data.page.updatedAt
			? new Date(data.page.updatedAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			: null
	);
</script>

<svelte:head>
	<title>{data.page.title} | Raid Simulator Staff Docs</title>
</svelte:head>

<article class="mx-auto max-w-3xl">
	<!-- Breadcrumb -->
	<nav class="mb-6 flex items-center gap-1.5 text-xs font-medium text-faint" aria-label="Breadcrumb">
		<a href="/" class="transition-colors hover:text-muted">Docs</a>
		<ChevronRight class="h-3 w-3" />
		<span style="color:{tier.color}">{tier.label}</span>
		<ChevronRight class="h-3 w-3" />
		<span class="truncate text-muted">{data.page.title}</span>
	</nav>

	<!-- Title block -->
	<header class="mb-8 border-b border-border pb-6">
		<div class="mb-3 flex flex-wrap items-center gap-2">
			<span
				class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
				style="background: color-mix(in srgb, {tier.color} 14%, transparent); color: {tier.color}"
			>
				<span class="h-1.5 w-1.5 rounded-full" style="background:{tier.color}"></span>
				{tier.label}
			</span>
			{#if updated}
				<span class="inline-flex items-center gap-1.5 text-xs text-faint">
					<Clock class="h-3.5 w-3.5" />
					Updated {updated}
				</span>
			{/if}
		</div>
		<h1 class="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
			{data.page.title}
		</h1>
		{#if data.page.description}
			<p class="mt-3 text-pretty text-lg leading-relaxed text-muted">{data.page.description}</p>
		{/if}
	</header>

	<ContentRenderer content={data.page.content} />

	{#if data.prev || data.next}
		<nav class="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
			{#if data.prev}
				<a
					href="/{data.prev.slug}"
					class="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-elevated"
				>
					<span class="flex items-center gap-1.5 text-xs font-medium text-faint">
						<ArrowLeft class="h-3.5 w-3.5" /> Previous
					</span>
					<span class="font-medium text-foreground group-hover:text-primary-soft"
						>{data.prev.title}</span
					>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if data.next}
				<a
					href="/{data.next.slug}"
					class="group flex flex-col items-end gap-1 rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-border-strong hover:bg-elevated"
				>
					<span class="flex items-center gap-1.5 text-xs font-medium text-faint">
						Next <ArrowRight class="h-3.5 w-3.5" />
					</span>
					<span class="font-medium text-foreground group-hover:text-primary-soft"
						>{data.next.title}</span
					>
				</a>
			{/if}
		</nav>
	{/if}
</article>
