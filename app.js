import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, onAuthStateChanged, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getDatabase, ref, set, get, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";

const firebaseConfig = {
 apiKey:"AIzaSyAgMPYJwCEbp-Wbw7cbzLOie05xSuzqZVo",
 authDomain:"rg-gamer-boy-ff-official-app.firebaseapp.com",
 databaseURL:"https://rg-gamer-boy-ff-official-app-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId:"rg-gamer-boy-ff-official-app",
 storageBucket:"rg-gamer-boy-ff-official-app.firebasestorage.app",
 messagingSenderId:"1041785173664",
 appId:"1:1041785173664:web:2c1398ff2727d6211f7bc5",
 measurementId:"G-QJMF0EMC6V"
};
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getDatabase(app);
const $=id=>document.getElementById(id), status=$("status");
const POLICY_VERSION="2026-11-23-v1";
$("year").textContent=new Date().getFullYear();
const consentKey="rg_policy_acceptance_"+POLICY_VERSION;
const modal=$("consentModal"), accept=$("acceptBox"), acceptBtn=$("acceptBtn");
function updateConsent(){acceptBtn.disabled=!accept.checked}
accept.addEventListener("change",updateConsent);
if(localStorage.getItem(consentKey)==="yes") modal.hidden=true;
acceptBtn.addEventListener("click",()=>{if(!accept.checked)return;localStorage.setItem(consentKey,"yes");modal.hidden=true});
function showError(msg){status.textContent=msg}
function friendlyError(e){
 const c=e?.code||"";
 if(c.includes("unauthorized-domain"))return "This website domain is not authorized for Firebase Authentication. Add rggamerboyff.github.io in Firebase Authentication → Settings → Authorized domains.";
 if(c.includes("popup-blocked"))return "Google sign-in popup was blocked. Please allow popups and try again.";
 if(c.includes("popup-closed"))return "Google sign-in was closed before completion. Please try again.";
 if(c.includes("network"))return "Network problem. Check your internet connection and try again.";
 return "Sign-in could not be completed ("+c+"). Please try again.";
}
function safeNext(){location.href="./"}
async function saveBasicProfile(user,provider){
 const data={uid:user.uid,provider,displayName:user.displayName||"Guest",email:user.email||null,photoURL:user.photoURL||null,lastSignInAt:Date.now()};
 await set(ref(db,"users/"+user.uid+"/profile"),data);
}
$("googleBtn").addEventListener("click",async()=>{
 status.textContent="";$("googleBtn").disabled=true;
 try{
  await setPersistence(auth,browserLocalPersistence);
  const p=new GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});
  try{await signInWithPopup(auth,p); }catch(e){
   if(["auth/popup-blocked","auth/operation-not-supported-in-this-environment"].includes(e.code)){await signInWithRedirect(auth,p);return;}
   throw e;
  }
 }catch(e){showError(friendlyError(e));$("googleBtn").disabled=false}
});
$("guestBtn").addEventListener("click",async()=>{
 status.textContent="";$("guestBtn").disabled=true;
 try{await setPersistence(auth,browserLocalPersistence);const cred=await signInAnonymously(auth);await saveBasicProfile(cred.user,"anonymous");}
 catch(e){showError(friendlyError(e));$("guestBtn").disabled=false}
});
try{await getRedirectResult(auth)}catch(e){showError(friendlyError(e))}
onAuthStateChanged(auth,async user=>{
 if(!user){$("signedIn").hidden=true;$("googleBtn").disabled=false;$("guestBtn").disabled=false;return}
 try{
  const provider=user.isAnonymous?"anonymous":(user.providerData[0]?.providerId||"google.com");
  // Create/update minimal profile only for Firebase-backed sign-ins.
  await saveBasicProfile(user,provider);
  $("userName").textContent=user.displayName||"Guest account";
  $("userEmail").textContent=user.email||"Anonymous account";
  $("avatar").textContent=(user.displayName||"G").slice(0,2).toUpperCase();
  $("signedIn").hidden=false;$("googleBtn").hidden=true;$("guestBtn").hidden=true;
 }catch(e){showError("You are signed in, but profile data could not be saved. Check Realtime Database Rules.");}
});
$("continueBtn").addEventListener("click",()=>safeNext());
$("signOutBtn").addEventListener("click",async()=>{await signOut(auth);location.reload()});
