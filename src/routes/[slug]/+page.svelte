<script lang="ts">
	import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.page.title} | Knowledge Base</title>
</svelte:head>

<div class="mb-6">
	<h1 class="text-3xl font-bold text-white">{data.page.title}</h1>
	{#if data.page.description}
		<p class="mt-2 text-slate-400">{data.page.description}</p>
	{/if}
</div>

<ContentRenderer content={data.page.content} />

{#if data.prev || data.next}
	<nav class="mt-10 flex justify-between gap-4 border-t border-slate-800 pt-6">
		{#if data.prev}
			<a
				href="/{data.prev.slug}"
				class="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
			>
				<ChevronLeft class="h-4 w-4" />
				{data.prev.title}
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a
				href="/{data.next.slug}"
				class="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
			>
				{data.next.title}
				<ChevronRight class="h-4 w-4" />
			</a>
		{/if}
	</nav>
{/if}
