# sourabhuday.github.io

Personal homepage with **About**, **Photography**, and **Blog**
sections. Plain HTML/CSS/JS — no build step. Hosted with GitHub Pages.

## Editing content

All content lives in a few easy-to-edit files:

| What | Where |
| --- | --- |
| Name, bio, updates, nav | `index.html` |
| Photography | `photos.json` (images in `images/photos/`) |
| Blog posts | `blog.json` |
| Profile photo | `images/profile.jpg` |
| Styling/colors | `styles.css` (`:root` variables at the top) |

### Add a photo
1. Drop the image in `images/photos/` (e.g. `1.jpg`).
2. Add an entry to `photos.json`:
   ```json
   { "src": "images/photos/1.jpg", "caption": "Optional caption" }
   ```
   For faster loading you can also point `thumb` at a smaller version.

### Add a blog post
Add an entry to `blog.json`. `url` is optional (link to an external post or a page);
omit it for a title-only entry.
```json
{ "title": "My post", "date": "June 2026", "excerpt": "Short summary.", "url": "" }
```

## Run locally

The pages fetch JSON, so open them through a local server (not `file://`):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Push to `main`; GitHub Pages serves it at https://sourabhuday.github.io/.
