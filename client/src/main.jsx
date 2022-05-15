import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { JokerProvider } from './context/JokerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <JokerProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </JokerProvider>
)
