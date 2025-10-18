export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // Durchschnittliche Lesegeschwindigkeit
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}