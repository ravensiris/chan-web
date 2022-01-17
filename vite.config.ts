import type { UserConfig } from "vite";
import { resolve } from "path";
import routify from "@roxi/routify/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";

const config: UserConfig = {
  resolve: {
    dedupe: ['@roxi/routify'],
    alias: {
      svelte: resolve(__dirname, "node_modules/svelte"),
      // $: resolve(__dirname, './src'),
    },
  },
  plugins: [routify(), svelte(), tsconfigPaths()],
  base: "/",  
  optimizeDeps: {
    exclude: ['@roxi/routify'],
  },
};

export default config;
