# Portfolio disegni — Sito Ale

Sito single-page statico per mostrare disegni e illustrazioni. Nessun framework, nessun build step.

## Struttura del progetto

```
├── index.html              # Layout della pagina
├── package.json            # Script dev server (npm run dev)
├── css/styles.css          # Stili
├── js/main.js              # Carica JSON e renderizza galleria
├── content/
│   ├── site.json           # Nome, bio, email, social
│   ├── projects.json       # Elenco progetti
│   └── drawings.json       # Elenco disegni in galleria
└── images/drawings/        # File immagine dei disegni
```

## Anteprima locale

I file JSON non si caricano aprendo `index.html` direttamente nel browser. Usa il server locale incluso nel progetto:

```bash
# Prima volta: installa le dipendenze
npm install
# oppure: pnpm install

# Avvia il server su http://localhost:8000
npm run dev
# oppure: pnpm dev
```

Su Windows con PowerShell, dalla cartella del progetto:

```powershell
npm install
npm run dev
```

## Come aggiungere un nuovo disegno

1. **Salva l'immagine** in `images/drawings/`
   - Formato consigliato: WebP o JPG
   - Larghezza consigliata: max 1600px (per prestazioni)
   - Usa un nome file semplice, es. `mio-disegno.webp`

2. **Aggiungi una voce** in `content/drawings.json`:

```json
{
  "title": "Titolo del disegno",
  "image": "images/drawings/mio-disegno.webp",
  "year": "2025",
  "description": "Breve descrizione opzionale"
}
```

3. **Salva e ricarica** la pagina nel browser.

> **Attenzione alla virgola:** ogni oggetto nel JSON deve essere separato da una virgola, tranne l'ultimo. Se il sito non carica, controlla che il JSON sia valido (puoi usare [jsonlint.com](https://jsonlint.com)).

### Disegni singoli vs disegni di progetto

- **Senza `"project"`** → compare nella galleria con il filtro **Altri lavori** (vista predefinita).
- **Con `"project": "id-progetto"`** → compare solo quando quel progetto è selezionato (chip o click su una card progetto).

Esempio di disegno assegnato a un progetto:

```json
{
  "title": "Vicolo al mattino",
  "image": "images/drawings/project-urban-1.svg",
  "year": "2025",
  "description": "Schizzo a matita di un vicolo al mattino.",
  "project": "schizzi-urbani"
}
```

## Progetti

I progetti si gestiscono in `content/projects.json`. Ogni progetto ha un `id` univoco usato anche in `drawings.json`:

```json
{
  "id": "schizzi-urbani",
  "name": "Schizzi urbani",
  "cover": "images/drawings/project-urban-1.svg",
  "year": "2025",
  "description": "Studi di città e architettura."
}
```

**Per aggiungere un nuovo progetto:**

1. Aggiungi una voce in `content/projects.json` con un `id` univoco (es. `"ritratti"`).
2. Aggiungi i disegni collegati in `drawings.json` con `"project": "ritratti"`.
3. Scegli un'immagine di copertina nel campo `cover`.

Cliccando una card nella sezione **Progetti**, la pagina scorre alla galleria e filtra i disegni di quel progetto. I chip sotto il titolo Galleria permettono di cambiare filtro; cliccare di nuovo il chip attivo torna alla vista **Altri lavori**.

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

Le immagini attuali in `images/drawings/` sono placeholder SVG. Sostituiscile con i veri disegni e aggiorna i percorsi in `drawings.json`.
