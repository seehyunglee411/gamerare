import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    closeBundle() {
      const root = process.cwd();
      const outDir = resolve(root, "dist");
      const assetsDir = resolve(root, "assets");

      if (!existsSync(outDir) || !existsSync(assetsDir)) return;

      mkdirSync(resolve(outDir, "assets"), { recursive: true });
      cpSync(resolve(assetsDir, "images"), resolve(outDir, "assets/images"), {
        recursive: true,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticAssets()],
});
