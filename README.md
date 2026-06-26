# Portfolio disegni — Sito Ale

Sito single-page statico per mostrare disegni e illustrazioni. Nessun framework JavaScript; gli stili sono scritti in Sass e compilati in CSS.

## Struttura del progetto

```
├── index.html              # Layout della pagina
├── package.json            # Script dev server, sync e build CSS
├── scripts/
│   └── sync-content.js     # Aggiorna JSON da cartelle/immagini
├── css/
│   ├── styles.css          # CSS compilato (non modificare a mano)
│   ├── fonts/              # Font locali
│   └── scss/               # Sorgenti Sass — modifica questi file
│       ├── styles.scss     # Entry point
│       ├── _breakpoints.scss  # Mixins responsive (sm, md, lg, xl)
│       ├── _variables.scss
│       └── _*.scss         # Componenti (header, gallery, …)
├── js/main.js              # Carica JSON e renderizza galleria
├── content/
│   ├── site.json           # Nome, bio, email, social
│   ├── projects.json       # Elenco progetti
│   └── drawings.json       # Elenco disegni in galleria
└── images/drawings/        # Solo cartelle — nessun file immagine in root
    ├── [other_images]/     # Riservata: lavori non assegnati (Altri lavori)
    │   ├── mio-disegno.webp    # Singolo non assegnato (file in root)
    │   └── birra-series/       # Gruppo non assegnato (sottocartella)
    │       ├── slide-1.jpg
    │       └── slide-2.jpg
    └── attivismo/          # Cartella progetto (nome = id)
        ├── Donna vacca.png     # Singolo nel progetto
        └── manifesto-2026/     # Gruppo nel progetto (carousel in lightbox)
            ├── slide-1.jpg
            └── slide-2.jpg
```

## Anteprima locale

I file JSON non si caricano aprendo `index.html` direttamente nel browser. Usa il server locale incluso nel progetto:

```bash
# Prima volta: installa le dipendenze
npm install
# oppure: pnpm install

# Avvia il server su http://localhost:8000 (compila anche il CSS)
npm run dev
# oppure: pnpm dev
```

Su Windows con PowerShell, dalla cartella del progetto:

```powershell
npm install
npm run dev
```

### Modificare gli stili (Sass)

Gli stili si modificano in `css/scss/`, non direttamente in `css/styles.css`.

```powershell
# Compila una volta
npm run build:css

# Compila automaticamente ad ogni salvataggio
npm run watch:css
```

Breakpoint disponibili in `_breakpoints.scss`:

| Mixin | Significato |
|-------|-------------|
| `@include below-sm` | sotto 650px |
| `@include from-sm` | da 650px |
| `@include sm-only` | 650px – 767px |
| `@include below-md` | sotto 768px |
| `@include from-md` | da 768px |
| `@include from-lg` | da 1024px |
| `@include from-xl` | da 1200px |

Esempio in un partial:

```scss
@use "breakpoints" as *;

.gallery-grid {
  grid-template-columns: 1fr;

  @include from-sm {
    grid-template-columns: repeat(2, 1fr);
  }

  @include from-lg {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Dopo aver modificato gli SCSS, esegui `npm run build:css` prima di fare push su GitHub (il CSS compilato va committato).

## Come aggiungere disegni e progetti

Usa lo script di sync per aggiornare automaticamente i file JSON dopo aver aggiunto immagini o cartelle.

### Regole cartelle

- **Nessuna immagine** direttamente in `images/drawings/` — solo cartelle. Lo script avvisa se trova file sparsi in root.
- **`[other_images]/`** — cartella riservata per i lavori non assegnati a un progetto (filtro **Altri lavori**):
  - **File** in `[other_images]/` → voce singola (`grouped: "single"`, senza `project`)
  - **Sottocartella** `[other_images]/{gruppo}/` → voce multipla (`grouped: "multiple"`, carousel in lightbox)
- **Cartella progetto** `{id-progetto}/` — stessa logica:
  - **File** nella root del progetto → singolo con `"project": "{id}"`
  - **Sottocartella** `{id-progetto}/{gruppo}/` → multipla con `project` + `group`

### Disegni singoli (Altri lavori)

1. **Salva l'immagine** in `images/drawings/[other_images]/`
2. **Esegui** `npm run sync` e rispondi alle domande (titolo, anno, descrizione)

### Gruppi di immagini (carousel)

1. Crea una **sottocartella** con le immagini del gruppo, ad es.:
   - `images/drawings/[other_images]/birra-series/` (non assegnato)
   - `images/drawings/fumetti/cani/` (dentro un progetto)
2. **Esegui** `npm run sync`
3. Lo script elenca le immagini numerate e chiede l'ordine:
   - `Ordine immagini (es. 2,1,3 oppure Invio per ordine mostrato):`
   - Invio = ordine alfabetico dei file; oppure indica la sequenza desiderata (es. `2,1,3`)
4. La **prima immagine** dell'ordine diventa la copertina in galleria; in lightbox si scorrono tutte con frecce e contatore

Se aggiungi immagini a un gruppo esistente, lo script propone di **aggiungerle in fondo** o **riordinare tutto**.

### Progetti

Ogni progetto ha una **cartella** dentro `images/drawings/` (es. `attivismo`, `fumetti`). Il **nome della cartella** diventa l'`id` del progetto.

**Per aggiungere un nuovo progetto:**

1. Crea `images/drawings/id-progetto/`
2. Aggiungi singoli (file) e/o gruppi (sottocartelle)
3. Esegui `npm run sync`

**Per aggiungere contenuto a un progetto esistente:**

1. Salva file o sottocartelle nella cartella del progetto
2. Esegui `npm run sync`

Lo script rileva **novità** (cartelle, file o gruppi non ancora presenti nei JSON) e **rimuove** voci il cui file, gruppo o cartella progetto non esiste più su disco. Per i gruppi, se elimini singole immagini, restano le altre e `cover` viene aggiornato a `images[0]`.

### Come funziona in galleria

- **Altri lavori** (vista predefinita): tutte le voci **senza** `project` — singoli e gruppi da `[other_images]/`.
- **Filtro progetto**: voci con `"project": "id-progetto"`.
- **Una card per voce JSON**; i gruppi usano `cover` come anteprima.
- **Lightbox**: singoli = una immagine; gruppi = carousel con frecce, contatore e caption fissa; tasti ← → per navigare.

Cliccando una card nella sezione **Progetti**, la pagina scorre alla galleria e filtra i disegni di quel progetto. I chip sotto il titolo Galleria permettono di cambiare filtro; cliccare di nuovo il chip attivo torna alla vista **Altri lavori**.

### Modifica manuale dei JSON (opzionale)

I file `content/drawings.json` e `content/projects.json` possono essere modificati a mano. Esempi:

**Singolo (Altri lavori):**
```json
{
  "title": "Birra Bella",
  "image": "images/drawings/[other_images]/Birra1.jpg",
  "year": "2026",
  "description": "Bella",
  "grouped": "single"
}
```

**Singolo in progetto:**
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

**Gruppo (carousel):**
```json
{
  "title": "Cani",
  "group": "cani",
  "grouped": "multiple",
  "cover": "images/drawings/fumetti/cani/Cani1.jpg",
  "images": [
    "images/drawings/fumetti/cani/Cani1.jpg",
    "images/drawings/fumetti/cani/Cani2.jpg"
  ],
  "year": "2026",
  "description": "Cani belli belli",
  "project": "fumetti"
}
```

**Progetto:**

```json
{
  "id": "schizzi-urbani",
  "name": "Schizzi urbani",
  "cover": "images/drawings/schizzi-urbani/vicolo.webp",
  "year": "2025",
  "description": "Studi di città e architettura."
}
```

> **Attenzione alla virgola:** ogni oggetto nel JSON deve essere separato da una virgola, tranne l'ultimo. Se il sito non carica, controlla che il JSON sia valido (puoi usare [jsonlint.com](https://jsonlint.com)).

## Modificare bio, contatti e social

Modifica `content/site.json`:

```json
{
  "name": "Ale",
  "tagline": "Illustratrice & artista",
  "bio": "Il tuo testo qui...",
  "email": "tua-email@example.com",
  "heroBackground": "images/hero-background.svg",
  "social": {
    "instagram": "https://instagram.com/tuo-profilo"
  }
}
```

- **Social:** compaiono come icone nella barra di navigazione in alto. Aggiungi o rimuovi piattaforme nell'oggetto `social` — le icone supportate sono `instagram`, `behance`, `pinterest`, `tiktok`, `twitter`, `facebook`, `linkedin`, `youtube`.
- **Email:** lascia `"email": ""` finché non avete un indirizzo. Quando lo imposti, compare l'icona email in nav e il pulsante "Scrivimi un'email" nella sezione contatti — entrambi aprono il client di posta con un messaggio vuoto.
- **Hero background:** imposta `"heroBackground"` con il percorso dell'immagine (es. `"images/hero-background.jpg"`). Lascia vuoto (`""`) per usare solo il gradiente di default.

## Pubblicazione online (GitHub Pages)

1. Crea un repository su GitHub (es. `sito-ale-portfolio`)

2. Inizializza git e fai push:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/sito-ale-portfolio.git
git push -u origin main
```

3. Su GitHub: **Settings → Pages → Source** → seleziona branch `main`, cartella `/ (root)`

4. Dopo qualche minuto il sito sarà disponibile su:
   `https://TUO-USERNAME.github.io/sito-ale-portfolio/`

### Alternative gratuite

- **Netlify:** trascina la cartella del progetto su [app.netlify.com/drop](https://app.netlify.com/drop)
- **Cloudflare Pages:** collega il repository GitHub

## Domini personalizzati

Dopo la pubblicazione, puoi collegare un dominio personalizzato dalle impostazioni di GitHub Pages, Netlify o Cloudflare.

## Sostituire le immagini di esempio

Sostituisci i file in `images/drawings/[other_images]/` e nelle cartelle progetto con i veri disegni, poi usa `npm run sync` per aggiornare i JSON, oppure modifica i percorsi manualmente.
