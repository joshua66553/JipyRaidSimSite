import { p as private_env } from './index.js-H2yCcV1v.js';

//#region src/lib/server/discord.ts
var DISCORD_API = "https://discord.com/api/v10";
var roleCache = /* @__PURE__ */ new Map();
async function discordFetch(path) {
	const token = private_env.DISCORD_BOT_TOKEN;
	if (!token) throw new Error("DISCORD_BOT_TOKEN is not configured");
	const res = await fetch(`${DISCORD_API}${path}`, { headers: { Authorization: `Bot ${token}` } });
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Discord API error ${res.status}: ${body}`);
	}
	return res.json();
}
async function getGuildId() {
	const { prisma } = await import('./db-D8eWQAj7.js');
	return (await prisma.siteConfig.findFirst())?.discordGuildId ?? private_env.DISCORD_GUILD_ID ?? null;
}
async function verifyGuild(guildId) {
	return discordFetch(`/guilds/${guildId}`);
}
async function getMemberRoleIds(guildId, userId) {
	return (await discordFetch(`/guilds/${guildId}/members/${userId}`)).roles;
}
async function getGuildRoles(guildId) {
	const cached = roleCache.get(guildId);
	if (cached && cached.expiresAt > Date.now()) return cached.data;
	const mapped = (await discordFetch(`/guilds/${guildId}/roles`)).filter((r) => r.name !== "@everyone").map((r) => ({
		id: r.id,
		name: r.name,
		color: r.color
	})).sort((a, b) => a.name.localeCompare(b.name));
	roleCache.set(guildId, {
		data: mapped,
		expiresAt: Date.now() + 300 * 1e3
	});
	return mapped;
}
async function searchGuildMembers(guildId, query) {
	if (!query.trim()) return [];
	return (await discordFetch(`/guilds/${guildId}/members/search?query=${encodeURIComponent(query)}&limit=25`)).map((m) => ({
		id: m.user.id,
		username: m.user.username,
		displayName: m.nick ?? m.user.global_name ?? m.user.username,
		avatar: m.user.avatar ? `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.png` : null
	}));
}
function avatarUrl(userId, avatarHash) {
	if (avatarHash) return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
	return `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) >> 22n) % 6}.png`;
}

export { getGuildRoles as a, avatarUrl as b, getMemberRoleIds as c, getGuildId as g, searchGuildMembers as s, verifyGuild as v };
//# sourceMappingURL=discord-BYjBnNev.js.map
