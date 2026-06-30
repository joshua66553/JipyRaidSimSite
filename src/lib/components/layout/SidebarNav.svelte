<script lang="ts">
	import { page } from '$app/stores';
	import { BookOpen, FileText } from '@lucide/svelte';
	import type { NavPage } from '$lib/types/page';

	interface Props {
		pages: NavPage[];
		currentSlug: string;
	}

	let { pages, currentSlug }: Props = $props();

	const slug = $derived(currentSlug || $page.url.pathname.replace(/^\//, ''));
</script>

<aside class="hidden w-56 shrink-0 border-r border-slate-800 md:block">
	<nav class="sticky top-16 p-4">
		<p class="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Pages</p>
		<ul class="space-y-1">
			{#each pages as navPage (navPage.slug)}
				<li>
					<a
						href="/{navPage.slug}"
						class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition {slug ===
						navPage.slug
							? 'bg-sky-500/15 text-sky-400'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}"
					>
						{#if navPage.slug === 'general-info'}
							<BookOpen class="h-4 w-4 shrink-0" />
						{:else}
							<FileText class="h-4 w-4 shrink-0" />
						{/if}
						<span class="truncate">{navPage.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<!-- Mobile nav -->
<nav class="mb-4 flex gap-2 overflow-x-auto border-b border-slate-800 pb-3 md:hidden">
	{#each pages as navPage (navPage.slug)}
		<a
			href="/{navPage.slug}"
			class="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium {slug === navPage.slug
				? 'bg-sky-500/20 text-sky-400'
				: 'bg-slate-800 text-slate-400'}"
		>
			{navPage.title}
		</a>
	{/each}
</nav>
