import type { Ingredients } from './calculator'

export interface SavedRecipe {
  id: string
  name: string
  doughType: string
  ballCount: number
  ballWeight: number
  ingredients: Ingredients
  createdAt: string
}

interface StorageSchema {
  version: number
  recipes: SavedRecipe[]
}

const STORAGE_KEY = 'crustly-recipes'

export function loadRecipes(): SavedRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data: StorageSchema = JSON.parse(raw)
    if (data.version !== 1 || !Array.isArray(data.recipes)) {
      console.warn('Crustly: unrecognized storage schema, clearing')
      localStorage.removeItem(STORAGE_KEY)
      return []
    }
    return data.recipes
  } catch (e) {
    console.error('Crustly: corrupted storage, clearing', e)
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function saveRecipes(recipes: SavedRecipe[]): boolean {
  try {
    const data: StorageSchema = { version: 1, recipes }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('Crustly: storage full or unavailable', e)
    return false
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}
