export const isValidTimestamp = (timestamp: Date): boolean => {
  const date = new Date(timestamp);
  return !isNaN(date.getTime());
};

export const isValidHexString = (id: string): boolean => {
  const idRegex = /^[0-9a-f]{64}$/; 
  return typeof id === 'string' && idRegex.test(id);
};
