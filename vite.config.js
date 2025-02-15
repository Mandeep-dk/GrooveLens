import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [react()],
    define: {
      "process.env": process.env, 
      VITE_CLIENT_ID: JSON.stringify(env.VITE_CLIENT_ID), 
    },
  };
});
