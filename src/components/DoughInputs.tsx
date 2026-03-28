import { useStore } from '../store'
import styles from './DoughInputs.module.css'

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function DoughInputs() {
  const ballCount = useStore((s) => s.ballCount)
  const ballWeight = useStore((s) => s.ballWeight)
  const unit = useStore((s) => s.unit)
  const setBallCount = useStore((s) => s.setBallCount)
  const setBallWeight = useStore((s) => s.setBallWeight)

  const weightLabel = unit === 'oz' ? 'oz' : 'g'
  const displayWeight = unit === 'oz'
    ? Math.round((ballWeight / 28.3495) * 10) / 10
    : ballWeight

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>How Much Dough?</h3>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ballCount">
            Dough balls
          </label>
          <input
            id="ballCount"
            type="number"
            className={styles.input}
            value={ballCount}
            min={1}
            max={50}
            step={1}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (!isNaN(v)) setBallCount(v)
            }}
            onBlur={(e) => {
              const v = parseInt(e.target.value, 10)
              setBallCount(isNaN(v) ? 4 : clamp(v, 1, 50))
            }}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ballWeight">
            Ball weight
          </label>
          <div className={styles.inputWithUnit}>
            <input
              id="ballWeight"
              type="number"
              className={styles.input}
              value={displayWeight}
              min={unit === 'oz' ? 3.5 : 100}
              max={unit === 'oz' ? 17.6 : 500}
              step={unit === 'oz' ? 0.1 : 5}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                if (!isNaN(v)) {
                  const grams = unit === 'oz' ? Math.round(v * 28.3495) : v
                  setBallWeight(grams)
                }
              }}
              onBlur={(e) => {
                const v = parseFloat(e.target.value)
                if (isNaN(v)) {
                  setBallWeight(250)
                } else {
                  const grams = unit === 'oz' ? Math.round(v * 28.3495) : v
                  setBallWeight(clamp(grams, 100, 500))
                }
              }}
            />
            <span className={styles.unit}>{weightLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
