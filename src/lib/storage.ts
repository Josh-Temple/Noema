export const STORAGE_KEYS = {
  saved: "noema:saved-items",
  recent: "noema:recent-items",
};

export const loadStringArray = (key: string): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
};

export const saveStringArray = (key: string, value: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};
