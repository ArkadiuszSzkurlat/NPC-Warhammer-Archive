import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, creatUserWithEmail } from '../firebase';

const authContext = createContext<any | null>(null);

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
      return auth.currentUser;
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
      if (!user) return;
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
