import { useState, useRef, useEffect } from 'react'
import { searchCity } from '../services/weatherApi'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const cities = await searchCity(query)
        setResults(cities)
      } catch { setResults([]) }
      finally { setLoading(false) }
    }, 400)
  }, [query])

  const handleSelect = (city) => {
    setQuery('')
    setResults([])
    onSelect(city)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="glass rounded-2xl flex items-center px-5 py-4 gap-3">
        <span className="text-xl">🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar ciudad..."
          className="flex-1 bg-transparent outline-none font-body text-white/90 placeholder-white/30 text-base"
        />
        {loading && (
          <div className="w-4 h-4 border-2 border-emerald-400/40 border-t-emerald-400 rounded-full animate-spin" />
        )}
      </div>

      {results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full glass rounded-2xl overflow-hidden z-[9999]">
          {results.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="px-5 py-3 cursor-pointer glass-hover flex items-center gap-3 border-b border-white/5 last:border-0"
            >
              <span className="text-lg">📍</span>
              <div>
                <p className="font-display font-semibold text-sm text-white/90">{city.name}</p>
                <p className="text-white/40 text-xs">{city.country} {city.admin1 ? `· ${city.admin1}` : ''}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
