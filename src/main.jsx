import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JeopardyBoard from './components/Jeopardy'
import RuletaEquipos from './components/Ruleta'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <JeopardyBoard />
   <RuletaEquipos />
  </StrictMode>,
)
