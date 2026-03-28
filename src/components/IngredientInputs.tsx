import { useStore } from '../store'
import type { Ingredients } from '../utils/calculator'
import { getTipForField } from '../utils/tips'
import styles from './IngredientInputs.module.css'

interface IngredientConfig {
  field: keyof Ingredients
  label: string
  min: number
  max: number
  step: number
}

const ingredientFields: IngredientConfig[] = [
  { field: 'water', label: 'Water', min: 40, max: 90, step: 1 },
  { field: 'salt', label: 'Salt', min: 0, max: 10, step: 0.1 },
  { field: 'oil', label: 'Oil', min: 0, max: 15, step: 0.5 },
  { field: 'yeast', label: 'Yeast', min: 0, max: 5, step: 0.1 },
]

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function IngredientInputs() {
  const ingredients = useStore((s) => s.ingredients)
  const setIngredient = useStore((s) => s.setIngredient)

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>Baker's Percentages</h3>
      <div className={styles.fields}>
        {ingredientFields.map((config) => {
          const tip = getTipForField(ingredients, config.field)
          return (
            <div key={config.field} className={styles.field}>
              <div className={styles.row}>
                <label className={styles.label} htmlFor={`ingredient-${config.field}`}>
                  {config.label}
                </label>
                <div className={styles.inputWithUnit}>
                  <input
                    id={`ingredient-${config.field}`}
                    type="number"
                    className={styles.input}
                    value={ingredients[config.field]}
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value)
                      if (!isNaN(v)) setIngredient(config.field, v)
                    }}
                    onBlur={(e) => {
                      const v = parseFloat(e.target.value)
                      setIngredient(
                        config.field,
                        isNaN(v) ? 0 : clamp(v, config.min, config.max),
                      )
                    }}
                  />
                  <span className={styles.unit}>%</span>
                </div>
              </div>
              {tip && <p className={styles.tip}>{tip}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
