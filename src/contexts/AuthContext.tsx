import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, creatUserWithEmail } from '../firebase';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const authContext = createContext<any>({} as any);

export const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    creatUserWithEmail(email.toLowerCase(), password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log(auth.currentUser);
    });
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const deleteAccount = (currentUser: any) => {
    return currentUser.delete();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    deleteAccount,
  };

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
};

export default AuthProvider;
