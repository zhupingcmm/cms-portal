export const cleanObject = (obj: { [key: string]: unknown }) => {
  if (!obj) return {};
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const resetRoute = () => (window.location.href = window.location.origin);
