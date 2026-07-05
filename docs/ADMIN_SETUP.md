# Admin setup (Sveltia CMS + Cloudflare Authenticator)

One-time setup so Ale can edit the site at `https://astridhati.github.io/admin/` and save changes directly to the repository.

## Overview

| Component | Purpose |
|-----------|---------|
| **[Sveltia CMS](https://sveltiacms.app/)** | Admin UI at `/admin` (successor to Decap CMS) |
| **[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)** | OAuth helper on **your** Cloudflare account |
| **GitHub OAuth App** | Identifies Ale when she logs in |
| **GitHub Actions** | Rebuilds and deploys the site after each commit |

Login is **Sign in with GitHub** — only GitHub accounts with **write access** to `astridhati/astridhati.github.io` can save changes.

The authenticator runs on **your Cloudflare Workers** (free tier). No Vercel, no Netlify, no third-party SaaS.

---

## Step 1 — Deploy Sveltia CMS Authenticator on Cloudflare (~10 min)

1. Create a free account at [cloudflare.com](https://cloudflare.com) (no credit card required for Workers free tier).
2. Open the official deploy page:  
   **[Deploy sveltia-cms-auth to Cloudflare Workers](https://deploy.workers.cloudflare.com/?url=https://github.com/sveltia/sveltia-cms-auth)**
3. Sign in to Cloudflare and complete the deployment.
4. In the Cloudflare dashboard, open the **`sveltia-cms-auth`** worker and copy its URL, e.g.:
   ```
   https://sveltia-cms-auth.your-subdomain.workers.dev
   ```
   Keep this URL — you need it in Steps 2, 3, and 4.

Alternative: clone [github.com/sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) and run `wrangler deploy` locally.

---

## Step 2 — GitHub OAuth App (~5 min)

**Important:** create an **OAuth App**, not a **GitHub App**.

1. Log in to GitHub as **astridhati**.
2. Avatar (top-right) → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.  
   Direct link: [github.com/settings/applications/new](https://github.com/settings/applications/new)
3. Fill in:

   | Field | Value |
   |-------|-------|
   | Application name | `Ale Portfolio Admin` |
   | Homepage URL | `https://astridhati.github.io` |
   | Authorization callback URL | `https://YOUR-WORKER-URL/callback` |

   Use the Worker URL from Step 1 + `/callback` (no trailing slash).

4. **Do not** enable Device Flow.
5. Click **Register application**.
6. Copy **Client ID**.
7. Click **Generate a new client secret** and copy **Client Secret** (shown once).

---

## Step 3 — Configure the Cloudflare Worker (~5 min)

1. Cloudflare dashboard → **Workers & Pages** → your **`sveltia-cms-auth`** worker.
2. **Settings** → **Variables and Secrets** → **Add**.
3. Add these environment variables:

   | Variable | Value |
   |----------|-------|
   | `GITHUB_CLIENT_ID` | Client ID from Step 2 |
   | `GITHUB_CLIENT_SECRET` | Client Secret from Step 2 (mark as **Encrypt**) |
   | `ALLOWED_DOMAINS` | `astridhati.github.io` |

   `ALLOWED_DOMAINS` restricts login to your site only (recommended).

4. **Save** and **Deploy** the worker again if prompted.

---

## Step 4 — Update CMS config in the repo

Edit [`public/admin/config.yml`](../public/admin/config.yml) and set your Worker URL:

```yaml
backend:
  name: github
  repo: astridhati/astridhati.github.io
  branch: main
  base_url: https://YOUR-WORKER-URL.workers.dev
  auth_methods:
    - oauth
```

Commit and push to `main`.

---

## Step 5 — GitHub Pages settings

1. Open `astridhati/astridhati.github.io` on GitHub.
2. **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).

The workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs on every push to `main` or `feature/rework_into_astro` (temporary, while testing admin on the feature branch).

---

## Step 6 — First login (Ale)

1. Visit **https://astridhati.github.io/admin/**
2. Click **Sign in with GitHub** (OAuth).
3. Approve access for the OAuth app.
4. Edit content, upload images, click **Publish** / **Save** — each save creates a commit.
5. Wait 1–2 minutes for GitHub Actions to rebuild the public site.

---

## What Ale can manage in admin

| Section | What it edits |
|---------|----------------|
| **Impostazioni sito** | Name, bio, email, logo, hero, social links |
| **Progetti** | One file per project (`content/projects/{id}.json`) |
| **Disegni** | One file per drawing (`content/drawings/{title}.json`) |

### Images

- Upload via the media library in admin.
- Files are stored in `public/images/drawings/` in the repo.
- For **single** drawings: type “Singolo” + one image.
- For **groups** (carousel): type “Gruppo”, cover + ordered image list.
- **Progetto** — dropdown list (not manual ID); leave empty for Altri lavori.
- **Singolo / Gruppo** — only relevant fields are shown for each type.
- **(EN) fields** — optional English copy for SEO and the English block on Chi sono.

### New project workflow

1. Create **Progetto** in admin with an `id` matching the folder name (e.g. `attivismo`).
2. Upload images into `public/images/drawings/attivismo/` via the media library.
3. Create **Disegni** entries linked to that project id.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Login fails / redirect error | Callback URL must be exactly `https://YOUR-WORKER/callback` |
| “Origin not allowed” | Set `ALLOWED_DOMAINS` to `astridhati.github.io` on the Worker |
| Save fails with 401 | GitHub user must have write access to the repo |
| Admin loads but config missing | Check `dist/admin/config.yml` exists after `npm run build` |
| Images broken after upload | Paths should start with `/images/` or `images/` — both work on the site |

---

## Security notes

- **Client Secret** lives only in Cloudflare Worker env vars — never commit it.
- The authenticator is **yours** on Cloudflare; the Sveltia author deliberately does not host it as a shared service.
- Revoke any personal access tokens embedded in git remote URLs; use SSH or Credential Manager instead.
- Only grant repo write access to Ale’s GitHub account.

---

## Why Sveltia instead of Decap?

[Sveltia CMS](https://sveltiacms.app/) is the maintained successor to Decap/Netlify CMS. The [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) is the official companion for GitHub OAuth on static hosts like GitHub Pages. Config format is compatible — only the admin script and auth setup changed.
