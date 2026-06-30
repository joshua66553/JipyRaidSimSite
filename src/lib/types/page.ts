export type PageContent = {
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
