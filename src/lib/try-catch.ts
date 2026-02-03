export interface Success<T> {
  data: T;
  error: null;
}

export interface Failure<E> {
  data: null;
  error: E;
}

export type FuncResult<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps a promise in a try-catch block and returns a result object.
 * Provides consistent error handling across the application.
 * @param promise - The promise to execute
 * @returns An object with either { data, error: null } on success or { data: null, error } on failure
 * @example
 * const { data, error } = await tryCatch(fetchData());
 * if (error || !data) {
 *   return c.json({ message: error?.message || "Error" }, 500);
 * }
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<FuncResult<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  }
  catch (error) {
    return { data: null, error: error as E };
  }
}
