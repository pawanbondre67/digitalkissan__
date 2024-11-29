
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // Optional if not always present
}

const firebaseConfig : FirebaseConfig = {
    apiKey: "AIzaSyBp6qEkU7cAXPDAvPa3hCy0pskcK0-aLVo",
    authDomain: "digitalkissan-c7157.firebaseapp.com",
    projectId: "digitalkissan-c7157",
    storageBucket: "digitalkissan-c7157.appspot.com",
    messagingSenderId: "970946270674",
    appId: "1:970946270674:web:52b10a312b13895118640b",
    measurementId: "G-C5XP8PDDEE"
  };
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };