export type Unit = 'g' | 'oz'

const GRAMS_PER_OZ = 28.3495

export function convertToOz(grams: number): number {
  return Math.round((grams / GRAMS_PER_OZ) * 10) / 10
}

export function formatWeight(grams: number, unit: Unit): string {
  if (unit === 'oz') {
    return `${convertToOz(grams)} oz`
  }
  return `${grams}g`
}
