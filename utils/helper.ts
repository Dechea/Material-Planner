export const convertCamelCaseToTitleCase = (str: string): string => {
  const result = str.replace(/([A-Z])/g, ' $1');

  return result.charAt(0).toUpperCase() + result.slice(1);
};
