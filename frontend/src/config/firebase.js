import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDv2EljKONA8Byf5edXKc-VBuoQCaSVZJw",
  authDomain: "green-roots-5cea0.firebaseapp.com",
  projectId: "green-roots-5cea0",
  storageBucket: "green-roots-5cea0.firebasestorage.app",
  messagingSenderId: "931210726939",
  appId: "1:931210726939:web:3fd5b168d61527d7a072be",
  measurementId: "G-CTRGW7309G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 