import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    preview: {
        host: true,
        port: 5173,
        allowedHosts: ["ruslide.ru", "www.ruslide.ru", "localhost"],
    },
    server: {
        host: true,
        port: 5173,
    },
});
