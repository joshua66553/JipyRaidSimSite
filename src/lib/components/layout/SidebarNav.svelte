<script lang="ts">
	import { page } from '$app/stores';
	import { Crown, Gavel, Shield, ShieldCheck, BookText } from '@lucide/svelte';
	import type { NavPage } from '$lib/types/page';
	import { groupByTier, type TierKey } from '$lib/utils/tiers';

	interface Props {
		pages: NavPage[];
		currentSlug: string;
	}

	let { pages, currentSlug }: Props = $props();

	const slug = $derived(currentSlug || $page.url.pathname.replace(/^\//, ''));
	const groups = $derived(groupByTier(pages));

	const tierIcon: Record<TierKey, typeof Shield> = {
		management: Crown,
		'head-admin': Gavel,
		admin: Shield,
		moderator: ShieldCheck,
		general: BookText
	};
</script>

{#snippet navList(extraClass: string)}
	<ul class="space-y-px {extraClass}">
		{#each groups as group (group.tier.key)}
			{@const Icon = tierIcon[group.tier.key]}
			<li class="pt-5 first:pt-0">
				<div class="mb-2 flex items-center gap-2 px-3">
					<span
						class="inline-flex h-5 w-5 items-center justify-center rounded-md"
						style="background: color-mix(in srgb, {group.tier.color} 18%, transparent); color: {group.tier.color}"
					>
						<Icon class="h-3 w-3" />
					</span>
					<span class="text-[0.7rem] font-semibold uppercase tracking-wider text-faint">
						{group.tier.label}
					</span>
				</div>
				<ul class="space-y-px">
					{#each group.pages as navPage (navPage.slug)}
						{@const active = slug === navPage.slug}
						<li>
							<a
								href="/{navPage.slug}"
								class="group relative flex items-center gap-2 rounded-lg py-1.5 pl-5 pr-3 text-sm transition-colors {active
									? 'font-medium text-foreground'
									: 'text-muted hover:text-foreground'}"
							>
								<span
									class="absolute left-2 top-1/2 h-4 w-px -translate-y-1/2 rounded-full transition-all {active
										? 'h-5'
										: 'bg-border group-hover:bg-border-strong'}"
									style={active ? `background:${group.tier.color}` : ''}
								></span>
								<span class="truncate">{navPage.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
{/snippet}

<!-- Desktop sidebar -->
<aside class="hidden w-64 shrink-0 border-r border-border md:block">
	<nav class="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-6">
		{@render navList('')}
	</nav>
</aside>

<!-- Mobile nav -->
<nav class="border-b border-border px-2 py-3 md:hidden">
	<details class="group/details">
		<summary
			class="flex cursor-pointer list-none items-center justify-between rounded-lg bg-card px-3 py-2 text-sm font-medium text-foreground"
		>
			Browse documentation
			<svg
				class="h-4 w-4 text-muted transition-transform group-open/details:rotate-180"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</summary>
		<div class="mt-2 max-h-[60vh] overflow-y-auto pb-2">
			{@render navList('')}
		</div>
	</details>
</nav>
