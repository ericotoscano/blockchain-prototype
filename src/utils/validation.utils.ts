export const isValidTimestamp = (timestamp: Date): boolean => {
  const date = new Date(timestamp);
  return !isNaN(date.getTime());
};

export const isValidHex64String = (id: string): boolean => {
  const idRegex = /^[0-9a-f]{64}$/;
  return typeof id === 'string' && idRegex.test(id);
};

export const isValidHex40String = (id: string): boolean => {
  const idRegex = /^[0-9a-f]{40}$/;
  return typeof id === 'string' && idRegex.test(id);
};