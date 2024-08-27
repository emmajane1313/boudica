import "server-only";

const dictionaries = {
  en: () => import("./../dictionaries/en.json").then((module) => module.default),
  es: () => import("./../dictionaries/es.json").then((module) => module.default),
  fa: () => import("./../dictionaries/fa.json").then((module) => module.default),
  uk: () => import("./../dictionaries/uk.json").then((module) => module.default),
  ar: () => import("./../dictionaries/ar.json").then((module) => module.default),
  he: () => import("./../dictionaries/he.json").then((module) => module.default),
  pt: () => import("./../dictionaries/pt.json").then((module) => module.default),
  yi: () => import("./../dictionaries/yi.json").then((module) => module.default),
  fr: () => import("./../dictionaries/fr.json").then((module) => module.default),
  ja: () => import("./../dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
