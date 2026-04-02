import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDocFromServer } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { UserProgress } from '../types';

interface FirebaseContextType {
  user: User | null;
  isAuthReady: boolean;
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>;
  progress: UserProgress | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAuthReady: false,
  updateProgress: async () => {},
  progress: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // Test connection
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setProgress(docSnap.data() as UserProgress);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      });

      return () => unsubscribe();
    } else {
      setProgress(null);
    }
  }, [user, isAuthReady]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, updates, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, isAuthReady, updateProgress, progress }}>
      {children}
    </FirebaseContext.Provider>
  );
};
