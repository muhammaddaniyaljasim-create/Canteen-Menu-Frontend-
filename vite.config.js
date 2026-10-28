
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Canteen-Menu-Frontend-/",
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    css: false
  }
});
