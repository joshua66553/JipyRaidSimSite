import type { NavPage } from '$lib/types/page';

export type TierKey = 'management' | 'head-admin' | 'admin' | 'moderator' | 'general';

export interface TierMeta {
	key: TierKey;
	label: string;
	/** CSS color token name from layout.css @theme */
	color: string;
	/** short blurb for section headers / page badges */
	blurb: string;
}

export const TIERS: Record<TierKey, TierMeta> = {
	management: {
		key: 'management',
		label: 'Management',
		color: 'var(--color-management)',
		blurb: 'Leadership, policy & staff oversight'
	},
	'head-admin': {
		key: 'head-admin',
		label: 'Head Admin',
		color: 'var(--color-head)',
		blurb: 'Escalations, bans & senior tooling'
	},
	admin: {
		key: 'admin',
		label: 'Admin',
		color: 'var(--color-admin)',
		blurb: 'Server administration & enforcement'
	},
	moderator: {
		key: 'moderator',
		label: 'Moderator',
		color: 'var(--color-mod)',
		blurb: 'Day-to-day moderation & support'
	},
	general: {
		key: 'general',
		label: 'General',
		color: 'var(--color-faint)',
		blurb: 'Reference for all staff'
	}
};

/** Order tiers are displayed in the sidebar (senior first). */
export const TIER_ORDER: TierKey[] = ['general', 'moderator', 'admin', 'head-admin', 'management'];

/**
 * Infer a staff role tier from a page's slug/title using keyword matching.
 * Head admin / management are checked before admin / mod to avoid mis-grouping.
 */
export function getTier(page: Pick<NavPage, 'slug' | 'title'>): TierMeta {
	const haystack = `${page.slug} ${page.title}`.toLowerCase();

	if (/(management|manager|leadership|owner|director)/.test(haystack)) return TIERS.management;
	if (/(head[\s-]?admin|senior admin|head[\s-]?mod)/.test(haystack)) return TIERS['head-admin'];
	if (/(admin|administrat)/.test(haystack)) return TIERS.admin;
	if (/(\bmod\b|moderat)/.test(haystack)) return TIERS.moderator;
	return TIERS.general;
}

export interface TierGroup {
	tier: TierMeta;
	pages: NavPage[];
}

/** Group nav pages by inferred tier, preserving page sort order within each group. */
export function groupByTier(pages: NavPage[]): TierGroup[] {
	const buckets = new Map<TierKey, NavPage[]>();
	for (const page of pages) {
		const tier = getTier(page);
		const list = buckets.get(tier.key) ?? [];
		list.push(page);
		buckets.set(tier.key, list);
	}
	return TIER_ORDER.filter((key) => buckets.has(key)).map((key) => ({
		tier: TIERS[key],
		pages: buckets.get(key)!
	}));
}
