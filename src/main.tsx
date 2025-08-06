// src/main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import registerSW from './registerServiceWorker' // default export from your file

const rootEl = document.getElementById('root')

if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Root element not found')
}

// registerSW may be an updater function or undefined. Guard before calling.
if (typeof registerSW === 'function') {
  // call it (it returns a Promise possibly)
  void registerSW()
} else {
  // optional: log or ignore
  // console.info('Service worker updater is not available.')
}
