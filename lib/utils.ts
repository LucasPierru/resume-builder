import { Locale } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { enUS, fr } from 'date-fns/locale';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const locales = {
  en: enUS,
  fr: fr,
};

export const formatDate = (date: string, locale: Locale) => {
  return date ? format(parseISO(date), "MMM yyyy", { locale: locales[locale] }) : "";
};

export const languages = {
  en: "english",
  fr: "french",
};

export function getTranslateFromSentence(targetLang: Locale, sourceLang: Locale) {
  const sentences = {
    en: (src: keyof typeof languages) => `Translate from ${languages[src]}`,
    fr: (src: keyof typeof languages) => {
      // Handle French prepositions
      const prepositions: Record<string, string> = {
        en: "de l'anglais",
        fr: "du français",
      };
      return `Traduire ${prepositions[src] || `de ${languages[src]}`}`;
    },
  };
  return sentences[targetLang]?.(sourceLang) || "";
}


