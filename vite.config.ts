import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      "/XXX": {
        target: "https://XXX",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
      },
    },
  },
  plugins: [reactRefresh()],
});
