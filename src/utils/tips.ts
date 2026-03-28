import type { Ingredients } from './calculator'

export interface Tip {
  field: keyof Ingredients
  message: string
}

interface TipRule {
  field: keyof Ingredients
  test: (value: number) => boolean
  message: string
}

const tipRules: TipRule[] = [
  {
    field: 'water',
    test: (v) => v >= 55 && v <= 65,
    message: '60-65% hydration is great for beginners. Easy to handle, solid oven spring.',
  },
  {
    field: 'water',
    test: (v) => v > 75,
    message: 'High hydration! Expect sticky dough. Wet hands and bench rest help.',
  },
  {
    field: 'yeast',
    test: (v) => v > 0 && v < 0.3,
    message: 'Low yeast = longer rise = more flavor. Plan for 24-48h cold ferment.',
  },
  {
    field: 'yeast',
    test: (v) => v > 1.5,
    message: 'Fast rise with this much yeast. Good for same-day pizza, less complex flavor.',
  },
  {
    field: 'salt',
    test: (v) => v > 4,
    message: "That's quite salty. Most pizza dough is 2-3%. Taste before committing.",
  },
  {
    field: 'oil',
    test: (v) => v > 8,
    message: 'Rich, tender crumb. Great for pan styles, unusual for Neapolitan.',
  },
]

export function getTips(ingredients: Ingredients): Tip[] {
  const tips: Tip[] = []
  for (const rule of tipRules) {
    if (rule.test(ingredients[rule.field])) {
      tips.push({ field: rule.field, message: rule.message })
    }
  }
  return tips
}

export function getTipForField(ingredients: Ingredients, field: keyof Ingredients): string | null {
  const tip = tipRules.find((r) => r.field === field && r.test(ingredients[field]))
  return tip ? tip.message : null
}
