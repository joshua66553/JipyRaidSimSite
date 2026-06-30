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
	if (typeof content === 'object' && content !== null) {
		const c = content as Partial<PageContent>;
		const html = typeof c.html === 'string' ? c.html : '';
		const markdown = typeof c.markdown === 'string' ? c.markdown : '';
		return { markdown, html };
	}
	return { markdown: '', html: '' };
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

export async function createPage(data: {
	slug: string;
	title: string;
	description?: string | null;
	content: PageContent;
	allowedRoleIds?: string[];
	allowedUserIds?: string[];
	createdBy: string;
}) {
	const count = await prisma.page.count();
	const page = await prisma.page.create({
		data: {
			slug: data.slug,
			title: data.title,
			description: data.description ?? null,
			content: data.content,
			sortOrder: count,
			allowedRoleIds: data.allowedRoleIds ?? [],
			allowedUserIds: data.allowedUserIds ?? [],
			updatedBy: data.createdBy
		}
	});

	await prisma.auditLog.create({
		data: { pageSlug: data.slug, userId: data.createdBy, action: 'create' }
	});

	return page;
}

export async function deletePage(slug: string, userId: string) {
	const page = await prisma.page.delete({ where: { slug } });
	await prisma.auditLog.create({
		data: { pageSlug: slug, userId, action: 'delete' }
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
