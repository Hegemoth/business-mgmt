export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeFull = (text: string): string => {
  return text.toUpperCase();
};

export const getFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase();
};
