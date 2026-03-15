import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";

import { registerSW } from 'virtual:pwa-register';

inject();

// Register the service worker with auto-update capability
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(<App />);
