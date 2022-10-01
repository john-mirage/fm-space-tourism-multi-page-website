import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/fm-space-tourism-multi-page-website/",
  plugins: [react({
    babel: {
      plugins: [
        ["babel-plugin-styled-components", { "fileName": false }]
      ]
    }
  })],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@images": resolve(__dirname, "src/images"),
    },
  },
});
