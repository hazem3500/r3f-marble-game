import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

if (import.meta.env.DEV) {
  import('@theatre/studio').then(({ default: studio }) => {
    import('@theatre/r3f/dist/extension').then(({ default: extension }) => {
      studio.initialize()
      studio.extend(extension)
    })
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
