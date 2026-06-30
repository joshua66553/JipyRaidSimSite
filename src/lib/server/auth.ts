import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { env } from '$env/dynamic/private';
import { getMemberRoleIds, getGuildId, avatarUrl } from '$lib/server/discord';

declare module '@auth/core/types' {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			discordId: string;
			roleIds: string[];
			rolesCheckedAt: number;
		};
	}
}

declare module '@auth/core/jwt' {
	interface JWT {
		discordId?: string;
		roleIds?: string[];
		rolesCheckedAt?: number;
	}
}

async function refreshRoles(discordId: string): Promise<string[]> {
	const guildId = await getGuildId();
	if (!guildId) return [];
	try {
		return await getMemberRoleIds(guildId, discordId);
	} catch {
		return [];
	}
}

export const authOptions: SvelteKitAuthConfig = {
	providers: [
		Discord({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: 'identify email guilds.members.read' } }
		})
	],
	secret: env.AUTH_SECRET,
	trustHost: true,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const discordProfile = profile as {
					id?: string;
					username?: string;
					global_name?: string;
					avatar?: string;
				};
				const discordId = discordProfile.id ?? token.sub ?? '';
				token.discordId = discordId;
				token.name = discordProfile.global_name ?? discordProfile.username ?? token.name;
				token.picture = avatarUrl(discordId, discordProfile.avatar);
				token.roleIds = await refreshRoles(discordId);
				token.rolesCheckedAt = Date.now();
			}

			const stale =
				!token.rolesCheckedAt || Date.now() - (token.rolesCheckedAt as number) > 5 * 60 * 1000;
			if (token.discordId && stale) {
				token.roleIds = await refreshRoles(token.discordId as string);
				token.rolesCheckedAt = Date.now();
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				const discordId = (token.discordId as string) ?? token.sub ?? '';
				session.user.discordId = discordId;
				session.user.id = discordId;
				session.user.roleIds = (token.roleIds as string[]) ?? [];
				session.user.rolesCheckedAt = (token.rolesCheckedAt as number) ?? 0;
				if (token.picture) session.user.image = token.picture as string;
			}
			return session;
		}
	},
	pages: { signIn: '/login' }
};

export const { handle, signIn, signOut } = SvelteKitAuth(authOptions);
