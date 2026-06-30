<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import SidebarNav from '$lib/components/layout/SidebarNav.svelte';

	let { children, data } = $props();

	const isPublic =
		$page.url.pathname.startsWith('/login') || $page.url.pathname.startsWith('/auth');
</script>

<svelte:head>
	<title>{data.siteName}</title>
</svelte:head>

{#if isPublic}
	{@render children()}
{:else}
	<div class="min-h-screen bg-slate-950 text-slate-100">
		<Header siteName={data.siteName} session={data.session} isAdmin={data.isAdmin} />
		<div class="mx-auto flex max-w-7xl flex-col md:flex-row">
			<SidebarNav pages={data.navPages} currentSlug={$page.params.slug ?? ''} />
			<main class="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
				{@render children()}
			</main>
		</div>
	</div>
{/if}

<style>
	:global(.prose-kb) {
		line-height: 1.7;
	}
	:global(.prose-kb h1) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: white;
	}
	:global(.prose-kb h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
		color: white;
	}
	:global(.prose-kb h4) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: rgb(192 132 252);
	}
	:global(.prose-kb p) {
		margin-bottom: 1rem;
		color: rgb(203 213 225);
	}
	:global(.prose-kb ul) {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: rgb(203 213 225);
	}
	:global(.prose-kb a) {
		color: rgb(56 189 248);
		text-decoration: underline;
	}
	:global(.prose-kb table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		font-size: 0.875rem;
	}
	:global(.prose-kb th),
	:global(.prose-kb td) {
		border: 1px solid rgb(51 65 85);
		padding: 0.75rem;
		vertical-align: top;
	}
	:global(.prose-kb th) {
		background: rgb(30 41 59);
		font-weight: 600;
	}
	:global(.prose-kb tr:nth-child(even) td) {
		background: rgb(15 23 42 / 0.5);
	}
	:global(.prose-kb code),
	:global(.prose-kb strong) {
		color: rgb(125 211 252);
	}
	:global(.prose-kb .callout) {
		border-left: 4px solid;
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 0 0.5rem 0.5rem 0;
		background: rgb(30 41 59 / 0.6);
	}
	:global(.prose-kb .callout.warning) {
		border-color: rgb(245 158 11);
	}
	:global(.prose-kb .callout.danger) {
		border-color: rgb(239 68 68);
	}
</style>
