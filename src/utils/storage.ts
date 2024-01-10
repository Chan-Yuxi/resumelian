export const setItem = (key: string, value: string) => window.localStorage.setItem(key, value);
export const getItem = (key: string) => window.localStorage.getItem(key);
export const deleteItem = (key: string) => window.localStorage.removeItem(key);
export const setSessionItem = (key: string, value: string) => window.sessionStorage.setItem(key, value);
export const getSessionItem = (key: string) => window.sessionStorage.getItem(key);
export const deleteSessionItem = (key: string) => window.sessionStorage.removeItem(key);
