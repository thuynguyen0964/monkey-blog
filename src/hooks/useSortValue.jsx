const useShortValue = (string, index) => {
  if (typeof string !== 'string' || typeof index !== 'number') return;
  const newString = string.slice(0, index) + '...';
  return newString;
};

export { useShortValue };
