import { decodeWeather } from '../services/weatherApi'

export default function WeatherCard({ data, city }) {
  const { current, daily } = data
  const weather = decodeWeather(current.weather_code, current.is_day)
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <div className="w-full max-w-md mx-auto space-y-3 animate-fade-up">
      {/* Main card */}
      <div className="glass rounded-3xl p-7 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/40 text-sm font-body tracking-widest uppercase">Ahora</p>
            <h2 className="font-display font-bold text-2xl text-white mt-1">{city.name}</h2>
            <p className="text-white/40 text-sm">{city.country}</p>
          </div>
          <span className="text-5xl">{weather.emoji}</span>
        </div>

        <div className="flex items-end gap-3 mb-2">
          <span className="font-display font-extrabold text-8xl text-glow text-emerald-100 leading-none">
            {Math.round(current.temperature_2m)}°
          </span>
          <span className="text-white/40 text-2xl mb-4">C</span>
        </div>

        <p className="font-body text-white/60 mb-6">{weather.label}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Stat icon="🌡️" label="Sensación" value={`${Math.round(current.apparent_temperature)}°`} />
          <Stat icon="💧" label="Humedad"   value={`${current.relative_humidity_2m}%`} />
          <Stat icon="💨" label="Viento"    value={`${Math.round(current.wind_speed_10m)} km/h`} />
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="glass rounded-3xl p-5">
        <p className="text-white/40 text-xs tracking-widest uppercase font-body mb-4">Próximos 7 días</p>
        <div className="space-y-2">
          {daily.time.map((dateStr, i) => {
            const d = new Date(dateStr)
            const dayW = decodeWeather(daily.weather_code[i])
            const isToday = i === 0
            return (
              <div
                key={i}
                className={`flex items-center justify-between py-2 px-3 rounded-xl transition-colors ${isToday ? 'bg-emerald-400/10' : 'glass-hover'}`}
              >
                <span className="font-display text-sm w-10 text-white/70">
                  {isToday ? 'Hoy' : days[d.getDay()]}
                </span>
                <span className="text-lg">{dayW.emoji}</span>
                <span className="text-white/40 text-xs flex-1 ml-3 hidden sm:block">{dayW.label}</span>
                <div className="flex gap-3 font-body text-sm">
                  <span className="text-white/40">{Math.round(daily.temperature_2m_min[i])}°</span>
                  <span className="text-white font-medium">{Math.round(daily.temperature_2m_max[i])}°</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-center text-white/20 text-xs font-body pb-2">
        Datos: open-meteo.com · Sin API key requerida
      </p>
    </div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white/5 rounded-2xl p-3 text-center">
      <span className="text-xl">{icon}</span>
      <p className="text-white/40 text-xs mt-1 font-body">{label}</p>
      <p className="font-display font-semibold text-white text-sm mt-0.5">{value}</p>
    </div>
  )
}
