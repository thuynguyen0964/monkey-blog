function usePath(path, target) {
  if (typeof path !== 'string' || typeof target !== 'string') return null;

  if (path.includes(target)) {
    const index = path.search(target);
    const newPath = path.slice(0, index - 1);
    return newPath;
  }
}

export { usePath };
