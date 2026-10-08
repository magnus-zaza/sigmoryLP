# Sigmory landing page

Standalone public landing page for Sigmory. The complete site is contained in this repository and is hosted directly by GitHub Pages. It has no dependency on `sigmory.no`, a separate application, a backend, authentication, control logic, or private project files.

## Run locally

```bash
npm install
npm run dev
```

## Publish with GitHub Pages

1. Copy this folder into a new public GitHub repository.
2. Push it to the repository's `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. The included workflow builds and publishes the site automatically.

The Vite build uses relative asset paths, so it works from either a root domain or a GitHub project path such as `username.github.io/sigmory/`.

All navigation remains inside the landing page. No external Sigmory domain is required.
