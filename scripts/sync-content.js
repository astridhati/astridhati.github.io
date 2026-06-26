const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");
const DRAWINGS_DIR = path.join(ROOT, "images", "drawings");
const PROJECTS_JSON = path.join(ROOT, "content", "projects.json");
const DRAWINGS_JSON = path.join(ROOT, "content", "drawings.json");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".gif",
]);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function humanizeSlug(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isImageFile(name) {
  if (name.startsWith(".")) return false;
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function toPosixPath(...segments) {
  return segments.join("/");
}

function loadJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Impossibile leggere ${filePath}: ${error.message}`);
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function listRootImages() {
  if (!fs.existsSync(DRAWINGS_DIR)) {
    throw new Error(`Cartella non trovata: ${DRAWINGS_DIR}`);
  }

  return fs
    .readdirSync(DRAWINGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listProjectFolders() {
  return fs
    .readdirSync(DRAWINGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listProjectImages(projectId) {
  const projectDir = path.join(DRAWINGS_DIR, projectId);

  return fs
    .readdirSync(projectDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function imagePath(projectId, filename) {
  if (projectId) {
    return toPosixPath("images", "drawings", projectId, filename);
  }

  return toPosixPath("images", "drawings", filename);
}

async function askField(label, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = (await prompt(`${label}${suffix}: `)).trim();
  return answer || defaultValue || "";
}

async function promptDrawing(imageRelativePath, defaults) {
  console.log(`\nNuova immagine: ${imageRelativePath}`);

  const title = await askField("Titolo", defaults.title);
  if (!title) {
    console.log("  Saltata (titolo vuoto).");
    return null;
  }

  const year = await askField("Anno", defaults.year);
  const description = await askField("Descrizione", defaults.description);

  return { title, year, description };
}

async function promptProject(projectId, coverPath) {
  console.log(`\nNuovo progetto: ${projectId}`);
  console.log(`  Copertina: ${coverPath}`);

  const name = await askField("Nome", humanizeSlug(projectId));
  if (!name) {
    console.log("  Saltato (nome vuoto).");
    return null;
  }

  const year = await askField("Anno", String(new Date().getFullYear()));
  const description = await askField("Descrizione", "");

  return { name, year, description };
}

async function main() {
  const projects = loadJSON(PROJECTS_JSON);
  const drawings = loadJSON(DRAWINGS_JSON);

  if (!Array.isArray(projects) || !Array.isArray(drawings)) {
    throw new Error("projects.json e drawings.json devono essere array JSON.");
  }

  const knownProjectIds = new Set(projects.map((project) => project.id));
  const knownImagePaths = new Set(drawings.map((drawing) => drawing.image));

  const addedProjects = [];
  const addedDrawings = [];

  for (const projectId of listProjectFolders()) {
    const images = listProjectImages(projectId);

    if (!images.length) {
      console.log(`\nAttenzione: la cartella "${projectId}" è vuota, saltata.`);
      continue;
    }

    if (!knownProjectIds.has(projectId)) {
      const cover = imagePath(projectId, images[0]);
      const projectData = await promptProject(projectId, cover);

      if (projectData) {
        projects.push({
          id: projectId,
          name: projectData.name,
          cover,
          year: projectData.year,
          description: projectData.description,
        });
        knownProjectIds.add(projectId);
        addedProjects.push(projectId);
      }
    }

    for (const filename of images) {
      const relativePath = imagePath(projectId, filename);

      if (knownImagePaths.has(relativePath)) {
        continue;
      }

      const drawingData = await promptDrawing(relativePath, {
        title: humanizeSlug(path.parse(filename).name),
        year: String(new Date().getFullYear()),
        description: "",
      });

      if (drawingData) {
        drawings.push({
          title: drawingData.title,
          image: relativePath,
          year: drawingData.year,
          description: drawingData.description,
          project: projectId,
        });
        knownImagePaths.add(relativePath);
        addedDrawings.push(relativePath);
      }
    }
  }

  for (const filename of listRootImages()) {
    const relativePath = imagePath(null, filename);

    if (knownImagePaths.has(relativePath)) {
      continue;
    }

    const drawingData = await promptDrawing(relativePath, {
      title: humanizeSlug(path.parse(filename).name),
      year: String(new Date().getFullYear()),
      description: "",
    });

    if (drawingData) {
      drawings.push({
        title: drawingData.title,
        image: relativePath,
        year: drawingData.year,
        description: drawingData.description,
      });
      knownImagePaths.add(relativePath);
      addedDrawings.push(relativePath);
    }
  }

  if (addedProjects.length || addedDrawings.length) {
    writeJSON(PROJECTS_JSON, projects);
    writeJSON(DRAWINGS_JSON, drawings);
  }

  console.log("\n--- Riepilogo ---");

  if (!addedProjects.length && !addedDrawings.length) {
    console.log("Nessuna novità. JSON già aggiornati.");
  } else {
    if (addedProjects.length) {
      console.log(`Progetti aggiunti (${addedProjects.length}):`);
      addedProjects.forEach((id) => console.log(`  - ${id}`));
    }

    if (addedDrawings.length) {
      console.log(`Disegni aggiunti (${addedDrawings.length}):`);
      addedDrawings.forEach((image) => console.log(`  - ${image}`));
    }

    console.log("\nFile aggiornati:");
    console.log(`  - ${path.relative(ROOT, PROJECTS_JSON)}`);
    console.log(`  - ${path.relative(ROOT, DRAWINGS_JSON)}`);
  }
}

main()
  .catch((error) => {
    console.error(`\nErrore: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });
