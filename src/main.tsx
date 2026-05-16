import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";
import { PrivyProvider } from '@privy-io/react-auth';

import { registerSW } from 'virtual:pwa-register';

inject();

// Register the service worker with auto-update capability
registerSW({ immediate: true });

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || '';
const enableGoogleLogin = String(import.meta.env.VITE_PRIVY_ENABLE_GOOGLE || 'false') === 'true';

if (!privyAppId) {
	// eslint-disable-next-line no-console
	console.warn('VITE_PRIVY_APP_ID is missing. Privy sign-in will not work until it is set.');
}

createRoot(document.getElementById("root")!).render(
	privyAppId ? (
		<PrivyProvider
			appId={privyAppId}
			config={{
				loginMethods: enableGoogleLogin ? ['email', 'google'] : ['email'],
			}}
		>
			<App />
		</PrivyProvider>
	) : (
		<App />
	)
);
