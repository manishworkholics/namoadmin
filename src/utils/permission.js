export const hasPermission = (user, code) => {
  if (!user || !user.permission) return false;
  return user.permission.includes(code);
};

// Multiple permission check
export const hasAnyPermission = (user, codes = []) => {
  if (!user || !user.permission) return false;
  return codes.some((code) => user.permission.includes(code));
};

// All permissions required
export const hasAllPermissions = (user, codes = []) => {
  if (!user || !user.permission) return false;
  return codes.every((code) => user.permission.includes(code));
};