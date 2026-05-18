# 🌤️ WeatherNow

App de clima en tiempo real construida con **React + Tailwind CSS** usando la API gratuita de [Open-Meteo](https://open-meteo.com/).

> **Sin API key. Sin registro. 100% gratuita.**

## ✨ Features

- 🔍 Búsqueda de ciudades con autocompletado
- 🌡️ Temperatura actual, sensación térmica, humedad y viento
- 📅 Pronóstico de 7 días
- 🌙 Soporte día/noche en iconos
- 💨 Diseño glassmorphism oscuro y responsive

## 🚀 Tecnologías

| Tecnología | Uso |
|------------|-----|
| React 18 | UI y estado |
| Tailwind CSS 3 | Estilos |
| Vite | Bundler |
| Open-Meteo API | Datos del clima (gratis) |

## 📦 Instalación y uso

```bash
# 1. Clonar el repo
git clone https://github.com/TU_USUARIO/weather-app.git
cd weather-app

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev

# 4. Build para producción
npm run build
```

## 🌐 API usada

**Open-Meteo** — https://open-meteo.com

- Sin registro, sin API key
- Datos en tiempo real con cobertura global
- Endpoints usados:
  - `geocoding-api.open-meteo.com` — búsqueda de ciudades
  - `api.open-meteo.com/v1/forecast` — datos del clima

## 📁 Estructura del proyecto

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx   # Buscador con autocompletado
│   │   └── WeatherCard.jsx # Tarjeta principal + pronóstico
│   ├── services/
│   │   └── weatherApi.js   # Lógica de la API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🌿 Branches del proyecto

| Branch | Descripción |
|--------|-------------|
| `main` | Producción estable |
| `develop` | Integración de features |
| `feature/search` | Componente de búsqueda |
| `feature/weather-card` | Tarjeta del clima y pronóstico |
