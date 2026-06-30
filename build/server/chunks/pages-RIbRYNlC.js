import { p as private_env } from './index.js-H2yCcV1v.js';
import { p as prisma } from './db2-CI-JqqkQ.js';

//#region src/lib/auth/access.ts
function getAdminIds() {
	return (private_env.ADMIN_DISCORD_IDS ?? "").split(",").map((id) => id.trim()).filter(Boolean);
}
function isAdmin(userId) {
	if (!userId) return false;
	return getAdminIds().includes(userId);
}
function canViewPage(userId, page, userRoleIds) {
	if (isAdmin(userId)) return true;
	const hasRoleRestriction = page.allowedRoleIds.length > 0;
	const hasUserRestriction = page.allowedUserIds.length > 0;
	if (!hasRoleRestriction && !hasUserRestriction) return true;
	if (hasUserRestriction && page.allowedUserIds.includes(userId)) return true;
	if (hasRoleRestriction && page.allowedRoleIds.some((roleId) => userRoleIds.includes(roleId))) return true;
	return false;
}
function hasGlobalStaffRole(userRoleIds) {
	const required = private_env.DISCORD_REQUIRED_ROLE_ID;
	if (!required) return true;
	return userRoleIds.includes(required);
}
//#endregion
//#region src/lib/server/pages.ts
async function getAllPages() {
	return prisma.page.findMany({ orderBy: { sortOrder: "asc" } });
}
async function getPageBySlug(slug) {
	return prisma.page.findUnique({ where: { slug } });
}
async function getAccessiblePages(userId, userRoleIds) {
	return (await getAllPages()).filter((page) => canViewPage(userId, page, userRoleIds)).map(({ slug, title, sortOrder }) => ({
		slug,
		title,
		sortOrder
	}));
}
function parsePageContent(content) {
	if (typeof content === "object" && content !== null && "html" in content) {
		const html = content.html;
		if (typeof html === "string") return { html };
	}
	return { html: "" };
}
async function updatePage(slug, data) {
	const page = await prisma.page.update({
		where: { slug },
		data: {
			...data.title !== void 0 && { title: data.title },
			...data.description !== void 0 && { description: data.description },
			...data.content !== void 0 && { content: data.content },
			...data.allowedRoleIds !== void 0 && { allowedRoleIds: data.allowedRoleIds },
			...data.allowedUserIds !== void 0 && { allowedUserIds: data.allowedUserIds },
			updatedBy: data.updatedBy
		}
	});
	await prisma.auditLog.create({ data: {
		pageSlug: slug,
		userId: data.updatedBy,
		action: "update"
	} });
	return page;
}
async function getSiteConfig() {
	return prisma.siteConfig.findFirst();
}
async function upsertSiteConfig(discordGuildId, updatedBy) {
	const existing = await prisma.siteConfig.findFirst();
	if (existing) return prisma.siteConfig.update({
		where: { id: existing.id },
		data: {
			discordGuildId,
			updatedBy
		}
	});
	return prisma.siteConfig.create({ data: {
		discordGuildId,
		updatedBy
	} });
}

export { getAccessiblePages as a, getAllPages as b, getSiteConfig as c, upsertSiteConfig as d, canViewPage as e, getPageBySlug as g, hasGlobalStaffRole as h, isAdmin as i, parsePageContent as p, updatePage as u };
//# sourceMappingURL=pages-RIbRYNlC.js.map
