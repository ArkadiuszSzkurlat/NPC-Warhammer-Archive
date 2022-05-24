import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  getDoc,
  getDocs,
  getFirestore,
  doc,
  collection,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { NPCArchetype } from './redux/NPCSlice';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export default app;

export const auth = app.auth();

export const db = getFirestore(app);

export const creatUserWithEmail = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password).then(() => {
    setDoc(doc(db, 'users', email), {
      email,
    });
  });
};

export const addEditNPC = (data: NPCArchetype): void => {
  if (auth.currentUser?.email) {
    setDoc(doc(db, 'users', auth.currentUser.email, 'files', data.name), data)
      .then(() => {
        alert('Pomyślnie zapisano postać');
      })
      .catch((err) => {
        alert('Wystąpił błąd przy zapisywaniu postaci');
        console.log(err);
      });
  }
};

export const deleteNPC = (name: string) => {
  auth.currentUser?.email &&
    deleteDoc(doc(db, 'users', auth.currentUser.email, 'files', name));
};

export const getNPCs = async () => {
  if (auth.currentUser?.email) {
    const querySnapshot = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'files')
    );

    let NPCS: string[] = [];

    querySnapshot.forEach((doc) => {
      NPCS.push(doc.id);
    });
    return NPCS;
  }
};

export const getSpecificNPC = async (name: string) => {
  if (auth.currentUser?.email) {
    const NPC = await getDoc(
      doc(db, 'users', auth.currentUser.email, 'files', name)
    );
    return NPC;
  }
};
