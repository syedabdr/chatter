
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAPksx_-44sNML-mBc7FTEPa1S2CS1f0o4",
  authDomain: "chatter-59548.firebaseapp.com",
  databaseURL: "https://chatter-59548-default-rtdb.firebaseio.com",
  projectId: "chatter-59548",
  storageBucket: "chatter-59548.appspot.com",
  messagingSenderId: "21569574076",
  appId: "1:21569574076:web:e3221281b90e920c30acb9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);