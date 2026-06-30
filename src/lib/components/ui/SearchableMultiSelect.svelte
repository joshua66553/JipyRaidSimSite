<script lang="ts">
	export type MultiSelectOption = {
		id: string;
		label: string;
		sublabel?: string;
		color?: number;
		avatar?: string | null;
	};

	interface Props {
		options: MultiSelectOption[];
		selected: string[];
		placeholder?: string;
		searchable?: boolean;
		loading?: boolean;
		onchange: (selected: string[]) => void;
		onsearch?: (query: string) => void;
	}

	let {
		options,
		selected,
		placeholder = 'Select…',
		searchable = false,
		loading = false,
		onchange,
		onsearch
	}: Props = $props();

	let open = $state(false);
	let query = $state('');
	let debounceTimer: ReturnType<typeof setTimeout>;

	function toggle(id: string) {
		if (selected.includes(id)) {
			onchange(selected.filter((s) => s !== id));
		} else {
			onchange([...selected, id]);
		}
	}

	function remove(id: string) {
		onchange(selected.filter((s) => s !== id));
	}

	function roleColor(color: number) {
		if (!color) return '#64748b';
		return `#${color.toString(16).padStart(6, '0')}`;
	}

	function handleSearchInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		query = value;
		if (!onsearch) return;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => onsearch(value), 300);
	}

	const selectedOptions = $derived(
		selected
			.map((id) => options.find((o) => o.id === id))
			.filter(Boolean) as MultiSelectOption[]
	);
</script>

<div class="relative">
	<button
		type="button"
		onclick={() => (open = !open)}
		class="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-left text-sm text-slate-300 hover:border-slate-600"
	>
		<span class="truncate">{placeholder}</span>
		<span class="text-slate-500">{selected.length} selected</span>
	</button>

	{#if selectedOptions.length}
		<div class="mt-2 flex flex-wrap gap-2">
			{#each selectedOptions as opt (opt.id)}
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200"
				>
					{#if opt.avatar}
						<img src={opt.avatar} alt="" class="h-4 w-4 rounded-full" />
					{:else if opt.color !== undefined}
						<span
							class="h-2.5 w-2.5 rounded-full"
							style="background: {roleColor(opt.color)}"
						></span>
					{/if}
					{opt.label}
					<button
						type="button"
						class="text-slate-400 hover:text-white"
						onclick={() => remove(opt.id)}>×</button
					>
				</span>
			{/each}
		</div>
	{/if}

	{#if open}
		<div
			class="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-900 shadow-xl"
		>
			{#if searchable}
				<div class="border-b border-slate-800 p-2">
					<input
						type="text"
						value={query}
						oninput={handleSearchInput}
						placeholder="Search…"
						class="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
					/>
				</div>
			{/if}
			{#if loading}
				<p class="p-3 text-sm text-slate-500">Loading…</p>
			{:else if options.length === 0}
				<p class="p-3 text-sm text-slate-500">No results</p>
			{:else}
				<ul>
					{#each options as opt (opt.id)}
						<li>
							<button
								type="button"
								class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-800 {selected.includes(
									opt.id
								)
									? 'bg-sky-500/10 text-sky-300'
									: 'text-slate-300'}"
								onclick={() => toggle(opt.id)}
							>
								<input type="checkbox" checked={selected.includes(opt.id)} class="rounded" />
								{#if opt.avatar}
									<img src={opt.avatar} alt="" class="h-6 w-6 rounded-full" />
								{:else if opt.color !== undefined}
									<span
										class="h-3 w-3 rounded-full"
										style="background: {roleColor(opt.color)}"
									></span>
								{/if}
								<span>
									{opt.label}
									{#if opt.sublabel}
										<span class="text-slate-500"> @{opt.sublabel}</span>
									{/if}
								</span>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
