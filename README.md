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
2. Start dev server:
   - `npm run dev`
3. Open:
   - [http://localhost:3000](http://localhost:3000)

Cloudflare Web Analytics is production-only and does not run during local development.

## Replacing Placeholder Images

Each major image slot now has its own file path in `public/placeholders/`.

- Home hero: `/placeholders/jellycat.png`
- Activity placeholders: `/placeholders/stage1-first-words-1.svg` through `/placeholders/stage4-comprehension-2.svg`

To replace imagery later, swap any individual file or update `imagePlaceholder` values in `lib/content/activities.ts`.
