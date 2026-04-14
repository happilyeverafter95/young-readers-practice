# Young Readers Practice

A friendly kindergarten reading-comprehension website (ages 4-6) built with Next.js. 
Hosted at https://young-readers-practice.mandygu925.workers.dev/

## Project Structure

- `app/`: routes for home, learn path, activity player, rewards, and parent view
- `components/`: reusable UI and progress context provider
- `lib/content/activities.ts`: content data for staged exercises
- `lib/progress/store.ts`: scoring, unlock logic, persistence helpers
- `public/placeholders/`: placeholder art assets

## Development

1. Install dependencies:
   - `npm install`
2. **Local environment (optional):** copy `.env.example` to `.env.local`, then edit `.env.local` and fill in any keys you need.
   - For Cloudflare Web Analytics locally, set `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` to the token from **Cloudflare dashboard → Web Analytics → your site → Manage site** (same value you use in CI). If you leave it blank, the app runs without the analytics beacon.
3. Start dev server:
   - `npm run dev`
4. Open:
   - [http://localhost:3000](http://localhost:3000)

## Replacing Placeholder Images

Each major image slot now has its own file path in `public/placeholders/`.

- Home hero: `/placeholders/jellycat.png`
- Activity placeholders: `/placeholders/stage1-first-words-1.svg` through `/placeholders/stage4-comprehension-2.svg`

To replace imagery later, swap any individual file or update `imagePlaceholder` values in `lib/content/activities.ts`.
