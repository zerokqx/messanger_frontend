import tsPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
import { devtools } from "@tanstack/devtools-vite";
const APP = "./src/app";
export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      routesDirectory: APP + "/routes",
      generatedRouteTree: APP,
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    tailwindcss(),

    devtools(),
    tsPaths(),
  ],
});
