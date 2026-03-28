import { useState } from 'react'
import { useStore } from '../store'
import { encodeRecipeToHash } from '../utils/url'
import styles from './ShareButton.module.css'

export function ShareButton() {
  const presetId = useStore((s) => s.presetId)
  const ballCount = useStore((s) => s.ballCount)
  const ballWeight = useStore((s) => s.ballWeight)
  const ingredients = useStore((s) => s.ingredients)
  const [copied, setCopied] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState('')

  async function handleShare() {
    const hash = encodeRecipeToHash(presetId, ballCount, ballWeight, ingredients)
    const url = `${window.location.origin}${window.location.pathname}${hash}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setFallbackUrl(url)
      setShowFallback(true)
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleShare}>
        {copied ? 'Copied!' : 'Share Link'}
      </button>
      {showFallback && (
        <div className={styles.fallback}>
          <input
            type="text"
            className={styles.fallbackInput}
            value={fallbackUrl}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <button
            className={styles.closeBtn}
            onClick={() => setShowFallback(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  )
}
