// db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCguBRdZz1xTpxBWsjBhiWbWtf2iCi7Wak",
  authDomain: "survey-ded4f.firebaseapp.com",
  projectId: "survey-ded4f",
  storageBucket: "survey-ded4f.appspot.com",
  messagingSenderId: "710452770305",
  appId: "1:710452770305:web:4b36163626a184822bf200",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Named export
