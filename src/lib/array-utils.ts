/**
 * Array utility functions
 */

/**
 * Check if array is empty
 */
export function isEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}

/**
 * Check if array is not empty
 */
export function isNotEmpty<T>(arr: T[]): boolean {
  return arr.length > 0;
}

/**
 * Get unique values from array
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Group array items by key
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const groupKey = String(item[key]);
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), item],
    };
  }, {} as Record<string, T[]>);
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
