import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqpgZyi5VRby77TeZpfN9lgZzZ5Ibp8tY",
  authDomain: "webowka-prywatne.firebaseapp.com",
  projectId: "webowka-prywatne",
  storageBucket: "webowka-pryvatne.firebasestorage.app",
  messagingSenderId: "266317760499",
  appId: "1:266317760499:web:6f3233e46e5076e4173486",
  measurementId: "G-L9X2KERZPJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}
export { analytics }; 