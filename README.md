# Root Dynamics website

A fully static, responsive website. The committed HTML, CSS, JavaScript, fonts, and SVG assets are the production site. There is no package install, build step, server runtime, or external font request.

## Local preview

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Serve from the repository root; asset paths start with `/`.

## Editing

- `index.html`: home page.
- `services/index.html`: service overview.
- `services/cloud_consultancy/`, `services/managed_solutions/`, `services/security/`, `services/acquisitions/`: service pages. Existing URLs are preserved.
- `about/index.html`, `contact/index.html`: company and contact pages.
- `assets/site.css`: shared styles, responsive layouts, and brand colors.
- `assets/site.js`: accessible mobile navigation and the optional email draft composer.
- `assets/images/`: new vector RD mark, favicon, and infrastructure illustration.
- `assets/fonts/`: locally hosted Manrope fonts with their SIL Open Font License.
- `sitemap.xml`, `robots.txt`: search indexing information.

The header and footer are deliberately present in each HTML page so navigation and content work without JavaScript. Update those shared sections consistently across pages when changing navigation or company information. Older images remain in `images/` for reference.

## Contact behavior

Email and telephone links work without JavaScript. With JavaScript enabled, the project brief composer creates a `mailto:` draft in the visitor’s email app or copies the brief to their clipboard. It does **not** send mail, submit to an API, or store entries in local storage. Field labels and notices make that behavior explicit. To add direct form delivery later, connect a form service and update the visitor-facing privacy information.

## Deployment

Publish the repository root as static files. `CNAME` retains `root-dynamics.com`. On GitHub Pages, `404.html` is the custom not-found page. `_redirects` is only used by hosts that support it; old theme demo URLs also contain static HTML redirects and visible fallback links, so they work on GitHub Pages.

No deployment is triggered by local edits. Review the content and preview before publishing. Business details and service offerings are based on the previous site; confirm office hours, identifiers, and service scope as part of your normal content review.

## Design

Brand green is `#12af33`. The brighter green accent is used on deep green backgrounds for contrast. The RD mark is a clean vector monogram with no extension at the bottom of the R. All primary text meets WCAG AA contrast at its intended size; reduced-motion preferences are honored.
