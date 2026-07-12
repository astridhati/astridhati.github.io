let initialized = false;

function isProtectedTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(".protected-media"));
}

function isProtectedImage(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(".protected-media__image"));
}

function selectionIncludesProtectedImage(): boolean {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const element =
    container instanceof Element ? container : container.parentElement;

  return Boolean(element?.closest(".protected-media"));
}

function onContextMenu(event: MouseEvent): void {
  if (isProtectedTarget(event.target)) {
    event.preventDefault();
  }
}

function onDragStart(event: DragEvent): void {
  if (isProtectedImage(event.target)) {
    event.preventDefault();
  }
}

function onCopyOrCut(event: ClipboardEvent): void {
  if (selectionIncludesProtectedImage()) {
    event.preventDefault();
  }
}

function onSelectStart(event: Event): void {
  if (isProtectedImage(event.target)) {
    event.preventDefault();
  }
}

export function initImageProtection(): void {
  if (initialized) return;
  initialized = true;

  document.addEventListener("contextmenu", onContextMenu);
  document.addEventListener("dragstart", onDragStart);
  document.addEventListener("copy", onCopyOrCut);
  document.addEventListener("cut", onCopyOrCut);
  document.addEventListener("selectstart", onSelectStart);
}

initImageProtection();
