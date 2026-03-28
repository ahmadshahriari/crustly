import { PresetSelector } from './PresetSelector'
import { DoughInputs } from './DoughInputs'
import { IngredientInputs } from './IngredientInputs'
import { ResultsDisplay } from './ResultsDisplay'
import { SavedRecipes } from './SavedRecipes'
import { ShareButton } from './ShareButton'
import { UnitToggle } from './UnitToggle'
import styles from './Calculator.module.css'

export function Calculator() {
  return (
    <div className={styles.calculator}>
      <header className={styles.header}>
        <h1 className={styles.title}>Crustly</h1>
        <p className={styles.subtitle}>Pizza Dough Calculator</p>
        <div className={styles.unitToggle}>
          <UnitToggle />
        </div>
      </header>

      <main className={styles.main}>
        <PresetSelector />
        <DoughInputs />
        <IngredientInputs />
        <ResultsDisplay />

        <div className={styles.actions}>
          <ShareButton />
        </div>

        <SavedRecipes />
      </main>
    </div>
  )
}
