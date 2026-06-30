<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import SidebarNav from '$lib/components/layout/SidebarNav.svelte';

	let { children, data } = $props();

	const isPublic = $derived(
		$page.url.pathname.startsWith('/login') || $page.url.pathname.startsWith('/auth')
	);
</script>

<svelte:head>
	<title>{data.siteName}</title>
</svelte:head>

{#if isPublic}
	{@render children()}
{:else}
	<div class="min-h-screen bg-background font-sans text-foreground antialiased">
		<Header siteName={data.siteName} session={data.session} isAdmin={data.isAdmin} />
		<div class="mx-auto flex w-full max-w-[88rem] flex-col md:flex-row">
			<SidebarNav pages={data.navPages} currentSlug={$page.params.slug ?? ''} />
			<main class="min-w-0 flex-1 px-4 py-8 md:px-10 md:py-10">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
