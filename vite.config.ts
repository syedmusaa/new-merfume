// import { defineConfig, Plugin } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { createServer } from "./server";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//     allowedHosts: ['.vercel.app'],
//   },
//   build: {
//     outDir: "dist/spa",
//   },
//   plugins: [react(), expressPlugin()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./client"),
//       "@shared": path.resolve(__dirname, "./shared"),
//     },
//   },
// }));

// function expressPlugin(): Plugin {
//   return {
//     name: "express-plugin",
//     apply: "serve", // Only apply during development (serve mode)
//     configureServer(server) {
//       const app = createServer();

//       // Add Express app as middleware to Vite dev server
//       server.middlewares.use(app);
//     },
//   };
// }


// // vite.config.ts
// import { defineConfig, Plugin } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { createServer } from "./server";

// export default defineConfig(({ mode }) => ({
//   root: path.resolve(__dirname, "client"), // 👈 set Vite root to /client
//   build: {
//     outDir: path.resolve(__dirname, "dist"), // 👈 build will go to /dist
//     emptyOutDir: true,
//   },
//   server: {
//     host: "::",
//     port: 8080,
//     allowedHosts: ['https://merfume-three.vercel.app/'],
//   },
//   plugins: [react(), expressPlugin()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "client"),
//       "@shared": path.resolve(__dirname, "shared"),
//     },
//   },
// }));

// function expressPlugin(): Plugin {
//   return {
//     name: "express-plugin",
//     apply: "serve",
//     configureServer(server) {
//       const app = createServer();
//       server.middlewares.use(app);
//     },
//   };
// }

import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
export default defineConfig({
  root: 'client', // 👈 tells Vite that your app starts in /client
  build: {
    outDir: '../dist', // 👈 build goes outside of /client
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      // '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
