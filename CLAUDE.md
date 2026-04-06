# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (tsx server.ts, port 3000)
npm run build        # Production build (vite build)
npm run preview      # Preview production build
npm run lint         # Type-check only (tsc --noEmit) — no test runner configured
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` — Firebase project (clarix-protocol). Get from Firebase Console → Project Settings → Web app
- `VITE_CLAUDE_API_KEY` — for all Claude AI features (quiz generation, AI assistant, sentiment oracle)
- `GEMINI_API_KEY` — for Gemini features (news, audio narration)
- `VITE_WALLETCONNECT_PROJECT_ID` — for WalletConnect modal
- `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID` — for waitlist form submissions via Google Sheets

Firebase config is read from `import.meta.env` (VITE_FIREBASE_* vars). `firebase-applet-config.json` is gitignored and no longer used.

### Firebase Authorized Domains (Google Sign-In)

Google Sign-In uses `signInWithRedirect` (not `signInWithPopup`). This avoids `auth/unauthorized-domain` errors caused by third-party cookie restrictions in Safari/Firefox/Chrome when the app is served from a domain different from the Firebase `authDomain`.

The redirect result is handled by a `useEffect` in `AppContent` (`App.tsx`) that calls `getRedirectResult(auth)` on mount, initialises new users in Firestore, and navigates to `/dashboard`.

If `auth/unauthorized-domain` still appears, the app's domain must be added to Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/) → select the project
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Click **Add domain** and enter the domain (e.g. `clarixprotocol.com`, `localhost`, or a preview URL)

This must be done for every new deployment domain. `VITE_FIREBASE_AUTH_DOMAIN` should remain as the default Firebase domain (`clarix-protocol.firebaseapp.com`) — do not change it to the production domain unless Firebase Hosting is configured for that domain.

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Firebase + ethers.js

**Entry point:** `index.tsx` → `App.tsx` wraps everything in `FirebaseProvider` > `NewbieModeProvider` > `AppContent` + `LearningModeBanner`.

### State Management

`UserProgress` (`types.ts`) is the central state object. It is persisted in two ways simultaneously:
- **Authenticated users:** Firestore at `users/{uid}`, synced via `onSnapshot` in `FirebaseContext.tsx`
- **Anonymous/offline users:** `localStorage` under key `clarix_v1_state` (or `clarix_v1_state_{did}` when wallet-connected)

`App.tsx` merges both: `const progress = (user && firebaseProgress) ? firebaseProgress : localProgress`

### Routing

Client-side only using `window.history.pushState` + `popstate` listener. No React Router. Routes:
- `/` — Landing page (ClarixHero + MarketDemo) if not onboarded
- `/signup` — SignupPage (Google OAuth or wallet)
- `/investors` — InvestorsPage
- `/dashboard` (or any other path after onboarding) — Main app

### Views

The main app uses a single `activeView` state string to switch between panels: `'academy' | 'certification' | 'institutional' | 'guilds' | 'governance' | 'peers' | 'profile' | 'market' | 'portfolio'`. Navigation is handled via `Sidebar`.

### AI Services (`services/`)

- `claudeService.ts` — Primary AI service. Makes direct browser-to-API calls to `api.anthropic.com` using `VITE_CLAUDE_API_KEY`. Handles: quiz generation, path recommendations, AI assistant chat, sentiment analysis, neural feed, and smart contract audit summaries.
- `geminiService.ts` — Secondary service using `@google/genai` for features like news summaries and audio narration.
- `walletService.ts` — MetaMask connection, account/chain change watchers, and `ethers.js` integration.
- `marketService.ts` — Market data fetching.

### Pro/Free Gating

`ProFeatureWrapper` component gates certain views. `progress.isPro` is the flag. In development, `togglePro()` in `App.tsx` flips it without a real payment flow.

### Wallet & DID

When a wallet connects, a DID is derived as `did:ethr:{address}`. This DID is stored on `UserProgress` and used as a localStorage key prefix to namespace user state per identity.

### Contexts & Hooks

- `FirebaseContext` — Auth state + Firestore read/write for `UserProgress`
- `NewbieModeContext` — Toggles simplified terminology app-wide
- `useTerminology` hook — Returns `t()` and `Term` for newbie/expert mode text swapping

### Tailwind & Styling

Uses Tailwind v4 with custom design tokens defined in `index.css`. Key custom colors: `cyber-lime`, `electric-violet`, `hyper-gold`, `bg-void`, `bg-surface`. Component animations use the `motion` library (Framer Motion v12).
