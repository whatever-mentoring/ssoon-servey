export const insertItem = <T>(array: T[], index: number, newItem: T): T[] => {
  return [...array.slice(0, index), newItem, ...array.slice(index)];
};
