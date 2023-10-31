import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
/* import {getFirestore} from '@firebase/firebase' */

const firebaseConfig = {
  apiKey: "AIzaSyAwlz4DlDRERH9IsINjQJ9Vmwj1V3dYAiQ",
  authDomain: "final-prog2-4c0e1.firebaseapp.com",
  projectId: "final-prog2-4c0e1",
  storageBucket: "final-prog2-4c0e1.appspot.com",
  messagingSenderId: "604535560552",
  appId: "1:604535560552:web:5188cf077cf214fe865edd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);