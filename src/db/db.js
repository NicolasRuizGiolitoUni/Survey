import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Define production and development configurations
const prodConfig = {
  apiKey: import.meta.env.VITE_PROD_API_KEY,
  authDomain: import.meta.env.VITE_PROD_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROD_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PROD_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PROD_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PROD_APP_ID,
};

const devConfig = {
  apiKey: import.meta.env.VITE_DEV_API_KEY,
  authDomain: import.meta.env.VITE_DEV_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_DEV_PROJECT_ID,
  storageBucket: import.meta.env.VITE_DEV_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_DEV_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_DEV_APP_ID,
};

// Select the correct configuration based on the environment mode
const firebaseConfig =
  import.meta.env.MODE === "production" ? prodConfig : devConfig;

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
