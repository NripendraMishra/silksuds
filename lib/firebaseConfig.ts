// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth as firebaseGetAuth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHdqfCw6gNVLQAvxYYTUdWAMrp0GfcLq4",
  authDomain: "subtle-breaker-326317.firebaseapp.com",
  projectId: "subtle-breaker-326317",
  storageBucket: "subtle-breaker-326317.firebasestorage.app",
  messagingSenderId: "585501457892",
  appId: "1:585501457892:web:e97934074373cf4bd29bf1",
  measurementId: "G-4XM1PZN2ET"
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = firebaseGetAuth(app);

// Initialize Analytics only on client side
let analytics: Analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { analytics };
export const GA_TRACKING_ID = 'G-FKWF3FLZ1V'; // Use your Firebase measurementId