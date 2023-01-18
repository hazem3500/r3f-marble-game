import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { r3f } from '@react-three/editor/vite'

export default defineConfig((env) => ({
    plugins: [env.command === 'build' ? react() : r3f()]
}))
