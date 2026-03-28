import { useStore } from '../store'
import styles from './UnitToggle.module.css'

export function UnitToggle() {
  const unit = useStore((s) => s.unit)
  const setUnit = useStore((s) => s.setUnit)

  return (
    <div className={styles.toggle} role="radiogroup" aria-label="Unit selection">
      <button
        className={`${styles.option} ${unit === 'g' ? styles.active : ''}`}
        onClick={() => setUnit('g')}
        role="radio"
        aria-checked={unit === 'g'}
      >
        g
      </button>
      <button
        className={`${styles.option} ${unit === 'oz' ? styles.active : ''}`}
        onClick={() => setUnit('oz')}
        role="radio"
        aria-checked={unit === 'oz'}
      >
        oz
      </button>
    </div>
  )
}
