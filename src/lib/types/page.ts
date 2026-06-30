export type PageContent = {
	/** Markdown source authored in the editor (may be empty for legacy pages). */
	markdown: string;
	/** Pre-rendered HTML (generated from markdown server-side) used for display. */
	html: string;
};

export type NavPage = {
	slug: string;
	title: string;
	sortOrder: number;
};

export type DiscordRole = {
	id: string;
	name: string;
	color: number;
};

export type DiscordMember = {
	id: string;
	username: string;
	displayName: string;
	avatar: string | null;
};
