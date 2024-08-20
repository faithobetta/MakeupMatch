// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "makeupmatch-3b7d1.firebaseapp.com",
  projectId: "makeupmatch-3b7d1",
  storageBucket: "makeupmatch-3b7d1.appspot.com",
  messagingSenderId: "426250009292",
  appId: "1:426250009292:web:bf983e2a789348ad86e069",
  measurementId: "G-HH8Z5PYS82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };


