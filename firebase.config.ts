import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUS_ovghOmk2Ev8D1ORCuNvWrcksj22Zk",
  authDomain: "jonify-5b8db.firebaseapp.com",
  projectId: "jonify-5b8db",
  storageBucket: "jonify-5b8db.appspot.com",
  messagingSenderId: "197636441089",
  appId: "1:197636441089:web:4d43463d6c1fd13434ac00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
