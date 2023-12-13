export const setItem = (key: string, value: string) => window.localStorage.setItem(key, value);
export const getItem = (key: string) => window.localStorage.getItem(key);

export const setSessionItem = (key: string, value: string) => window.sessionStorage.setItem(key, value);
export const getSessionItem = (key: string) => window.sessionStorage.getItem(key);