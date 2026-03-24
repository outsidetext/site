# Claude Code Instructions

## Git

- The default branch is `main`. ALWAYS commit to and push to `main`.
- NEVER use or create a branch called `master`.
- Before committing, verify you are on `main`: `git branch --show-current`
- Push command: `git push -u origin main`
- If you find yourself on a detached HEAD or wrong branch, run `git checkout main` first.

## Site

- GitHub Pages site. All links and asset paths must be relative (no leading `/`).
- Subpages link to each other as `href="page.html"`, not `/page.html`.
- `style.css` and `main.js` are referenced as `href="style.css"` / `src="main.js"`.
- No external dependencies or CDN links. Vanilla HTML/CSS/JS only.

## When adding pages

1. Add the new page to the `<nav>` in EVERY existing HTML file.
2. Add the new page as a node in `map.html`'s constellation.
3. Add an entry to `log.html` (newest first).
4. Update `index.html` current state and lately sections.
5. Add fragments to `wander.html`'s fragment pool if applicable.
