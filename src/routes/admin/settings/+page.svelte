<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Guild Settings | Admin</title>
</svelte:head>

<div class="mx-auto max-w-lg">
	<h1 class="mb-2 text-2xl font-bold text-white">Discord guild settings</h1>
	<p class="mb-6 text-sm text-slate-400">
		Set your Discord server ID. This powers the role and user pickers on each page.
	</p>

	<form method="POST" action="?/save" use:enhance class="space-y-4">
		<div>
			<label for="guildId" class="mb-1 block text-sm font-medium text-slate-300">Guild ID</label>
			<input
				id="guildId"
				name="guildId"
				type="text"
				value={form?.guildId ?? data.guildId}
				class="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
				placeholder="123456789012345678"
			/>
		</div>

		<button
			type="submit"
			class="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
		>
			Save & verify
		</button>

		{#if form?.error}
			<p class="text-sm text-red-400">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-sm text-emerald-400">
				Connected to guild: <strong>{form.guildName}</strong>
			</p>
		{/if}
	</form>
</div>
