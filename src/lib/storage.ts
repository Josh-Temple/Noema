export const STORAGE_KEYS = {
  saved: "noema:saved-items",
  recent: "noema:recent-items",
} as const;

export type ItemKind = "thinker" | "comparison" | "theme";

export type StoredItem = {
  kind: ItemKind;
  slug: string;
};

const RECENT_LIMIT = 10;
const EMPTY_ITEMS: StoredItem[] = [];

const normalizeStoredItem = (value: unknown): StoredItem | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<StoredItem>;
  if (
    (candidate.kind === "thinker" || candidate.kind === "comparison" || candidate.kind === "theme") &&
    typeof candidate.slug === "string" &&
    candidate.slug.trim()
  ) {
    return { kind: candidate.kind, slug: candidate.slug.trim() };
  }
  return null;
};

const dedupeStoredItems = (items: StoredItem[]) => {
  const seen = new Set<string>();
  const deduped: StoredItem[] = [];

  for (const item of items) {
    const key = `${item.kind}:${item.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped;
};

export const loadStoredItems = (key: string): StoredItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return dedupeStoredItems(parsed.map(normalizeStoredItem).filter((item): item is StoredItem => Boolean(item)));
  } catch {
    return [];
  }
};

export const saveStoredItems = (key: string, value: StoredItem[]) => {
  if (typeof window === "undefined") return;
  const normalized = dedupeStoredItems(value.map(normalizeStoredItem).filter((item): item is StoredItem => Boolean(item)));
  window.localStorage.setItem(key, JSON.stringify(normalized));
};

export const toggleSavedItem = (items: StoredItem[], nextItem: StoredItem) => {
  const exists = items.some((item) => item.slug === nextItem.slug && item.kind === nextItem.kind);
  if (exists) {
    return items.filter((item) => !(item.slug === nextItem.slug && item.kind === nextItem.kind));
  }
  return dedupeStoredItems([nextItem, ...items]);
};

export const addRecentItem = (items: StoredItem[], nextItem: StoredItem) =>
  dedupeStoredItems([nextItem, ...items.filter((item) => !(item.slug === nextItem.slug && item.kind === nextItem.kind))]).slice(
    0,
    RECENT_LIMIT,
  );

type StoreKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
const snapshots = new Map<StoreKey, StoredItem[]>();
const listeners = new Map<StoreKey, Set<() => void>>();
let listensForStorage = false;

const emit = (key: StoreKey) => listeners.get(key)?.forEach((listener) => listener());

const ensureStorageListener = () => {
  if (typeof window === "undefined" || listensForStorage) return;
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEYS.saved && event.key !== STORAGE_KEYS.recent) return;
    snapshots.set(event.key, loadStoredItems(event.key));
    emit(event.key);
  });
  listensForStorage = true;
};

export const getStoredItemsSnapshot = (key: StoreKey) => {
  if (typeof window === "undefined") return EMPTY_ITEMS;
  ensureStorageListener();
  if (!snapshots.has(key)) snapshots.set(key, loadStoredItems(key));
  return snapshots.get(key) ?? EMPTY_ITEMS;
};

export const getStoredItemsServerSnapshot = () => EMPTY_ITEMS;

export const subscribeToStoredItems = (key: StoreKey, listener: () => void) => {
  ensureStorageListener();
  const keyListeners = listeners.get(key) ?? new Set<() => void>();
  keyListeners.add(listener);
  listeners.set(key, keyListeners);
  return () => keyListeners.delete(listener);
};

export const updateStoredItems = (key: StoreKey, update: (items: StoredItem[]) => StoredItem[]) => {
  const next = update(getStoredItemsSnapshot(key));
  saveStoredItems(key, next);
  snapshots.set(key, loadStoredItems(key));
  emit(key);
};

/** Test-only cache reset; browser persistence is intentionally left untouched. */
export const resetStoredItemsStore = () => {
  snapshots.clear();
};
