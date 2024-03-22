import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dns from "dns";

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
// });

export default defineConfig({
  server: {
    port: 3000,
  },
});