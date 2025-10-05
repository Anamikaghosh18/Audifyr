import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4FgtBmmzJ4-Rebsy4tQ2fRI1RwLX2qX0",
  authDomain: "audifyr-65c70.firebaseapp.com",
  projectId: "audifyr-65c70",
  storageBucket: "audifyr-65c70.firebasestorage.app",
  messagingSenderId: "257958827061",
  appId: "1:257958827061:web:7344a198db5cb189cfcd7c",
  measurementId: "G-YVX6YR2C7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 
export { auth, provider, signInWithPopup };

export default app;
