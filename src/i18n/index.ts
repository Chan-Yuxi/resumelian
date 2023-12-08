import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "./resources/zh.json";
import en from "./resources/en.json";

const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
