import { Locale } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  return date ? format(parseISO(date), "MMM yyyy") : "";
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


