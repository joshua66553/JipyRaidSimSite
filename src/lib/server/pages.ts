import { prisma } from '$lib/server/db';
import { canViewPage, isAdmin } from '$lib/auth/access';
import type { NavPage, PageContent } from '$lib/types/page';
import type { Page } from '@prisma/client';

export async function getAllPages(): Promise<Page[]> {
	return prisma.page.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
	return prisma.page.findUnique({ where: { slug } });
}

export async function getAccessiblePages(
	userId: string,
	userRoleIds: string[]
): Promise<NavPage[]> {
	const pages = await getAllPages();
	return pages
		.filter((page) => canViewPage(userId, page, userRoleIds))
		.map(({ slug, title, sortOrder }) => ({ slug, title, sortOrder }));
}

export function parsePageContent(content: unknown): PageContent {
	if (typeof content === 'object' && content !== null && 'html' in content) {
		const html = (content as PageContent).html;
		if (typeof html === 'string') return { html };
	}
	return { html: '' };
}

export async function updatePage(
	slug: string,
	data: {
		title?: string;
		description?: string | null;
		content?: PageContent;
		allowedRoleIds?: string[];
		allowedUserIds?: string[];
		updatedBy: string;
	}
) {
	const page = await prisma.page.update({
		where: { slug },
		data: {
			...(data.title !== undefined && { title: data.title }),
			...(data.description !== undefined && { description: data.description }),
			...(data.content !== undefined && { content: data.content }),
			...(data.allowedRoleIds !== undefined && { allowedRoleIds: data.allowedRoleIds }),
			...(data.allowedUserIds !== undefined && { allowedUserIds: data.allowedUserIds }),
			updatedBy: data.updatedBy
		}
	});

	await prisma.auditLog.create({
		data: { pageSlug: slug, userId: data.updatedBy, action: 'update' }
	});

	return page;
}

export async function getSiteConfig() {
	return prisma.siteConfig.findFirst();
}

export async function upsertSiteConfig(discordGuildId: string, updatedBy: string) {
	const existing = await prisma.siteConfig.findFirst();
	if (existing) {
		return prisma.siteConfig.update({
			where: { id: existing.id },
			data: { discordGuildId, updatedBy }
		});
	}
	return prisma.siteConfig.create({ data: { discordGuildId, updatedBy } });
}

export { isAdmin };
