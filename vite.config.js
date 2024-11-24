import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [laravel(["resources/js/app.jsx"]), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
      ziggy: path.resolve(__dirname, "vendor/tightenco/ziggy"),
    },
  },
});
