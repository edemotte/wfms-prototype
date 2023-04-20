import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWGOavYuAIQAL4a9AnkaIPsX4qMgSWx44",
  authDomain: "wfms-227cc.firebaseapp.com",
  projectId: "wfms-227cc",
  storageBucket: "wfms-227cc.appspot.com",
  messagingSenderId: "1087617026747",
  appId: "1:1087617026747:web:2777404b72a31d5dceb79e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

// Export both instances using named exports
export { db, auth };
