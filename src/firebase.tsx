
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCDJkGkV1oPbHRbQ6GWgktBOzvTeY2s7iU",
  authDomain: "tomo-chat-24f91.firebaseapp.com",
  projectId: "tomo-chat-24f91",
  storageBucket: "tomo-chat-24f91.appspot.com",
  messagingSenderId: "734318331389",
  appId: "1:734318331389:web:766fc56c2f6822909d8594"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage }
