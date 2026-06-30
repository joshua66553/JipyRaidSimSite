import { p as private_env, b as base, a as parseSetCookie, r as redirect } from './index.js-H2yCcV1v.js';
import { b as avatarUrl, g as getGuildId, c as getMemberRoleIds } from './discord-BYjBnNev.js';
import { isAuthAction, Auth, skipCSRFCheck, setEnvDefaults, createActionURL, raw } from '@auth/core';
import '@auth/core/errors';
import Discord from '@auth/core/providers/discord';

//#region node_modules/@auth/sveltekit/dist/env.js
function setEnvDefaults$1(envObject, config) {
	config.trustHost ??= false;
	config.basePath = `${base}/auth`;
	config.skipCSRFCheck = skipCSRFCheck;
	setEnvDefaults(envObject, config);
}
//#endregion
//#region node_modules/@auth/sveltekit/dist/actions.js
async function signIn$1(provider, options = {}, authorizationParams, config, event) {
	const { request, url: { protocol } } = event;
	const headers = new Headers(request.headers);
	const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
	const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
	const signInURL = createActionURL("signin", protocol, headers, private_env, config);
	if (!provider) {
		signInURL.searchParams.append("callbackUrl", callbackUrl);
		if (shouldRedirect) redirect(302, signInURL.toString());
		return signInURL.toString();
	}
	let url = `${signInURL}/${provider}?${new URLSearchParams(authorizationParams)}`;
	let foundProvider = {};
	for (const providerConfig of config.providers) {
		const { options, ...defaults } = typeof providerConfig === "function" ? providerConfig() : providerConfig;
		const id = options?.id ?? defaults.id;
		if (id === provider) {
			foundProvider = {
				id,
				type: options?.type ?? defaults.type
			};
			break;
		}
	}
	if (!foundProvider.id) {
		const url = `${signInURL}?${new URLSearchParams({ callbackUrl })}`;
		if (shouldRedirect) redirect(302, url);
		return url;
	}
	if (foundProvider.type === "credentials") url = url.replace("signin", "callback");
	headers.set("Content-Type", "application/x-www-form-urlencoded");
	const body = new URLSearchParams({
		...rest,
		callbackUrl
	});
	const res = await Auth(new Request(url, {
		method: "POST",
		headers,
		body
	}), {
		...config,
		raw
	});
	for (const c of res?.cookies ?? []) event.cookies.set(c.name, c.value, {
		path: "/",
		...c.options
	});
	if (shouldRedirect) return redirect(302, res.redirect);
	return res.redirect;
}
async function signOut$1(options, config, event) {
	const { request, url: { protocol } } = event;
	const headers = new Headers(request.headers);
	headers.set("Content-Type", "application/x-www-form-urlencoded");
	const url = createActionURL("signout", protocol, headers, private_env, config);
	const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
	const body = new URLSearchParams({ callbackUrl });
	const res = await Auth(new Request(url, {
		method: "POST",
		headers,
		body
	}), {
		...config,
		raw
	});
	for (const c of res?.cookies ?? []) event.cookies.set(c.name, c.value, {
		path: "/",
		...c.options
	});
	if (options?.redirect ?? true) return redirect(302, res.redirect);
	return res;
}
async function auth(event, config) {
	setEnvDefaults$1(private_env, config);
	config.trustHost ??= true;
	const { request: req, url: { protocol } } = event;
	const sessionUrl = createActionURL("session", protocol, req.headers, private_env, config);
	const response = await Auth(new Request(sessionUrl, { headers: { cookie: req.headers.get("cookie") ?? "" } }), config);
	const authCookies = parseSetCookie(response.headers.getSetCookie());
	for (const cookie of authCookies) {
		const { name, value, ...options } = cookie;
		event.cookies.set(name, value, {
			path: "/",
			...options
		});
	}
	const { status = 200 } = response;
	const data = await response.json();
	if (!data || !Object.keys(data).length) return null;
	if (status === 200) return data;
	throw new Error(data.message);
}
//#endregion
//#region node_modules/@auth/sveltekit/dist/index.js
var authorizationParamsPrefix = "authorizationParams-";
/**
* The main entry point to `@auth/sveltekit`
* @see https://sveltekit.authjs.dev
*/
function SvelteKitAuth(config) {
	return {
		signIn: async (event) => {
			const { request } = event;
			const _config = typeof config === "object" ? config : await config(event);
			setEnvDefaults$1(private_env, _config);
			const formData = await request.formData();
			const { providerId: provider, ...options } = Object.fromEntries(formData);
			const authorizationParams = {};
			const _options = {};
			for (const key in options) if (key.startsWith(authorizationParamsPrefix)) authorizationParams[key.slice(20)] = options[key];
			else _options[key] = options[key];
			await signIn$1(provider, _options, authorizationParams, _config, event);
		},
		signOut: async (event) => {
			const _config = typeof config === "object" ? config : await config(event);
			setEnvDefaults$1(private_env, _config);
			await signOut$1(Object.fromEntries(await event.request.formData()), _config, event);
		},
		async handle({ event, resolve }) {
			const _config = typeof config === "object" ? config : await config(event);
			setEnvDefaults$1(private_env, _config);
			const { url, request } = event;
			event.locals.auth ??= () => auth(event, _config);
			event.locals.getSession ??= event.locals.auth;
			const action = url.pathname.slice(_config.basePath.length + 1).split("/")[0];
			if (isAuthAction(action) && url.pathname.startsWith(_config.basePath + "/")) return Auth(request, _config);
			return resolve(event);
		}
	};
}
//#endregion
//#region src/lib/server/auth.ts
async function refreshRoles(discordId) {
	const guildId = await getGuildId();
	if (!guildId) return [];
	try {
		return await getMemberRoleIds(guildId, discordId);
	} catch {
		return [];
	}
}
var { handle, signIn} = SvelteKitAuth({
	providers: [Discord({
		clientId: private_env.DISCORD_CLIENT_ID,
		clientSecret: private_env.DISCORD_CLIENT_SECRET,
		authorization: { params: { scope: "identify email guilds.members.read" } }
	})],
	secret: private_env.AUTH_SECRET,
	trustHost: true,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const discordProfile = profile;
				const discordId = discordProfile.id ?? token.sub ?? "";
				token.discordId = discordId;
				token.name = discordProfile.global_name ?? discordProfile.username ?? token.name;
				token.picture = avatarUrl(discordId, discordProfile.avatar);
				token.roleIds = await refreshRoles(discordId);
				token.rolesCheckedAt = Date.now();
			}
			const stale = !token.rolesCheckedAt || Date.now() - token.rolesCheckedAt > 300 * 1e3;
			if (token.discordId && stale) {
				token.roleIds = await refreshRoles(token.discordId);
				token.rolesCheckedAt = Date.now();
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				const discordId = token.discordId ?? token.sub ?? "";
				session.user.discordId = discordId;
				session.user.id = discordId;
				session.user.roleIds = token.roleIds ?? [];
				session.user.rolesCheckedAt = token.rolesCheckedAt ?? 0;
				if (token.picture) session.user.image = token.picture;
			}
			return session;
		}
	},
	pages: { signIn: "/login" }
});

export { handle as h, signIn as s };
//# sourceMappingURL=auth-DhpCFoFY.js.map
