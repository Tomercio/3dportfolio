import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

// Remove ThemeProvider wrapping since we're only using dark mode now

function ScrollToTopOnMount() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTopOnMount />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)