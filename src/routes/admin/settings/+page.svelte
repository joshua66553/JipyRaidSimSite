<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft } from '@lucide/svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Guild Settings | Admin</title>
</svelte:head>

<div class="mx-auto max-w-lg">
	<a
		href="/admin"
		class="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft transition-colors hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to admin
	</a>

	<h1 class="mb-2 text-2xl font-bold tracking-tight text-foreground">Discord guild settings</h1>
	<p class="mb-6 text-sm leading-relaxed text-muted">
		Set your Discord server ID. This powers the role and user pickers on each page.
	</p>

	<form method="POST" action="?/save" use:enhance class="space-y-4">
		<div>
			<label for="guildId" class="mb-1.5 block text-sm font-medium text-foreground">Guild ID</label>
			<input
				id="guildId"
				name="guildId"
				type="text"
				value={form?.guildId ?? data.guildId}
				class="w-full rounded-lg border border-border bg-elevated px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
				placeholder="123456789012345678"
			/>
		</div>

		<button
			type="submit"
			class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
		>
			Save & verify
		</button>

		{#if form?.error}
			<p class="text-sm text-red-400">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-sm text-emerald-400">
				Connected to guild: <strong class="text-foreground">{form.guildName}</strong>
			</p>
		{/if}
	</form>
</div>
