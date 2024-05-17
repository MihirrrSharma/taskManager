import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb2gZbjm6rqcU93nV4Hfozzpu0HKEK1Y8",
  authDomain: "taskmanager-fde64.firebaseapp.com",
  projectId: "taskmanager-fde64",
  storageBucket: "taskmanager-fde64.appspot.com",
  messagingSenderId: "103693427922",
  appId: "1:103693427922:web:e21cb94d7234437318390b"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);