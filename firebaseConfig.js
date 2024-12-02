// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsQYzJ96I794GC2Nus1ndTL3gGY1N3O5w",
  authDomain: "event-organizer-6c8aa.firebaseapp.com",
  projectId: "event-organizer-6c8aa",
  storageBucket: "event-organizer-6c8aa.firebasestorage.app",
  messagingSenderId: "601079772618",
  appId: "1:601079772618:web:9290ac119a2eb292058b33",
  measurementId: "G-0JK0R0NXR3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
