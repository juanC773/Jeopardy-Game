# Trivia Challenge - Sistema de Juego Interactivo para Exposiciones

Sistema de trivia interactivo con ruleta de equipos y tablero de preguntas estilo Jeopardy, diseñado para hacer exposiciones más dinámicas y participativas.

## 📋 Descripción

Este proyecto combina dos componentes principales:
1. **Tablero Jeopardy**: Preguntas organizadas por expositor con diferentes puntajes
2. **Ruleta de Equipos**: Sistema de selección aleatoria con gestión de oportunidades

## 🎮 Reglas del Juego

### Estructura Básica
- Cada expositor presenta su parte (~20 minutos)
- Al terminar **su parte**, se juega con la ruleta usando sus 10 preguntas

### Sistema de Participación
- Cada equipo tiene **3 oportunidades** en TODA la exposición
- Solo pueden participar **1 vez por expositor**
- Giramos la ruleta hasta completar **6 preguntas por expositor** (esto es una ronda)
- Si cae un equipo que ya participó con ese expositor, simplemente volvemos a girar

### Mecánica de Preguntas
- El equipo seleccionado elige una pregunta del tablero (200, 400, 600, 800 o 1000 puntos)
- Entre más puntos, más difícil la pregunta
- **Si responde bien:** Suma los puntos + gasta 1 oportunidad + la pregunta queda bloqueada
- **Si responde mal:** No suma puntos + gasta 1 oportunidad + la pregunta vuelve a estar disponible

### Ganador
El equipo con más puntos al final de todas las rondas.

## 🛠️ Componentes

### Jeopardy Board (`JeopardyBoard.jsx`)
Tablero de preguntas con:
- 4 secciones (una por expositor)
- 10 preguntas cada uno (2 columnas x 5 niveles)
- Puntajes: 200, 400, 600, 800, 1000
- Modal para mostrar preguntas en grande
- Sistema de bloqueo para preguntas ya respondidas

### Ruleta de Equipos (`RuletaEquipos.jsx`)
Sistema de selección con:
- 8 equipos participantes
- 3 oportunidades por equipo
- Registro de respuestas correctas e incorrectas por ronda
- Sistema de rondas automático (cada 6 respuestas)
- Confirmación antes de resetear

## ✏️ Editar las Preguntas

Las preguntas se configuran fácilmente al inicio del archivo `JeopardyBoard.jsx`:
```javascript
const preguntasJuanDavid = [
  "Pregunta 1",
  "Pregunta 2", 
  // ... hasta 10 preguntas
];

const preguntasCatalina = [
  "Pregunta 1",
  // ... hasta 10 preguntas
];

// Y así para cada expositor