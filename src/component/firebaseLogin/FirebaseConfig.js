// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBMBMqSNp98yhAQ2nqDslBSV3yhwl_uipA",
  authDomain: "emailpasswordlogin-45efb.firebaseapp.com",
  projectId: "emailpasswordlogin-45efb",
  storageBucket: "emailpasswordlogin-45efb.appspot.com",
  messagingSenderId: "478656603915",
  appId: "1:478656603915:web:87003847b6e19c334ba40e",
  measurementId: "G-VTY84G8457",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
