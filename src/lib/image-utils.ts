/**
 * Image utility functions for preloading and handling
 */

/**
 * Preload a single image
 * @param url - Image URL to preload
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

/**
 * Preload multiple images
 * @param urls - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export async function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map((url) => preloadImage(url));
  await Promise.all(promises);
}

/**
 * Get image dimensions
 * @param url - Image URL
 * @returns Promise with width and height
 */
export function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}
