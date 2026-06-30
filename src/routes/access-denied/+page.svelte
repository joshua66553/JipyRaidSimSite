<script lang="ts">
	import { getSiteName } from '$lib/config/site';
	import { ShieldAlert } from '@lucide/svelte';

	const siteName = getSiteName();
</script>

<svelte:head>
	<title>Access Denied | {siteName}</title>
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
	<div class="max-w-lg rounded-2xl border border-border bg-card px-8 py-10">
		<span
			class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
			style="color: var(--color-head); background: color-mix(in srgb, var(--color-head) 15%, transparent)"
		>
			<ShieldAlert class="h-6 w-6" />
		</span>
		<h1 class="text-2xl font-bold tracking-tight text-foreground">Access denied</h1>
		<p class="mt-3 leading-relaxed text-muted">
			You don't have permission to view this content. Make sure you're in the Discord server with the
			required staff role, or contact an administrator.
		</p>
		<a
			href="/"
			class="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-strong"
		>
			Go to home
		</a>
	</div>
</div>
