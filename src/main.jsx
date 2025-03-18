import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/custom-bootstrap-colors.scss'; 
import App from './App.jsx'
import Net_err from './Components/Net_err.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Net_err />
  </StrictMode>,
)
