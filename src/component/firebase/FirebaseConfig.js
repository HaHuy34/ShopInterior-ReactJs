import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import "firebase/compat/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCFOE9fO7z-UT5wR70v9g0q9RftIRL_P6M",
  authDomain: "api-shopinterior.firebaseapp.com",
  projectId: "api-shopinterior",
  storageBucket: "api-shopinterior.appspot.com",
  messagingSenderId: "609319824009",
  appId: "1:609319824009:web:5a2942d15569dbdffeb458",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app);
