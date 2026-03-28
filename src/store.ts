import { create } from 'zustand'
import type { Ingredients } from './utils/calculator'
import { calculateDough } from './utils/calculator'
import type { DoughType } from './utils/presets'
import { presets, findMatchingPreset } from './utils/presets'
import type { SavedRecipe } from './utils/storage'
import { loadRecipes, saveRecipes, generateId } from './utils/storage'
import type { Unit } from './utils/units'
import { decodeRecipeFromHash } from './utils/url'

interface StoreState {
  // Calculator inputs
  presetId: string
  ballCount: number
  ballWeight: number
  ingredients: Ingredients

  // Preferences
  unit: Unit

  // Saved recipes
  recipes: SavedRecipe[]

  // Actions
  setPreset: (preset: DoughType) => void
  setBallCount: (count: number) => void
  setBallWeight: (weight: number) => void
  setIngredient: (field: keyof Ingredients, value: number) => void
  setUnit: (unit: Unit) => void
  saveCurrentRecipe: (name: string) => boolean
  deleteRecipe: (id: string) => void
  renameRecipe: (id: string, name: string) => void
  loadFromUrl: () => boolean
}

function getInitialState() {
  const defaultPreset = presets[0]
  return {
    presetId: defaultPreset.id,
    ballCount: 4,
    ballWeight: defaultPreset.defaultBallWeight,
    ingredients: { ...defaultPreset.ingredients },
  }
}

export const useStore = create<StoreState>((set, get) => ({
  ...getInitialState(),
  unit: 'g' as Unit,
  recipes: loadRecipes(),

  setPreset: (preset) =>
    set({
      presetId: preset.id,
      ballWeight: preset.defaultBallWeight,
      ingredients: { ...preset.ingredients },
    }),

  setBallCount: (count) => set({ ballCount: count }),

  setBallWeight: (weight) => set({ ballWeight: weight }),

  setIngredient: (field, value) =>
    set((state) => {
      const newIngredients = { ...state.ingredients, [field]: value }
      const match = findMatchingPreset(newIngredients)
      return {
        ingredients: newIngredients,
        presetId: match ? match.id : 'custom',
      }
    }),

  setUnit: (unit) => set({ unit }),

  saveCurrentRecipe: (name) => {
    const state = get()
    const recipe: SavedRecipe = {
      id: generateId(),
      name,
      doughType: state.presetId,
      ballCount: state.ballCount,
      ballWeight: state.ballWeight,
      ingredients: { ...state.ingredients },
      createdAt: new Date().toISOString(),
    }
    const updated = [...state.recipes, recipe]
    const success = saveRecipes(updated)
    if (success) {
      set({ recipes: updated })
    }
    return success
  },

  deleteRecipe: (id) => {
    const state = get()
    const updated = state.recipes.filter((r) => r.id !== id)
    saveRecipes(updated)
    set({ recipes: updated })
  },

  renameRecipe: (id, name) => {
    const state = get()
    const updated = state.recipes.map((r) => (r.id === id ? { ...r, name } : r))
    saveRecipes(updated)
    set({ recipes: updated })
  },

  loadFromUrl: () => {
    const recipe = decodeRecipeFromHash(window.location.hash)
    if (!recipe) return false
    set({
      presetId: recipe.style,
      ballCount: recipe.ballCount,
      ballWeight: recipe.ballWeight,
      ingredients: recipe.ingredients,
    })
    return true
  },
}))

// Derived selector for calculation results
export function useCalculation() {
  const ballCount = useStore((s) => s.ballCount)
  const ballWeight = useStore((s) => s.ballWeight)
  const ingredients = useStore((s) => s.ingredients)
  return calculateDough(ballCount, ballWeight, ingredients)
}
