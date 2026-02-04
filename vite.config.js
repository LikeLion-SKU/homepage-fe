import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      // 프론트는 /api 로만 호출하고, 실제는 dev 서버로 프록시
      '/api': {
        target: 'https://dev.skulikelion.site',
        changeOrigin: true,
        secure: true, // https 대상이므로 true
        // 필요하면 경로 그대로 유지 (지금 dev가 /api/... 쓰니까 rewrite 불필요)
        // rewrite: (path) => path.replace(/^\/api/, '/api'),

        // 쿠키 도메인/패스가 문제면 아래처럼 리라이트(선택)
        // cookieDomainRewrite: 'localhost',
        // cookiePathRewrite: '/',
      },
    },
  },
});
