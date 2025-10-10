export const parseApiNames = (value: string): string[] => {
  if (!value) {
    return [];
  }
  return value.split(',').map(name => name.trim()).filter(Boolean);
};

export const stringifyApiNames = (apiNames: string[]): string => {
  return apiNames.join(',');
};
