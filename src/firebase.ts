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

// Auth menagment
export const creatUserWithEmail = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password).then(() => {
    setDoc(doc(db, 'users', email), {
      email,
    });
  });
};

// NPCS
export const addEditNPC = (data: NPCArchetype): void => {
  console.log(data);
  if (auth.currentUser?.email && data.folder === 'main') {
    setDoc(doc(db, 'users', auth.currentUser.email, 'files', data.name), data)
      .then(() => {
        alert('Pomyślnie zapisano postać');
      })
      .catch((err) => {
        alert('Wystąpił błąd przy zapisywaniu postaci');
        console.log(err);
      });
  }
  if (auth.currentUser?.email && data.folder !== 'main') {
    setDoc(
      doc(
        db,
        'users',
        auth.currentUser.email,
        'folders',
        data.folder,
        'files',
        data.name
      ),
      data
    )
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

export const getNPCs = async (thing = 'main') => {
  if (auth.currentUser?.email && thing === 'main') {
    const filesSnapshot = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'files')
    );
    let NPCS: string[] = [];

    filesSnapshot.forEach((doc) => {
      NPCS.push(doc.id);
    });
    return NPCS;
  }
  if (auth.currentUser?.email && thing !== 'main') {
    const filesSnapshot = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'folders', thing, 'files')
    );
    let NPCS: string[] = [];

    filesSnapshot.forEach((doc) => {
      NPCS.push(doc.id);
    });
    return NPCS;
  }
};

export const getSpecificNPC = async (name: string) => {
  if (!auth.currentUser?.email) return;
  const NPC = await getDoc(
    doc(db, 'users', auth.currentUser.email, 'files', name)
  );
  return NPC;
};

//FOLDERS
interface Folders {
  name: string;
  files: string[];
}

export const getFolders = async () => {
  if (!auth.currentUser?.email) return;
  const filesSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.email, 'folders')
  );
  let folders: Folders[] = [];

  filesSnapshot.forEach(async (data) => {
    await getNPCs(data.data().name).then((res) => {
      if (res) {
        folders.push({ name: data.data().name, files: [...res] });
      }
    });
  });
  return folders;
};

export const addNewFolder = async (name: string) => {
  if (!auth.currentUser?.email) return;
  setDoc(doc(db, 'users', auth.currentUser.email, 'folders', name), {
    name: name,
  })
    .then(() => {
      console.log('folder added to base');
    })
    .catch((err) => {
      alert('Wystąpił błąd przy dodawaniu folderu');
      console.log(err);
    });
};

export const deleteFolder = async (name: string) => {
  if (!auth.currentUser?.email) return;
  await deleteDoc(doc(db, 'users', auth.currentUser.email, 'folders', name));
  const filesSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.email, 'folders', name, 'files')
  );
  filesSnapshot.forEach((file) => {
    if (!auth.currentUser?.email) return;
    deleteDoc(
      doc(
        db,
        'users',
        auth.currentUser.email,
        'folders',
        name,
        'files',
        file.id
      )
    );
  });
};
