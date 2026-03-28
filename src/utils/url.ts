import type { Ingredients } from './calculator'

interface RecipeFromUrl {
  style: string
  ballCount: number
  ballWeight: number
  ingredients: Ingredients
}

/**
 * Encode recipe as URL hash: #/r/{style}/{balls}/{weight}/{water}/{salt}/{oil}/{yeast}
 */
export function encodeRecipeToHash(
  style: string,
  ballCount: number,
  ballWeight: number,
  ingredients: Ingredients,
): string {
  return `#/r/${style}/${ballCount}/${ballWeight}/${ingredients.water}/${ingredients.salt}/${ingredients.oil}/${ingredients.yeast}`
}

/**
 * Decode recipe from URL hash. Returns null if malformed.
 */
export function decodeRecipeFromHash(hash: string): RecipeFromUrl | null {
  if (!hash.startsWith('#/r/')) return null

  const parts = hash.slice(4).split('/')
  if (parts.length !== 7) return null

  const [style, ballsStr, weightStr, waterStr, saltStr, oilStr, yeastStr] = parts

  const ballCount = parseInt(ballsStr, 10)
  const ballWeight = parseFloat(weightStr)
  const water = parseFloat(waterStr)
  const salt = parseFloat(saltStr)
  const oil = parseFloat(oilStr)
  const yeast = parseFloat(yeastStr)

  if ([ballCount, ballWeight, water, salt, oil, yeast].some((v) => !isFinite(v))) {
    return null
  }

  return {
    style: style || 'custom',
    ballCount: clamp(ballCount, 1, 50),
    ballWeight: clamp(ballWeight, 100, 500),
    ingredients: {
      water: clamp(water, 40, 90),
      salt: clamp(salt, 0, 10),
      oil: clamp(oil, 0, 15),
      yeast: clamp(yeast, 0, 5),
    },
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
