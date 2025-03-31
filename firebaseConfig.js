// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyB73s4wJN4p1UJKMCK0INkFALyxr5yPpdE",
  authDomain: "newlawyer-52321.firebaseapp.com",
  projectId: "newlawyer-52321",
  storageBucket: "newlawyer-52321.firebasestorage.app",
  messagingSenderId: "42858186089",
  appId: "1:42858186089:web:c51927ec20fed70e2b69f8",
  measurementId: "G-FHYJ7KWXFJ"
};



// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASE_APP);

// Initialize Firebase Auth with AsyncStorage for persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const SEC_APP=initializeApp(firebaseConfig,"Sec_app");
const SEC_AUTH=initializeAuth(SEC_APP)
// Initialize Firestore
const FIREBASE_DB  = getFirestore(FIREBASE_APP);

// Export Firebase services 
export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, analytics ,SEC_AUTH };