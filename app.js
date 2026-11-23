import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, onAuthStateChanged, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

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
const app=initializeApp(firebaseConfig), auth=getAuth(app);
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
 try{await setPersistence(auth,browserLocalPersistence);await signInAnonymously(auth);}
 catch(e){showError(friendlyError(e));$("guestBtn").disabled=false}
});
try{await getRedirectResult(auth)}catch(e){showError(friendlyError(e))}
onAuthStateChanged(auth,user=>{
 const loggedIn=!!user;
 $("loginOptions").hidden=loggedIn;
 $("signedIn").hidden=!loggedIn;
 if(!loggedIn){$("googleBtn").disabled=false;$("guestBtn").disabled=false;}
});
$("continueBtn").addEventListener("click",()=>safeNext());
