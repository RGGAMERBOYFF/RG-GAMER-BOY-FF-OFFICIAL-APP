# RG GAMER BOY FF — Login website

## Deploy
1. Upload the contents of this folder to the root of the GitHub Pages repository for `https://rggamerboyff.github.io/RG-GAMER-BOY-FF-OFFICIAL-APP/`.
2. Firebase Console → Authentication → Sign-in method: enable Google and Anonymous.
3. Firebase Authentication → Settings → Authorized domains: confirm `rggamerboyff.github.io` is present.
4. Realtime Database → Rules: review and publish `database.rules.json`.
5. Test Google sign-in on the deployed HTTPS URL, guest sign-in, refresh persistence, and sign-out.

## Important limitations before production
- Google popup is used first; redirect fallback is used if the browser blocks popups. `getRedirectResult` is processed on page load to avoid getting stuck on the Google screen.
- Google and guest sessions use browser-local Firebase persistence.
- The guest 4-day renewal feature is intentionally not enabled in this starter. A quiz checked only in browser JavaScript is trivially bypassable. Implement renewal with a trusted backend (for example, a Firebase Cloud Function) before enforcing it.
- The Google Form URL is not yet supplied; the deletion page clearly marks this as pending.
- Add the real support email, confirm the Privacy Policy and Terms match actual practices, and set governing law before publishing.
- Username/password link is the separate site supplied by the owner and is not changed by this project.
- Do not put Firebase Admin SDK credentials in frontend files.
- The sample database rules only allow the exact profile fields written by `app.js`. If you change the data model, update and test rules together.
- Firebase Analytics is not initialized in this version; the measurement ID is retained in config only.
