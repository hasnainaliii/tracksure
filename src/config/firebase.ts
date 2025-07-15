// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi-RSr8b8JllN2tfTUoaNnSerC1dp1sEA",
  authDomain: "tracksure-641c3.firebaseapp.com",
  projectId: "tracksure-641c3",
  storageBucket: "tracksure-641c3.firebasestorage.app",
  messagingSenderId: "657558324457",
  appId: "1:657558324457:web:e30786c92d93b63ba51c78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//db

export const fireStore = getFirestore(app);
