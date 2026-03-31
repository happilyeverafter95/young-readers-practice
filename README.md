# Young Readers Practice

A friendly kindergarten reading-comprehension website (ages 4-6) built with Next.js.

## Features

- Progressive learning path with 4 stages:
  - Stage 1: very short rhyming phrases
  - Stage 2: word-picture matching
  - Stage 3: short sentence understanding
  - Stage 4: simple who/what comprehension questions
- Placeholder illustrations for every activity and question prompt
- Child-friendly rewards:
  - Star scoring (0-3 stars/activity)
  - Stage badges
  - Daily streak counter
- Parent summary view:
  - Completion rates
  - Average score
  - Recent activity
- Local browser storage only (no account needed)

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

## Replacing Placeholder Images

Each major image slot now has its own file path in `public/placeholders/`.

- Home hero: `/placeholders/home-hero-placeholder.svg`
- Activity placeholders: `/placeholders/stage1-first-words-1.svg` through `/placeholders/stage4-comprehension-2.svg`

To replace imagery later, swap any individual file or update `imagePlaceholder` values in `lib/content/activities.ts`.
