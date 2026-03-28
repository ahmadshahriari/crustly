import { useState } from 'react'
import { useStore } from '../store'
import styles from './SavedRecipes.module.css'

export function SavedRecipes() {
  const recipes = useStore((s) => s.recipes)
  const saveCurrentRecipe = useStore((s) => s.saveCurrentRecipe)
  const deleteRecipe = useStore((s) => s.deleteRecipe)
  const renameRecipe = useStore((s) => s.renameRecipe)

  const [recipeName, setRecipeName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  function handleSave() {
    const name = recipeName.trim()
    if (!name) return
    const success = saveCurrentRecipe(name)
    if (success) {
      setRecipeName('')
      showToast('Recipe saved!')
    } else {
      showToast('Storage full!')
    }
  }

  function handleDelete(id: string) {
    deleteRecipe(id)
  }

  function startRename(id: string, currentName: string) {
    setEditingId(id)
    setEditName(currentName)
  }

  function commitRename() {
    if (editingId && editName.trim()) {
      renameRecipe(editingId, editName.trim())
    }
    setEditingId(null)
    setEditName('')
  }

  // Load a saved recipe into the calculator
  function handleLoad(recipe: (typeof recipes)[0]) {
    const store = useStore.getState()
    store.setBallCount(recipe.ballCount)
    store.setBallWeight(recipe.ballWeight)
    for (const [key, value] of Object.entries(recipe.ingredients)) {
      store.setIngredient(key as keyof typeof recipe.ingredients, value)
    }
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>Saved Recipes</h3>

      <div className={styles.saveRow}>
        <input
          type="text"
          className={styles.nameInput}
          placeholder="Recipe name..."
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          maxLength={50}
        />
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!recipeName.trim()}
        >
          Save
        </button>
      </div>

      {toast && <p className={styles.toast}>{toast}</p>}

      {recipes.length === 0 ? (
        <p className={styles.empty}>No saved recipes yet. Make a recipe and hit Save!</p>
      ) : (
        <ul className={styles.list}>
          {recipes.map((recipe) => (
            <li key={recipe.id} className={styles.item}>
              {editingId === recipe.id ? (
                <input
                  type="text"
                  className={styles.renameInput}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => e.key === 'Enter' && commitRename()}
                  autoFocus
                  maxLength={50}
                />
              ) : (
                <button
                  className={styles.recipeName}
                  onClick={() => handleLoad(recipe)}
                  title="Load this recipe"
                >
                  {recipe.name}
                </button>
              )}
              <span className={styles.recipeType}>{recipe.doughType}</span>
              <div className={styles.actions}>
                <button
                  className={styles.actionBtn}
                  onClick={() => startRename(recipe.id, recipe.name)}
                  title="Rename"
                  aria-label="Rename recipe"
                >
                  &#x270E;
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(recipe.id)}
                  title="Delete"
                  aria-label="Delete recipe"
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
