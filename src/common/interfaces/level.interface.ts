export const englishLevel = {
  BASIC: "basic",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export type EnglishLevel = (typeof englishLevel)[keyof typeof englishLevel];
