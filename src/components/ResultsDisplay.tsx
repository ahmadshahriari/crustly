import { useCalculation, useStore } from '../store'
import { formatWeight } from '../utils/units'
import styles from './ResultsDisplay.module.css'

export function ResultsDisplay() {
  const result = useCalculation()
  const unit = useStore((s) => s.unit)
  const ballCount = useStore((s) => s.ballCount)
  const ballWeight = useStore((s) => s.ballWeight)

  const rows = [
    { label: 'Flour', value: result.flour },
    { label: 'Water', value: result.water },
    { label: 'Salt', value: result.salt },
    { label: 'Oil', value: result.oil },
    { label: 'Yeast', value: result.yeast },
  ]

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>Your Recipe</h3>
      <div className={styles.results}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{formatWeight(row.value, unit)}</span>
          </div>
        ))}
        <div className={styles.divider} />
        <div className={`${styles.row} ${styles.total}`}>
          <span className={styles.label}>Total</span>
          <span className={styles.value}>
            {formatWeight(result.total, unit)}
            <span className={styles.detail}>
              {' '}({ballCount} x {formatWeight(ballWeight, unit)} balls)
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
