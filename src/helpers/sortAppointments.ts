export const sortArray = (array: [], field: string, direction: string) => {
  if (!field) {
    return array;
  }
  return [...array].sort((a, b) => {
    switch (direction) {
      case "asc":
        return a[field] > b[field] ? 1 : -1;
      case "desc":
        return a[field] < b[field] ? 1 : -1;
      default:
        return 0;
    }
  });
};
