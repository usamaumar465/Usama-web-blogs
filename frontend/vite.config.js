import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // other config...
  server: {
    allowedHosts: [
      'web-app-env.eba-eav3wzq9.eu-north-1.elasticbeanstalk.com'
    ],
    host: true, // allow external access
    port: 3000
  }
});