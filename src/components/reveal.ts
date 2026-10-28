/** Class for an element that appears at build step `at`. */
export function rv(step: number, at: number, hidden: 'off' | 'dim' | 'gone' = 'off'): string {
  return step >= at ? 'rv' : `rv ${hidden}`
}
