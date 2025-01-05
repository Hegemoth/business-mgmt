export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeAllLetters = (text: string): string => {
  return text.toUpperCase();
};
