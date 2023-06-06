export const economicLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type EconomicLevel = (typeof economicLevel)[keyof typeof economicLevel];
