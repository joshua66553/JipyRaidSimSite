import { env } from '$env/dynamic/private';
import type { DiscordMember, DiscordRole } from '$lib/types/page';

const DISCORD_API = 'https://discord.com/api/v10';

type CacheEntry<T> = { data: T; expiresAt: number };

const roleCache = new Map<string, CacheEntry<DiscordRole[]>>();

async function discordFetch<T>(path: string): Promise<T> {
	const token = env.DISCORD_BOT_TOKEN;
	if (!token) throw new Error('DISCORD_BOT_TOKEN is not configured');

	const res = await fetch(`${DISCORD_API}${path}`, {
		headers: { Authorization: `Bot ${token}` }
	});

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Discord API error ${res.status}: ${body}`);
	}

	return res.json() as Promise<T>;
}

export async function getGuildId(): Promise<string | null> {
	const { prisma } = await import('$lib/server/db');
	const config = await prisma.siteConfig.findFirst();
	return config?.discordGuildId ?? env.DISCORD_GUILD_ID ?? null;
}

export async function verifyGuild(guildId: string): Promise<{ id: string; name: string }> {
	return discordFetch(`/guilds/${guildId}`);
}

export async function getMemberRoleIds(guildId: string, userId: string): Promise<string[]> {
	type Member = { roles: string[] };
	const member = await discordFetch<Member>(`/guilds/${guildId}/members/${userId}`);
	return member.roles;
}

export async function getGuildRoles(guildId: string): Promise<DiscordRole[]> {
	const cached = roleCache.get(guildId);
	if (cached && cached.expiresAt > Date.now()) return cached.data;

	type ApiRole = { id: string; name: string; color: number };
	const roles = await discordFetch<ApiRole[]>(`/guilds/${guildId}/roles`);
	const mapped = roles
		.filter((r) => r.name !== '@everyone')
		.map((r) => ({ id: r.id, name: r.name, color: r.color }))
		.sort((a, b) => a.name.localeCompare(b.name));

	roleCache.set(guildId, { data: mapped, expiresAt: Date.now() + 5 * 60 * 1000 });
	return mapped;
}

export async function searchGuildMembers(guildId: string, query: string): Promise<DiscordMember[]> {
	if (!query.trim()) return [];

	type ApiMember = {
		user: { id: string; username: string; avatar: string | null; global_name?: string | null };
		nick?: string | null;
	};

	const members = await discordFetch<ApiMember[]>(
		`/guilds/${guildId}/members/search?query=${encodeURIComponent(query)}&limit=25`
	);

	return members.map((m) => ({
		id: m.user.id,
		username: m.user.username,
		displayName: m.nick ?? m.user.global_name ?? m.user.username,
		avatar: m.user.avatar
			? `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.png`
			: null
	}));
}

export function avatarUrl(userId: string, avatarHash: string | null | undefined): string {
	if (avatarHash) {
		return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
	}
	return `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) >> 22n) % 6}.png`;
}
