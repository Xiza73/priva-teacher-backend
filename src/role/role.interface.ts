export const roleNames = {
  SUPERVISOR: "supervisor",
  COLLABORATOR: "collaborator",
  SUPER_ADMIN: "super_admin",
} as const;

export type RoleName = (typeof roleNames)[keyof typeof roleNames];

const permissions = {
  VIEW: "view",
  REPORT: "report",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions];

export const rolePermissions: {
  [key in RoleName]: Permission[];
} = {
  [roleNames.SUPERVISOR]: Object.values(permissions),
  [roleNames.COLLABORATOR]: [permissions.VIEW],
  [roleNames.SUPER_ADMIN]: Object.values(permissions),
};
