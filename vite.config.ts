import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, "src/components"),
            '@contexts': path.resolve(__dirname, "src/context"),
            '@styles': path.resolve(__dirname, "src/component_styles"),
            '@pages': path.resolve(__dirname, "src/pages"),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    }
})
