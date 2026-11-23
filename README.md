# RG GAMER BOY FF — Login website

## Deploy
1. Upload the contents of this folder to the root of the GitHub Pages repository for `https://rggamerboyff.github.io/RG-GAMER-BOY-FF-OFFICIAL-APP/`.
2. Firebase Console → Authentication → Sign-in method: enable Google and Anonymous.
3. Firebase Authentication → Settings → Authorized domains: confirm `rggamerboyff.github.io` is present.
4. Realtime Database → Rules: review and publish `database.rules.json`.
5. Test Google sign-in on the deployed HTTPS URL, guest sign-in, and refresh persistence.

## Important limitations before production
- Google popup is used first; redirect fallback is used if the browser blocks popups. `getRedirectResult` is processed on page load to avoid getting stuck on the Google screen.
- Google and guest sessions use browser-local Firebase persistence.
- The guest 4-day renewal feature is intentionally not enabled in this starter. A quiz checked only in browser JavaScript is trivially bypassable. Implement renewal with a trusted backend (for example, a Firebase Cloud Function) before enforcing it.
- Add the real support email, confirm the Privacy Policy and Terms match actual practices, and set governing law before publishing.
- The signed-in view hides all login choices and shows only Continue. It does not display a profile name, avatar, email, or sign-out control.
- Username/password link is the separate site supplied by the owner and is not changed by this project.
- Do not put Firebase Admin SDK credentials in frontend files.
- This version uses Firebase Authentication only and does not write user profile data to Realtime Database. `database.rules.json` is included only as an optional starting point; it is not required for the login flow.
- Firebase Analytics is not initialized in this version; the measurement ID is retained in config only.
