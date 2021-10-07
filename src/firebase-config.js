import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgVPQ4aSEeq5wEcGXPM_T-G3iZYGncAwk",
  authDomain: "innovapps-d8234.firebaseapp.com",
  databaseURL: "https://innovapps-d8234-default-rtdb.firebaseio.com",
  projectId: "innovapps-d8234",
  storageBucket: "innovapps-d8234.appspot.com",
  messagingSenderId: "128964267039",
  appId: "1:128964267039:web:db2a7199948f866a28592a",
  measurementId: "G-NRMXFZYFY3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export default app;