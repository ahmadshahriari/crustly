export interface Ingredients {
  water: number
  salt: number
  oil: number
  yeast: number
}

export interface DoughResult {
  flour: number
  water: number
  salt: number
  oil: number
  yeast: number
  total: number
}

/**
 * Calculate ingredient weights using baker's percentages.
 * Flour is always 100%. Each ingredient is a percentage of flour weight.
 *
 * totalDoughWeight = ballCount * ballWeight
 * flourWeight = totalDoughWeight / (1 + water% + salt% + oil% + yeast%)
 * ingredientWeight = flourWeight * ingredient%
 */
export function calculateDough(
  ballCount: number,
  ballWeight: number,
  ingredients: Ingredients,
): DoughResult {
  const totalDoughWeight = ballCount * ballWeight

  const divisor =
    1 +
    ingredients.water / 100 +
    ingredients.salt / 100 +
    ingredients.oil / 100 +
    ingredients.yeast / 100

  if (divisor === 0 || !isFinite(divisor)) {
    return { flour: 0, water: 0, salt: 0, oil: 0, yeast: 0, total: 0 }
  }

  const flour = totalDoughWeight / divisor
  const water = flour * (ingredients.water / 100)
  const salt = flour * (ingredients.salt / 100)
  const oil = flour * (ingredients.oil / 100)
  const yeast = flour * (ingredients.yeast / 100)

  const result: DoughResult = {
    flour: Math.round(flour),
    water: Math.round(water),
    salt: Math.round(salt),
    oil: Math.round(oil),
    yeast: Math.round(yeast),
    total: Math.round(totalDoughWeight),
  }

  // Guard against NaN
  for (const key of Object.keys(result) as (keyof DoughResult)[]) {
    if (!isFinite(result[key])) {
      result[key] = 0
    }
  }

  return result
}
