import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/triones-form-designer/',
  plugins: [react()],
  resolve: {
    alias: {
      '@trionesdev/form-designer-react': path.resolve(
        __dirname,
        '../../packages/form-designer-react/src',
      ),
    },
  },
});
