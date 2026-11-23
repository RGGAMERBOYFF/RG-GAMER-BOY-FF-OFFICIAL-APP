# RG GAMER BOY FF — Sign-in website

## GitHub Pages deployment
1. Extract this ZIP and upload all files to the root of `https://rggamerboyff.github.io/RG-GAMER-BOY-FF-OFFICIAL-APP/`.
2. Replace the existing `index.html`, `styles.css`, `app.js`, policy pages and README. Keep the files together in the repository root.

## Firebase setup
1. Firebase Console → Authentication → Sign-in method: enable Google and Anonymous.
2. Firebase Authentication → Settings → Authorized domains: add/confirm `rggamerboyff.github.io`.
3. `database.rules.json` contains the requested `privateUsers/$uid` rules. If your app uses Realtime Database, paste these rules into Realtime Database → Rules and Publish. Uploading the JSON to GitHub does not publish rules to Firebase.
4. This login page currently uses Firebase Authentication only and does not write profile data to Realtime Database.

## Login behavior
- Google sign-in uses a popup first and redirect fallback if the popup is blocked or unsupported.
- Google and Guest sessions use browser-local Firebase persistence.
- After successful authentication, login options are hidden and only Continue is shown. The heading changes to `Welcome Back`.
- Continue redirects to `https://rgsouravbasak-del.github.io/RG-GAMER-BOY-FF-APP/`.
- Username & Password opens `https://rggamerboyff.github.io/RG-GAMER-BOY-FF-2022-APP/` in a new tab.
- Account deletion page is not included.

## Important
- Guest sign-in must be enabled in Firebase Authentication.
- The four-day Guest renewal/quiz feature is not implemented. Secure enforcement requires a trusted backend.
- Confirm that the Privacy Policy and Terms accurately describe the live website before publishing.
- Never put Firebase Admin SDK credentials in frontend files.
