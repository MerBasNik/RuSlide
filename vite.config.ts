import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // server: {
    //     host: true, // Позволяет доступ извне контейнера
    //     port: 3000,
    //     watch: {
    //         usePolling: true, // Для работы в Docker на Windows/Mac
    //     },
    // },
});
