import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { lingui } from "@lingui/vite-plugin";
import { apiAddress, proxyApi } from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          // 全局主色
          "@primary-color": "#bae637",
          // 链接色
          "@link-color": "#1890ff",
          // 成功色
          "@success-color": "#52c41a",
          // 警告色
          "@warning-color": "#faad14",
          // 错误色
          "@error-color": "#f5222d",
          // 主字号
          "@font-size-base": "14px",
          // 标题色
          "@heading-color": "rgba(0, 0, 0, 0.85)",
          // 主文本色
          "@text-color": "rgba(0, 0, 0, 0.65)",
          // 次文本色
          "@text-color-secondary": "rgba(0, 0, 0, 0.45)",
          // 禁用色
          "@disabled-color": "rgba(0, 0, 0, 0.25)",
          // 组件/浮层圆角
          "@border-radius-base": "2px",
          // 边框色
          "@border-color-base": "#d9d9d9",
          // 边框阴影
          "@box-shadow-base":
            "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@lingui/core", "react-dom", "classnames", "lodash-es"],
  },
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    lingui(),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(process.cwd(), "src")}/`,
      lodash: "lodash-es",
      "lodash.debounce": "lodash-es/debounce",
      "lodash.throttle": "lodash-es/throttle",
    },
  },
  server: {
    port: 3001,
    proxy: {
      [proxyApi]: {
        target: apiAddress,
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
