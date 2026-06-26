const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");
const DRAWINGS_DIR = path.join(ROOT, "images", "drawings");
const PROJECTS_JSON = path.join(ROOT, "content", "projects.json");
const DRAWINGS_JSON = path.join(ROOT, "content", "drawings.json");
const OTHER_IMAGES_FOLDER = "[other_images]";

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

function ensureOtherImagesFolder() {
  const dir = path.join(DRAWINGS_DIR, OTHER_IMAGES_FOLDER);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Creata cartella ${OTHER_IMAGES_FOLDER}/`);
  }
}

function warnRootImages() {
  if (!fs.existsSync(DRAWINGS_DIR)) {
    throw new Error(`Cartella non trovata: ${DRAWINGS_DIR}`);
  }

  const rootImages = fs
    .readdirSync(DRAWINGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name));

  if (!rootImages.length) {
    return;
  }

  console.log("\nAttenzione: file immagine nella root di drawings/:");
  rootImages.forEach((entry) => console.log(`  - ${entry.name}`));
  console.log("  Sposta i file in [other_images]/ o in una cartella progetto.");
}

function listProjectFolders() {
  return fs
    .readdirSync(DRAWINGS_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        entry.name !== OTHER_IMAGES_FOLDER
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listOtherImagesSingles() {
  const dir = path.join(DRAWINGS_DIR, OTHER_IMAGES_FOLDER);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listOtherImageGroups() {
  const dir = path.join(DRAWINGS_DIR, OTHER_IMAGES_FOLDER);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listProjectSingles(projectId) {
  const projectDir = path.join(DRAWINGS_DIR, projectId);

  return fs
    .readdirSync(projectDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listProjectGroups(projectId) {
  const projectDir = path.join(DRAWINGS_DIR, projectId);

  return fs
    .readdirSync(projectDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function listGroupImages(...segments) {
  const groupDir = path.join(DRAWINGS_DIR, ...segments);

  return fs
    .readdirSync(groupDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "it"));
}

function imagePath(...segments) {
  return toPosixPath("images", "drawings", ...segments);
}

function resolveAbsolutePath(relativePath) {
  return path.join(ROOT, ...relativePath.split("/"));
}

function fileExists(relativePath) {
  if (!relativePath) return false;
  return fs.existsSync(resolveAbsolutePath(relativePath));
}

function projectFolderExists(projectId) {
  const projectDir = path.join(DRAWINGS_DIR, projectId);
  return fs.existsSync(projectDir) && fs.statSync(projectDir).isDirectory();
}

function groupFolderExists(projectId, groupId) {
  const segments = projectId ? [projectId, groupId] : [OTHER_IMAGES_FOLDER, groupId];
  const groupDir = path.join(DRAWINGS_DIR, ...segments);
  return fs.existsSync(groupDir) && fs.statSync(groupDir).isDirectory();
}

function getGroupKey(entry) {
  if (entry.grouped !== "multiple") return null;

  if (entry.project) {
    return `${entry.project}/${entry.group}`;
  }

  return `${OTHER_IMAGES_FOLDER}/${entry.group}`;
}

function pruneDrawings(drawings) {
  const removedSingles = [];
  const removedGroups = [];
  const updatedGroups = [];

  const pruned = drawings.filter((entry) => {
    if (entry.grouped === "multiple") {
      const projectId = entry.project || null;
      const groupId = entry.group;
      const groupKey = getGroupKey(entry);

      if (!groupId || !groupFolderExists(projectId, groupId)) {
        removedGroups.push(groupKey || entry.title);
        return false;
      }

      const beforeCount = Array.isArray(entry.images) ? entry.images.length : 0;
      entry.images = (entry.images || []).filter((imagePath) => fileExists(imagePath));

      if (!entry.images.length) {
        removedGroups.push(groupKey || entry.title);
        return false;
      }

      if (entry.images.length !== beforeCount) {
        updatedGroups.push(groupKey || entry.title);
      }

      entry.cover = entry.images[0];
      return true;
    }

    if (!entry.image || !fileExists(entry.image)) {
      removedSingles.push(entry.image || entry.title);
      return false;
    }

    return true;
  });

  return { drawings: pruned, removedSingles, removedGroups, updatedGroups };
}

function pruneProjects(projects) {
  const removedProjects = [];

  const pruned = projects.filter((project) => {
    if (!projectFolderExists(project.id)) {
      removedProjects.push(project.id);
      return false;
    }

    return true;
  });

  return { projects: pruned, removedProjects };
}

function buildKnownSets(drawings) {
  const knownSingleImages = new Set();
  const knownGroupKeys = new Set();

  for (const entry of drawings) {
    if (entry.grouped === "multiple") {
      if (entry.project) {
        knownGroupKeys.add(`${entry.project}/${entry.group}`);
      } else {
        knownGroupKeys.add(`${OTHER_IMAGES_FOLDER}/${entry.group}`);
      }
      continue;
    }

    if (entry.image) {
      knownSingleImages.add(entry.image);
    }
  }

  return { knownSingleImages, knownGroupKeys };
}

function findGroupEntry(drawings, { projectId, groupId }) {
  return drawings.find(
    (entry) =>
      entry.grouped === "multiple" &&
      entry.group === groupId &&
      (projectId ? entry.project === projectId : !entry.project)
  );
}

async function askField(label, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = (await prompt(`${label}${suffix}: `)).trim();
  return answer || defaultValue || "";
}

async function promptDrawing(label, defaults) {
  console.log(`\n${label}`);

  const title = await askField("Titolo", defaults.title);
  if (!title) {
    console.log("  Saltato (titolo vuoto).");
    return null;
  }

  const year = await askField("Anno", defaults.year);
  const description = await askField("Descrizione", defaults.description);

  return { title, year, description };
}

async function promptImageOrder(filenames) {
  console.log("\nImmagini nel gruppo:");
  filenames.forEach((name, index) => {
    console.log(`  ${index + 1}. ${name}`);
  });

  const answer = (
    await prompt("Ordine immagini (es. 2,1,3 oppure Invio per ordine mostrato): ")
  ).trim();

  if (!answer) {
    return [...filenames];
  }

  const indices = answer.split(",").map((part) => parseInt(part.trim(), 10) - 1);

  if (
    indices.some(
      (index) => Number.isNaN(index) || index < 0 || index >= filenames.length
    )
  ) {
    console.log("  Ordine non valido, uso ordine predefinito.");
    return [...filenames];
  }

  return indices.map((index) => filenames[index]);
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

function resolveProjectCover(projectId) {
  const singles = listProjectSingles(projectId);
  if (singles.length) {
    return imagePath(projectId, singles[0]);
  }

  const groups = listProjectGroups(projectId);
  if (groups.length) {
    const images = listGroupImages(projectId, groups[0]);
    if (images.length) {
      return imagePath(projectId, groups[0], images[0]);
    }
  }

  return null;
}

async function syncSingle({
  drawings,
  knownSingleImages,
  addedDrawings,
  relativePath,
  projectId,
}) {
  if (knownSingleImages.has(relativePath)) {
    return;
  }

  const drawingData = await promptDrawing(`Nuova immagine: ${relativePath}`, {
    title: humanizeSlug(path.parse(path.basename(relativePath)).name),
    year: String(new Date().getFullYear()),
    description: "",
  });

  if (!drawingData) {
    return;
  }

  const entry = {
    title: drawingData.title,
    image: relativePath,
    year: drawingData.year,
    description: drawingData.description,
    grouped: "single",
  };

  if (projectId) {
    entry.project = projectId;
  }

  drawings.push(entry);
  knownSingleImages.add(relativePath);
  addedDrawings.push(relativePath);
}

async function syncGroup({
  drawings,
  knownGroupKeys,
  addedDrawings,
  projectId,
  groupId,
}) {
  const groupKey = projectId
    ? `${projectId}/${groupId}`
    : `${OTHER_IMAGES_FOLDER}/${groupId}`;
  const pathSegments = projectId
    ? [projectId, groupId]
    : [OTHER_IMAGES_FOLDER, groupId];
  const filenames = listGroupImages(...pathSegments);

  if (!filenames.length) {
    console.log(`\nAttenzione: il gruppo "${groupId}" è vuoto, saltato.`);
    return;
  }

  const existing = findGroupEntry(drawings, { projectId, groupId });

  if (!existing) {
    const orderedFilenames = await promptImageOrder(filenames);
    const orderedPaths = orderedFilenames.map((filename) =>
      imagePath(...pathSegments, filename)
    );
    const drawingData = await promptDrawing(`Nuovo gruppo: ${groupKey}`, {
      title: humanizeSlug(groupId),
      year: String(new Date().getFullYear()),
      description: "",
    });

    if (!drawingData) {
      return;
    }

    const entry = {
      title: drawingData.title,
      group: groupId,
      grouped: "multiple",
      cover: orderedPaths[0],
      images: orderedPaths,
      year: drawingData.year,
      description: drawingData.description,
    };

    if (projectId) {
      entry.project = projectId;
    }

    drawings.push(entry);
    knownGroupKeys.add(groupKey);
    addedDrawings.push(groupKey);
    return;
  }

  const existingPaths = new Set(existing.images);
  const newFilenames = filenames.filter(
    (filename) => !existingPaths.has(imagePath(...pathSegments, filename))
  );

  if (!existing.images.length) {
    const index = drawings.indexOf(existing);
    if (index !== -1) {
      drawings.splice(index, 1);
      knownGroupKeys.delete(groupKey);
    }
    return;
  }

  if (!newFilenames.length) {
    return;
  }

  console.log(`\nNuove immagini nel gruppo "${groupId}":`);
  newFilenames.forEach((filename) => console.log(`  - ${filename}`));

  const reorderAnswer = (
    await prompt("Aggiungere in fondo? (Invio=sì, n=riordinare tutto): ")
  )
    .trim()
    .toLowerCase();

  if (reorderAnswer === "n" || reorderAnswer === "no") {
    const orderedFilenames = await promptImageOrder(filenames);
    existing.images = orderedFilenames.map((filename) =>
      imagePath(...pathSegments, filename)
    );
  } else {
    newFilenames.forEach((filename) => {
      existing.images.push(imagePath(...pathSegments, filename));
    });
  }

  existing.cover = existing.images[0];
  addedDrawings.push(`${groupKey} (+${newFilenames.length})`);
}

async function main() {
  ensureOtherImagesFolder();
  warnRootImages();

  const projects = loadJSON(PROJECTS_JSON);
  const drawings = loadJSON(DRAWINGS_JSON);

  if (!Array.isArray(projects) || !Array.isArray(drawings)) {
    throw new Error("projects.json e drawings.json devono essere array JSON.");
  }

  const projectPrune = pruneProjects(projects);
  const drawingPrune = pruneDrawings(drawings);

  let projectsMut = projectPrune.projects;
  let drawingsMut = drawingPrune.drawings;

  const removedProjects = [...projectPrune.removedProjects];
  const removedSingles = [...drawingPrune.removedSingles];
  const removedGroups = [...drawingPrune.removedGroups];
  const updatedGroups = [...drawingPrune.updatedGroups];

  const knownProjectIds = new Set(projectsMut.map((project) => project.id));
  const { knownSingleImages, knownGroupKeys } = buildKnownSets(drawingsMut);

  const addedProjects = [];
  const addedDrawings = [];

  for (const filename of listOtherImagesSingles()) {
    await syncSingle({
      drawings: drawingsMut,
      knownSingleImages,
      addedDrawings,
      relativePath: imagePath(OTHER_IMAGES_FOLDER, filename),
    });
  }

  for (const groupId of listOtherImageGroups()) {
    await syncGroup({
      drawings: drawingsMut,
      knownGroupKeys,
      addedDrawings,
      groupId,
    });
  }

  for (const projectId of listProjectFolders()) {
    const singles = listProjectSingles(projectId);
    const groups = listProjectGroups(projectId);

    if (!singles.length && !groups.length) {
      console.log(`\nAttenzione: la cartella "${projectId}" è vuota, saltata.`);
      continue;
    }

    if (!knownProjectIds.has(projectId)) {
      const cover = resolveProjectCover(projectId);

      if (!cover) {
        console.log(`\nAttenzione: impossibile determinare copertina per "${projectId}".`);
        continue;
      }

      const projectData = await promptProject(projectId, cover);

      if (projectData) {
        projectsMut.push({
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

    for (const filename of singles) {
      await syncSingle({
        drawings: drawingsMut,
        knownSingleImages,
        addedDrawings,
        relativePath: imagePath(projectId, filename),
        projectId,
      });
    }

    for (const groupId of groups) {
      await syncGroup({
        drawings: drawingsMut,
        knownGroupKeys,
        addedDrawings,
        projectId,
        groupId,
      });
    }
  }

  const hasChanges =
    addedProjects.length ||
    addedDrawings.length ||
    removedProjects.length ||
    removedSingles.length ||
    removedGroups.length ||
    updatedGroups.length;

  if (hasChanges) {
    writeJSON(PROJECTS_JSON, projectsMut);
    writeJSON(DRAWINGS_JSON, drawingsMut);
  }

  console.log("\n--- Riepilogo ---");

  if (!hasChanges) {
    console.log("Nessuna novità. JSON già aggiornati.");
  } else {
    if (removedProjects.length) {
      console.log(`Progetti rimossi (${removedProjects.length}):`);
      removedProjects.forEach((id) => console.log(`  - ${id}`));
    }

    if (removedSingles.length) {
      console.log(`Singoli rimossi (${removedSingles.length}):`);
      removedSingles.forEach((item) => console.log(`  - ${item}`));
    }

    if (removedGroups.length) {
      console.log(`Gruppi rimossi (${removedGroups.length}):`);
      removedGroups.forEach((item) => console.log(`  - ${item}`));
    }

    if (updatedGroups.length) {
      console.log(`Gruppi aggiornati (${updatedGroups.length}):`);
      updatedGroups.forEach((item) => console.log(`  - ${item}`));
    }

    if (addedProjects.length) {
      console.log(`Progetti aggiunti (${addedProjects.length}):`);
      addedProjects.forEach((id) => console.log(`  - ${id}`));
    }

    if (addedDrawings.length) {
      console.log(`Disegni aggiunti/aggiornati (${addedDrawings.length}):`);
      addedDrawings.forEach((item) => console.log(`  - ${item}`));
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
