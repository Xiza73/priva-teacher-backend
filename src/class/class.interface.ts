export const classMode = {
  VIRTUAL: "virtual",
  PRESENTIAL: "presential",
} as const;

export type ClassMode = (typeof classMode)[keyof typeof classMode];
