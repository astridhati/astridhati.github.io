# Portfolio disegni — Sito Ale

Sito portfolio multi-pagina per illustrazioni e disegni. Costruito con [Astro](https://astro.build), pubblicato su GitHub Pages, con pannello admin [Sveltia CMS](https://sveltiacms.app/) per gestire contenuti e immagini.

**Sito live:** https://astridhati.github.io

## Pagine

| URL | Contenuto |
|-----|-----------|
| `/` | Home, hero, carousel progetti |
| `/progetti/` | Elenco progetti |
| `/progetti/{id}/` | Dettaglio progetto + galleria opere |
| `/galleria/` | Altri lavori (disegni senza progetto) |
| `/chi-sono/` | Bio |
| `/contatti/` | Email e social |
| `/admin/` | Pannello admin (solo con login GitHub) |

## Struttura del progetto

```
├── content/
│   ├── site.json              # Impostazioni sito
│   ├── projects/*.json        # Un file per progetto
│   └── drawings/*.json        # Un file per disegno/gruppo
├── public/
│   ├── images/                # Immagini statiche (drawings, logo, hero)
│   ├── admin/                 # Sveltia CMS
│   └── fonts/
├── src/
│   ├── components/            # Componenti Astro
│   ├── layouts/               # Layout condiviso
│   ├── lib/                   # Caricamento contenuti
│   ├── pages/                 # Route del sito
│   ├── scripts/               # JS client (lightbox, nav, carousel)
│   └── styles/                # Sass
├── .github/workflows/         # Deploy automatico
└── docs/ADMIN_SETUP.md        # Setup OAuth (una tantum)
```

## Sviluppo locale

```powershell
npm install
npm run dev
```

Apri http://localhost:4321

```powershell
npm run build    # Build produzione → cartella dist/
npm run preview  # Anteprima build locale
```

## Aggiungere contenuti

### Via admin (consigliato per Ale)

1. Vai su https://astridhati.github.io/admin/
2. Accedi con GitHub
3. Modifica testi, progetti, disegni; carica immagini
4. Salva → commit automatico → il sito si ricostruisce in ~1–2 min

Setup iniziale OAuth: vedi [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md).

### Via file (sviluppatori)

- **Sito:** modifica `content/site.json`
- **Progetto:** aggiungi `content/projects/{id}.json`
- **Disegno singolo:** aggiungi `content/drawings/{slug}.json` con `"grouped": "single"`
- **Gruppo carousel:** `"grouped": "multiple"`, `cover`, `images[]`, opzionale `group`
- **Immagini:** salva in `public/images/drawings/…`

Esempio disegno singolo in progetto:

```json
{
  "title": "Angry Females",
  "image": "images/drawings/attivismo/Donna vacca.png",
  "year": "2026",
  "description": "Progetto per l'8 marzo",
  "project": "attivismo",
  "grouped": "single"
}
```

Esempio “Altri lavori” (senza `project`):

```json
{
  "title": "Progetto Birra",
  "grouped": "multiple",
  "cover": "images/drawings/[other_images]/progetto-birra/Birra2.jpg",
  "images": ["images/drawings/[other_images]/progetto-birra/Birra2.jpg", "..."],
  "year": "2026",
  "description": "..."
}
```

## Deploy

Ogni push su `main` attiva GitHub Actions che esegue `npm run build` e pubblica su GitHub Pages.

**Prima del primo deploy:** Settings → Pages → Source → **GitHub Actions**.

## SEO

- Meta title/description e Open Graph per ogni pagina
- Sitemap automatica (`/sitemap-index.xml`)
- JSON-LD (`Person` in home, `CollectionPage` nei progetti)
- `robots.txt` (admin escluso dall’indicizzazione)

## Stili (Sass)

Modifica i file in `src/styles/`. Astro compila Sass automaticamente in dev e build.

Breakpoint in `src/styles/_breakpoints.scss`:

| Mixin | Significato |
|-------|-------------|
| `@include below-sm` | sotto 650px |
| `@include from-sm` | da 650px |
| `@include from-md` | da 768px |
| `@include from-lg` | da 1024px |
| `@include from-xl` | da 1200px |

## Domini personalizzati

Dopo la pubblicazione, collega un dominio dalle impostazioni GitHub Pages del repository.
