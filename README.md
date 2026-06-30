# Rusticated Moderation Knowledge Base

Modern staff knowledge base built with SvelteKit, Tailwind CSS, MongoDB, and Discord authentication.

## Features

- Discord OAuth login with global staff role gate
- Per-page access control via Discord roles and users (multi-select in admin)
- Rich-text admin editor (TipTap) with live preview
- Content seeded from BookStack HTML exports in `/books`

## Quick start (development)

1. Copy environment file:

   ```bash
   cp .env.example .env
   ```

2. Fill in Discord credentials and `ADMIN_DISCORD_IDS` in `.env`.

3. Start MongoDB:

   ```bash
   docker compose up mongodb mongo-init -d
   ```

   For local dev without keyFile complexity, you can also run MongoDB locally with replica set:

   ```bash
   docker run -d --name mongo-rs -p 27017:27017 mongo:7 mongod --replSet rs0
   docker exec mongo-rs mongosh --eval "rs.initiate()"
   ```

4. Push schema and seed content:

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

## Discord app setup

1. Create an application at [Discord Developer Portal](https://discord.com/developers/applications)
2. OAuth2 redirect URL: `http://localhost:5173/auth/callback/discord` (or your production URL)
3. OAuth2 scopes: `identify`, `email`, `guilds.members.read`
4. Create a bot, enable **Server Members Intent**, invite bot to your guild
5. Set `DISCORD_GUILD_ID`, `DISCORD_REQUIRED_ROLE_ID`, and your user ID in `ADMIN_DISCORD_IDS`
6. In **Admin → Guild settings**, verify the guild ID for role/user pickers

## Production (Docker)

```bash
cp .env.example .env
# Edit .env with production values
docker compose up -d --build
docker compose exec app npx prisma db push
docker compose exec app npx prisma db seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync Prisma schema to MongoDB |
| `npm run db:seed` | Import pages from `/books` HTML |
