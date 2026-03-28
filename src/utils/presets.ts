import type { Ingredients } from './calculator'

export interface DoughType {
  id: string
  name: string
  ingredients: Ingredients
  defaultBallWeight: number
}

export const presets: DoughType[] = [
  {
    id: 'neapolitan',
    name: 'Neapolitan',
    ingredients: { water: 62, salt: 2.5, oil: 1, yeast: 0.2 },
    defaultBallWeight: 250,
  },
  {
    id: 'newyork',
    name: 'New York',
    ingredients: { water: 58, salt: 2.5, oil: 3, yeast: 0.5 },
    defaultBallWeight: 280,
  },
  {
    id: 'detroit',
    name: 'Detroit',
    ingredients: { water: 70, salt: 2.5, oil: 4, yeast: 0.7 },
    defaultBallWeight: 350,
  },
  {
    id: 'sicilian',
    name: 'Sicilian',
    ingredients: { water: 65, salt: 2.5, oil: 5, yeast: 0.5 },
    defaultBallWeight: 300,
  },
]

export function findMatchingPreset(ingredients: Ingredients): DoughType | undefined {
  return presets.find(
    (p) =>
      p.ingredients.water === ingredients.water &&
      p.ingredients.salt === ingredients.salt &&
      p.ingredients.oil === ingredients.oil &&
      p.ingredients.yeast === ingredients.yeast,
  )
}

export function getPresetById(id: string): DoughType | undefined {
  return presets.find((p) => p.id === id)
}
