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
      // ── DEBUG ──
      if (currentUser) {
        console.log('[FirebaseContext] Auth state: signed in', {
          uid: currentUser.uid,
          email: currentUser.email,
          isAnonymous: currentUser.isAnonymous,
          provider: currentUser.providerData.map(p => p.providerId),
        });
      } else {
        console.log('[FirebaseContext] Auth state: signed out — Firestore writes will be skipped for user-owned docs');
      }
      // ──────────
      setUser(currentUser);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    if (user) {
      const docRef = doc(db, 'users', user.uid);
      console.log(`[FirebaseContext] Subscribing to Firestore: users/${user.uid}`);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        // ── DEBUG ──
        console.log(`[FirebaseContext] onSnapshot fired for users/${user.uid}`, {
          exists: docSnap.exists(),
          dataKeys: docSnap.exists() ? Object.keys(docSnap.data()) : 'none',
        });
        // ──────────
        if (docSnap.exists()) {
          setProgress(docSnap.data() as UserProgress);
        }
      }, (error) => {
        console.error(`[FirebaseContext] onSnapshot error for users/${user.uid}`, error);
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      });

      return () => unsubscribe();
    } else {
      setProgress(null);
    }
  }, [user, isAuthReady]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.warn('[FirebaseContext] updateProgress called but no authenticated user — write skipped');
      return;
    }
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      console.log(`[FirebaseContext] WRITE → users/${currentUser.uid}`, { keys: Object.keys(updates) });
      await setDoc(docRef, updates, { merge: true });
      console.log(`[FirebaseContext] WRITE ✓ users/${currentUser.uid} success`);
    } catch (error) {
      console.error(`[FirebaseContext] WRITE ✗ users/${currentUser.uid} failed`, error);
      handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, isAuthReady, updateProgress, progress }}>
      {children}
    </FirebaseContext.Provider>
  );
};
