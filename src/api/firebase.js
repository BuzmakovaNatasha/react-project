import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC41PEffQFORRiNY9xU3_dB__c19c6u6eE",
  authDomain: "gb-chat-2f642.firebaseapp.com",
  databaseURL: "https://gb-chat-2f642-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gb-chat-2f642",
  storageBucket: "gb-chat-2f642.appspot.com",
  messagingSenderId: "876837779537",
  appId: "1:876837779537:web:35e661f20e30cb96cda070",
  measurementId: "G-76XBS9686D"
};

export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase);
export const database = getDatabase(firebase);