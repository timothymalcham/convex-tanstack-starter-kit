import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from "@vitejs/plugin-react"

export default defineConfig({
    server: {
        port: 5173,
    },
    plugins: [
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tanstackStart({ customViteReactPlugin: true }),
        viteReact(),
        tailwindcss()
    ],
})