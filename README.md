# Portfolio OS

An interactive OS-desktop-themed portfolio built with Vite + React + Tailwind CSS + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

## How to edit your content

All personal content lives in **one file**: `src/config/portfolio.js`

Look for `// EDIT ME` comments. You can update:
- Your name, bio, email, university, and grad year
- Your resume path (drop the PDF in `public/resume.pdf`)
- Your avatar (drop the image in `public/avatar.jpg`, then set `avatar: '/avatar.jpg'`)
- Every social handle and URL (GitHub, LinkedIn, LeetCode, Instagram)
- All 6 project entries — or add more; the UI adapts automatically

## How to add a new app/window

1. Create `src/apps/YourApp.jsx`
2. Add one entry to the `APPS` array in `src/config/apps.jsx`:

```js
{
  id: 'yourapp',
  label: 'Your App',
  icon: SomeLucideIcon,
  component: YourApp,
  defaultSize: { width: 400, height: 400 },
  minSize: { width: 300, height: 300 },
}
```

That's it — the icon appears in the dock and on the desktop automatically.

## How to replace the resume

Drop your PDF at `public/resume.pdf`. The "Download Resume" button in the About window links there.

## Deploying to Vercel

```bash
npm run build
```

Then import the repo into [vercel.com](https://vercel.com) — zero configuration needed.
Set the framework preset to **Vite** and the output directory to `dist`.

## Deploying to Netlify / GitHub Pages

- Netlify: connect the repo, build command `npm run build`, publish directory `dist`
- GitHub Pages: use the `gh-pages` package with `base` set in `vite.config.js` to your repo name
