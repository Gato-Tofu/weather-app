// Open-Meteo API — 100% gratuita, sin API key, sin registro
// Docs: https://open-meteo.com/en/docs

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function searchCity(query) {
  const res = await fetch(
    `${GEO_API}?name=${encodeURIComponent(query)}&count=5&language=es&format=json`
  )
  if (!res.ok) throw new Error('Error buscando ciudad')
  const data = await res.json()
  return data.results ?? []
}

export async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'precipitation',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
    ].join(','),
    timezone: 'auto',
    forecast_days: 7,
  })

  const res = await fetch(`${WEATHER_API}?${params}`)
  if (!res.ok) throw new Error('Error obteniendo clima')
  return res.json()
}

// WMO Weather codes → descripción + emoji
export function decodeWeather(code, isDay = true) {
  const map = {
    0:  { label: 'Despejado',            emoji: isDay ? '☀️' : '🌙' },
    1:  { label: 'Mayormente despejado', emoji: isDay ? '🌤️' : '🌙' },
    2:  { label: 'Parcialmente nublado', emoji: '⛅' },
    3:  { label: 'Nublado',              emoji: '☁️' },
    45: { label: 'Niebla',               emoji: '🌫️' },
    48: { label: 'Niebla con escarcha',  emoji: '🌫️' },
    51: { label: 'Llovizna ligera',      emoji: '🌦️' },
    53: { label: 'Llovizna moderada',    emoji: '🌦️' },
    55: { label: 'Llovizna densa',       emoji: '🌧️' },
    61: { label: 'Lluvia ligera',        emoji: '🌧️' },
    63: { label: 'Lluvia moderada',      emoji: '🌧️' },
    65: { label: 'Lluvia fuerte',        emoji: '🌧️' },
    71: { label: 'Nevada ligera',        emoji: '🌨️' },
    73: { label: 'Nevada moderada',      emoji: '❄️' },
    75: { label: 'Nevada intensa',       emoji: '❄️' },
    80: { label: 'Chubascos ligeros',    emoji: '🌦️' },
    81: { label: 'Chubascos moderados',  emoji: '🌧️' },
    82: { label: 'Chubascos fuertes',    emoji: '⛈️' },
    95: { label: 'Tormenta eléctrica',   emoji: '⛈️' },
    99: { label: 'Tormenta con granizo', emoji: '⛈️' },
  }
  return map[code] ?? { label: 'Desconocido', emoji: '🌡️' }
}
