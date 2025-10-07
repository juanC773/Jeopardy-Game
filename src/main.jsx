import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JeopardyBoard from './components/Jeopardy'
import RuletaEquipos from './components/Ruleta'
//import RuletaDesempate from './components/Desempate'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <JeopardyBoard />
   <RuletaEquipos />
 {/* <RuletaDesempate /> */}
  </StrictMode>
)

