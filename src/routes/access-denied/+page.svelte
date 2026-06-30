<script lang="ts">
	import { getSiteName } from '$lib/config/site';

	const siteName = getSiteName();
</script>

<svelte:head>
	<title>Access Denied | {siteName}</title>
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
	<div class="rounded-2xl border border-slate-800 bg-slate-900/80 px-8 py-10 max-w-lg">
		<h1 class="text-2xl font-semibold text-white">Access denied</h1>
		<p class="mt-3 text-slate-400">
			You don't have permission to view this content. Make sure you're in the Discord server with the
			required staff role, or contact an administrator.
		</p>
		<a
			href="/general-info"
			class="mt-6 inline-block rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
		>
			Go to home
		</a>
	</div>
</div>
