# Stepforge landing page

The marketing site for **Stepforge**, the walking RPG for iPhone. It is built with React and Vite, uses [motion](https://motion.dev) for animation and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

```sh
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
```

## Before launch

- Set `APP_STORE_URL` in `src/data/site.js`. Until you set it, every store button reads "Coming soon to the App Store" and is not a link.
- Each push to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`. Before the first deploy, set **Settings → Pages → Source** to **GitHub Actions** in the repo.

## Artwork, sounds and weapon data

Everything in `public/img`, `public/audio`, `src/assets/fonts` and `src/data/weapons.json` comes from the app repo. `npm run assets` imports it again from `../stepforge` and resizes the images to WebP. To use a different path, pass it: `npm run assets -- path/to/stepforge`. The output is committed, so CI does not need the app repo.

## Structure

- `src/data/site.js`: all copy, plus the chapters, disciples, odds ladder and Pro perks.
- `src/components/`: one component per section. The sections are Hero, Intro, ForgeDemo, World, Realms, Disciples, Duel and Armory. Closing holds Pro, Media, the final call to action and the footer.
- `src/styles.css`: the design tokens and section styles, followed by the responsive and touch rules.

The site respects **Reduce Motion**. Animations stop, smooth scrolling turns off and the Aethra passage renders statically.
