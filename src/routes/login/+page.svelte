<script lang="ts">
	import { enhance } from '$app/forms';
	import { getSiteName } from '$lib/config/site';
	import { Crosshair, ShieldCheck } from '@lucide/svelte';

	let { data } = $props();
	const siteName = $derived(getSiteName(data?.siteName));
</script>

<svelte:head>
	<title>Log in | {siteName}</title>
</svelte:head>

<div
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 font-sans text-foreground"
>
	<!-- ambient glow -->
	<div
		class="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
		aria-hidden="true"
	></div>

	<div class="relative w-full max-w-md">
		<div
			class="rounded-2xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl"
		>
			<div class="mb-8 flex flex-col items-center text-center">
				<span
					class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(249,115,22,0.4),0_8px_24px_-4px_rgba(249,115,22,0.6)]"
				>
					<Crosshair class="h-7 w-7" strokeWidth={2.5} />
				</span>
				<h1 class="text-2xl font-bold tracking-tight">{siteName}</h1>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Staff documentation for the Raid Simulator Rust server. Sign in with Discord to continue.
				</p>
			</div>

			<form method="POST" use:enhance>
				<input type="hidden" name="providerId" value="discord" />
				<input type="hidden" name="redirectTo" value={data.callbackUrl} />
				<button
					type="submit"
					class="flex w-full items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path
							d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
						/>
					</svg>
					Continue with Discord
				</button>
			</form>

			<div class="mt-6 flex items-center justify-center gap-2 text-xs text-faint">
				<ShieldCheck class="h-3.5 w-3.5" />
				Access restricted to verified staff roles
			</div>
		</div>
	</div>
</div>
