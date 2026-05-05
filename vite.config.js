import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/aboutus.html"),
        contact: resolve(__dirname, "pages/contactus.html"),
        vision: resolve(__dirname, "pages/vision.html"),
        collections: resolve(__dirname, "pages/collections.html"),
        // add more pages here
      },
    },
  },
});