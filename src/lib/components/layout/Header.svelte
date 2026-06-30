<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Settings, LogOut, ShieldHalf, Crosshair } from '@lucide/svelte';
	import type { Session } from '@auth/core/types';

	interface Props {
		siteName: string;
		session: Session | null;
		isAdmin: boolean;
	}

	let { siteName, session, isAdmin }: Props = $props();
</script>

<header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
	<div class="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
		<a href="/" class="flex items-center gap-2.5">
			<span
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(249,115,22,0.4),0_4px_14px_-2px_rgba(249,115,22,0.5)]"
			>
				<Crosshair class="h-4.5 w-4.5" strokeWidth={2.5} />
			</span>
			<span class="flex flex-col leading-none">
				<span class="text-sm font-semibold tracking-tight text-foreground">{siteName}</span>
				<span class="mt-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-faint">
					Staff Docs
				</span>
			</span>
		</a>

		{#if session?.user}
			<div class="flex items-center gap-2">
				{#if isAdmin}
					<a
						href="/admin"
						class="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground sm:flex"
					>
						<ShieldHalf class="h-4 w-4 text-primary-soft" />
						Admin
					</a>
					<a
						href="/admin/settings"
						class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted transition-colors hover:border-border-strong hover:text-foreground"
						title="Settings"
					>
						<Settings class="h-4 w-4" />
					</a>
				{/if}
				<div
					class="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-1.5"
				>
					{#if session.user.image}
						<img
							src={session.user.image}
							alt=""
							class="h-7 w-7 rounded-md ring-1 ring-border"
						/>
					{/if}
					<span class="hidden max-w-[10rem] truncate text-sm text-muted sm:inline"
						>{session.user.name}</span
					>
					<button
						type="button"
						onclick={() => signOut({ callbackUrl: '/login' })}
						class="flex h-7 w-7 items-center justify-center rounded-md text-faint transition-colors hover:bg-elevated hover:text-foreground"
						title="Sign out"
						aria-label="Sign out"
					>
						<LogOut class="h-4 w-4" />
					</button>
				</div>
			</div>
		{/if}
	</div>
</header>
