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
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { Folders, NPCArchetype, NPCWithAvatar } from './types/types';

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

export const storage = getStorage(app);

export const getAllAvatars = async () => {
  const ReferenceOfAllAvatars: string[] = [];
  await listAll(ref(storage, 'images/'))
    .then(async (res: any) => {
      for (let i = 0; i < res.items.length; i++) {
        await getDownloadURL(ref(res.items[i]))
          .then((img) => {
            ReferenceOfAllAvatars.push(img);
            return img;
          })
          .catch((err) => console.log(err));
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
    });
  return ReferenceOfAllAvatars;
};

// Auth menagment
export const creatUserWithEmail = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password).then(() => {
    setDoc(doc(db, 'users', email), {
      email,
    });
    return null;
  });
};

// NPCS
export const addEditNPC = async (data: NPCArchetype, oldName = data.name) => {
  if (!auth.currentUser?.email) return;

  if (data.folder === 'main') {
    const filesSnapshot: any = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'files')
    );

    await setDoc(
      doc(db, 'users', auth.currentUser.email, 'files', data.name),
      data
    )
      .then(() => {
        console.log('Pomyślnie zapisano postać');
        return null;
      })
      .catch((err) => {
        console.log('Wystąpił błąd przy zapisywaniu postaci');
        console.log(err);
      });

    if (data.name !== oldName) {
      await deleteNPC(oldName);
    }
  }
  if (data.folder !== 'main') {
    await setDoc(
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
        return null;
      })
      .catch((err) => {
        alert('Wystąpił błąd przy zapisywaniu postaci');
        console.log(err);
      });
    if (data.name !== oldName) {
      await deleteNPC(oldName, data.folder);
    }
  }
};

export const deleteNPC = (name: string, folder = 'main') => {
  if (!auth.currentUser?.email) return;
  if (folder === 'main') {
    deleteDoc(doc(db, 'users', auth.currentUser.email, 'files', name));
  } else {
    deleteDoc(
      doc(db, 'users', auth.currentUser.email, 'folders', folder, 'files', name)
    );
  }
};

export const getNPCs = async () => {
  if (!auth.currentUser?.email) return;
  const NPCS: NPCWithAvatar[] = [];
  const filesSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.email, 'files')
  );
  filesSnapshot.forEach((doc) => {
    const data = doc.data() as NPCArchetype;
    NPCS.push({
      name: doc.id,
      avatarURL: data.avatarURL ? data.avatarURL : 'Brak',
    });
  });
  return NPCS;
};

export const getSpecificNPC = async (name: string, folderName = 'main') => {
  if (!auth.currentUser?.email) return;
  let NPC;
  if (folderName !== 'main') {
    NPC = await getDoc(
      doc(
        db,
        'users',
        auth.currentUser.email,
        'folders',
        folderName,
        'files',
        name
      )
    );
  } else {
    NPC = await getDoc(doc(db, 'users', auth.currentUser.email, 'files', name));
  }
  return NPC;
};

//FOLDERS

export const getFolders = async () => {
  if (!auth.currentUser?.email) return;
  const filesSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.email, 'folders')
  );
  const folders: Folders[] = [];
  const foldersNames: string[] = [];
  filesSnapshot.forEach((snap) => {
    foldersNames.push(snap.data().name);
  });
  for (let i = 0; i < foldersNames.length; i++) {
    const NPCs: NPCWithAvatar[] = [];
    const files = await getDocs(
      collection(
        db,
        'users',
        auth.currentUser.email,
        'folders',
        foldersNames[i],
        'files'
      )
    );
    files.forEach((doc) => {
      const data = doc.data() as NPCArchetype;
      NPCs.push({
        name: doc.id,
        avatarURL: data.avatarURL ? data.avatarURL : 'Brak',
      });
    });
    folders.push({ name: foldersNames[i], files: NPCs });
  }
  return folders;
};

export const addNewFolder = async (name: string) => {
  if (!auth.currentUser?.email) return;
  setDoc(doc(db, 'users', auth.currentUser.email, 'folders', name), {
    name: name,
  })
    .then(() => {
      console.log('folder added to base');
      return null;
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

export const renameFolder = async (name: string, newName = 'test') => {
  await addNewFolder(newName);
  if (!auth.currentUser?.email) return;
  const filesSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.email, 'folders', name, 'files')
  );
  for (let i = 0; i < filesSnapshot.size; i++) {
    await getDoc(
      doc(
        db,
        'users',
        auth.currentUser.email,
        'folders',
        name,
        'files',
        filesSnapshot.docs[0].id
      )
    )
      .then((res: DocumentSnapshot<DocumentData>) => {
        if (!res.data()) return;
        const data = res.data()! as NPCArchetype;
        data.folder = newName;
        addEditNPC(data);
        return null;
      })
      .catch((err) => console.log(err));
  }
  await deleteFolder(name);
};
