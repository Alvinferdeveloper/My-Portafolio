import { ui, defaultLang, type Lang } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

export function pathForLang(lang: Lang): string {
  return lang === defaultLang ? "/" : `/${lang}/`;
}
