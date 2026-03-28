import { useStore } from '../store'
import { presets } from '../utils/presets'
import styles from './PresetSelector.module.css'

export function PresetSelector() {
  const presetId = useStore((s) => s.presetId)
  const setPreset = useStore((s) => s.setPreset)

  return (
    <div className={styles.presets}>
      <label className={styles.label}>Style</label>
      <div className={styles.buttons}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            className={`${styles.button} ${presetId === preset.id ? styles.active : ''}`}
            onClick={() => setPreset(preset)}
          >
            {preset.name}
          </button>
        ))}
        {presetId === 'custom' && (
          <span className={styles.customBadge}>Custom</span>
        )}
      </div>
    </div>
  )
}
