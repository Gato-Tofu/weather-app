import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { getWeather } from './services/weatherApi'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCitySelect = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)
    try {
      const data = await getWeather(city.latitude, city.longitude)
      setWeather(data)
      setSelectedCity(city)
    } catch (e) {
      setError('No se pudo obtener el clima. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-96 h-96 bg-sky-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="text-center mb-10 animate-fade-up">
        <p className="text-emerald-400/60 tracking-[0.3em] text-xs font-body uppercase mb-3">
          Open-Meteo · Sin API key
        </p>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-white tracking-tight">
          Weather<span className="text-emerald-400">Now</span>
        </h1>
        <p className="text-white/30 font-body mt-3 text-sm">
          Clima en tiempo real para cualquier ciudad del mundo
        </p>
      </header>

      {/* Search */}
      <div className="w-full max-w-md mb-8 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
        <SearchBar onSelect={handleCitySelect} />
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="w-10 h-10 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-white/40 font-body text-sm animate-pulse2">Obteniendo datos...</p>
        </div>
      )}

      {error && (
        <div className="glass rounded-2xl px-6 py-4 text-red-400/80 font-body text-sm mt-4">
          ⚠️ {error}
        </div>
      )}

      {weather && selectedCity && !loading && (
        <WeatherCard data={weather} city={selectedCity} />
      )}

      {!weather && !loading && !error && (
        <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <p className="text-6xl mb-4">🌍</p>
          <p className="text-white/30 font-body text-sm">Busca una ciudad para empezar</p>
        </div>
      )}
    </div>
  )
}
