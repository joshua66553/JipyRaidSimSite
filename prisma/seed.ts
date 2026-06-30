import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const booksDir = join(process.cwd(), 'books');

function extractPageHtml(filename: string): string {
	const html = readFileSync(join(booksDir, filename), 'utf-8');
	const $ = cheerio.load(html);
	const pageContent = $('.page-content').first();
	if (pageContent.length) {
		return pageContent.html()?.trim() ?? '';
	}
	return '';
}

function extractGeneralInfoHtml(): string {
	const html = readFileSync(join(booksDir, 'general-info.html'), 'utf-8');
	const $ = cheerio.load(html);
	const intro = $('.book-content .text-muted').first().html()?.trim() ?? '';
	const links = $('.book-contents')
		.find('.entity-list-item-name')
		.map((_, el) => $(el).text().trim())
		.get()
		.filter(Boolean);

	const childLinks = links
		.map(
			(name) =>
				`<li><a href="/${name.toLowerCase().replace(/\s+/g, '-').replace('useful-commands', 'useful-commands')}">${name}</a></li>`
		)
		.join('');

	return `
		${intro}
		<h2>Pages</h2>
		<ul>
			<li><a href="/guidelines">Guidelines</a></li>
			<li><a href="/useful-commands">Useful Commands</a></li>
			<li><a href="/moderation">Moderation</a></li>
		</ul>
	`.trim();
}

const pages = [
	{
		slug: 'general-info',
		title: 'General Info',
		description: 'Welcome and overview for Raid Simulator staff.',
		sortOrder: 0,
		content: { html: extractGeneralInfoHtml() }
	},
	{
		slug: 'guidelines',
		title: 'Guidelines',
		description: 'Staff guidelines for Raid Simulator.',
		sortOrder: 1,
		content: { html: extractPageHtml('guidelines.html') }
	},
	{
		slug: 'useful-commands',
		title: 'Useful Commands',
		description: 'In-game and console moderation commands.',
		sortOrder: 2,
		content: { html: extractPageHtml('useful-commands.html') }
	},
	{
		slug: 'moderation',
		title: 'Moderation',
		description: 'Moderation policies and ban guidelines.',
		sortOrder: 3,
		content: { html: extractPageHtml('moderation.html') }
	}
];

async function main() {
	for (const page of pages) {
		await prisma.page.upsert({
			where: { slug: page.slug },
			update: {
				title: page.title,
				description: page.description,
				content: page.content,
				sortOrder: page.sortOrder
			},
			create: {
				slug: page.slug,
				title: page.title,
				description: page.description,
				content: page.content,
				sortOrder: page.sortOrder,
				allowedRoleIds: [],
				allowedUserIds: []
			}
		});
	}

	const existingConfig = await prisma.siteConfig.findFirst();
	if (!existingConfig) {
		await prisma.siteConfig.create({
			data: {
				discordGuildId: process.env.DISCORD_GUILD_ID ?? null,
				updatedBy: null
			}
		});
	}

	console.log(`Seeded ${pages.length} pages.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
