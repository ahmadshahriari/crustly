import { useEffect } from 'react'
import { Calculator } from './components/Calculator'
import { useStore } from './store'

export default function App() {
  const loadFromUrl = useStore((s) => s.loadFromUrl)

  useEffect(() => {
    loadFromUrl()
  }, [loadFromUrl])

  return <Calculator />
}
