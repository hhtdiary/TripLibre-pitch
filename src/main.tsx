import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './scenes/act-one.css'
import './scenes/act-two.css'
import './scenes/s10.css'
import './scenes/act-three.css'
import './scenes/act-four.css'
import './scenes/act-five.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
