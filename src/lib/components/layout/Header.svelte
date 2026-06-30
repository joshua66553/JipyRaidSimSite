<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Settings, LogOut, Shield } from '@lucide/svelte';
	import type { Session } from '@auth/core/types';

	interface Props {
		siteName: string;
		session: Session | null;
		isAdmin: boolean;
	}

	let { siteName, session, isAdmin }: Props = $props();
</script>

<header class="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
		<a href="/general-info" class="flex items-center gap-3">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sm font-bold text-sky-400"
			>
				RS
			</div>
			<span class="hidden font-semibold text-white sm:inline">{siteName}</span>
		</a>

		{#if session?.user}
			<div class="flex items-center gap-3">
				{#if isAdmin}
					<a
						href="/admin"
						class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
					>
						<Shield class="h-4 w-4" />
						<span class="hidden sm:inline">Admin</span>
					</a>
					<a
						href="/admin/settings"
						class="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
						title="Settings"
					>
						<Settings class="h-4 w-4" />
					</a>
				{/if}
				<div class="flex items-center gap-2 rounded-lg border border-slate-800 px-2 py-1">
					{#if session.user.image}
						<img src={session.user.image} alt="" class="h-7 w-7 rounded-full" />
					{/if}
					<span class="hidden text-sm text-slate-300 sm:inline">{session.user.name}</span>
					<button
						type="button"
						onclick={() => signOut({ callbackUrl: '/login' })}
						class="rounded p-1 text-slate-400 hover:text-white"
						title="Sign out"
					>
						<LogOut class="h-4 w-4" />
					</button>
				</div>
			</div>
		{/if}
	</div>
</header>
