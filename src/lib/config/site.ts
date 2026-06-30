export const SITE_NAME = 'Rusticated Moderation KB';

export function getSiteName(envName?: string): string {
	return envName?.trim() || SITE_NAME;
}
