import { env } from '$env/dynamic/private';
import type { Page } from '@prisma/client';

export function getAdminIds(): string[] {
	const raw = env.ADMIN_DISCORD_IDS ?? '';
	return raw
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);
}

export function isAdmin(userId: string | undefined | null): boolean {
	if (!userId) return false;
	return getAdminIds().includes(userId);
}

export function canViewPage(
	userId: string,
	page: Pick<Page, 'allowedRoleIds' | 'allowedUserIds'>,
	userRoleIds: string[]
): boolean {
	if (isAdmin(userId)) return true;

	const hasRoleRestriction = page.allowedRoleIds.length > 0;
	const hasUserRestriction = page.allowedUserIds.length > 0;

	if (!hasRoleRestriction && !hasUserRestriction) return true;
	if (hasUserRestriction && page.allowedUserIds.includes(userId)) return true;
	if (hasRoleRestriction && page.allowedRoleIds.some((roleId) => userRoleIds.includes(roleId))) {
		return true;
	}

	return false;
}

export function hasGlobalStaffRole(userRoleIds: string[]): boolean {
	const required = env.DISCORD_REQUIRED_ROLE_ID;
	if (!required) return true;
	return userRoleIds.includes(required);
}
