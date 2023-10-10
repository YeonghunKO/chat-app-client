let storage = typeof window !== "undefined" ? window.localStorage : null;

export const getItem = (key: string) => {
  if (storage) {
    const cachedItem = storage?.getItem(key);
    console.log("cachedItem", cachedItem);
    if (cachedItem !== "undefined" && cachedItem) {
      return JSON.parse(cachedItem);
    }

    return null;
  }
};

export const setItem = (key: string, value: any) => {
  if (storage) {
    storage.setItem(key, JSON.stringify(value));
  }
};
