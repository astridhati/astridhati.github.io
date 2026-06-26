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
└── images/drawings/        # Immagini dei disegni
    ├── mio-disegno.webp    # Disegni singoli (senza progetto)
    └── schizzi-urbani/     # Una cartella per progetto (nome = id)
        └── vicolo.webp
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

### Disegni singoli (senza progetto)

1. **Salva l'immagine** direttamente in `images/drawings/`
   - Formato consigliato: WebP o JPG
   - Larghezza consigliata: max 1600px (per prestazioni)
   - Usa un nome file semplice, es. `mio-disegno.webp`

2. **Esegui lo script di sync:**

```powershell
npm run sync
```

3. **Rispondi alle domande** (titolo, anno, descrizione). Premi Invio per accettare i valori suggeriti.

4. **Anteprima:** `npm run dev` e ricarica la pagina.

### Progetti

Ogni progetto ha una **cartella** dentro `images/drawings/`. Il **nome della cartella** diventa l'`id` del progetto (es. `schizzi-urbani`).

**Per aggiungere un nuovo progetto:**

1. Crea la cartella `images/drawings/id-progetto/` (es. `images/drawings/ritratti/`)
2. Aggiungi le immagini del progetto dentro quella cartella
3. Esegui `npm run sync` e rispondi alle domande per il progetto e per ogni nuova immagine

**Per aggiungere un disegno a un progetto esistente:**

1. Salva l'immagine nella cartella del progetto
2. Esegui `npm run sync`

Lo script rileva solo **novità** (cartelle o immagini non ancora presenti nei JSON). Non rimuove voci esistenti: se cancelli un file, aggiorna manualmente i JSON.

### Come funziona in galleria

- **Immagini nella root** di `images/drawings/` → compaiono con il filtro **Altri lavori** (vista predefinita).
- **Immagini in una sottocartella** → compaiono solo quando quel progetto è selezionato (chip o click su una card progetto).

Cliccando una card nella sezione **Progetti**, la pagina scorre alla galleria e filtra i disegni di quel progetto. I chip sotto il titolo Galleria permettono di cambiare filtro; cliccare di nuovo il chip attivo torna alla vista **Altri lavori**.

### Modifica manuale dei JSON (opzionale)

I file `content/drawings.json` e `content/projects.json` possono essere modificati a mano per correggere titoli, descrizioni o anni. Esempio di disegno in un progetto:

```json
{
  "title": "Vicolo al mattino",
  "image": "images/drawings/schizzi-urbani/vicolo.webp",
  "year": "2025",
  "description": "Schizzo a matita di un vicolo al mattino.",
  "project": "schizzi-urbani"
}
```

Esempio di progetto:

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

Le immagini attuali in `images/drawings/` sono placeholder SVG. Sostituiscile con i veri disegni e usa `npm run sync` per aggiornare i JSON, oppure modifica i percorsi manualmente.
