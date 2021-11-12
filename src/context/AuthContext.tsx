import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithEmail } from '../config/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({ user: null, loading: false });

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = process.env.REACT_APP_FIREBASE_EMAIL;
    const password = process.env.REACT_APP_FIREBASE_PASS;

    if (email && password) {
      signInWithEmail(email, password)
        .then(() => {
          onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error('Error signing in with email and password: ', error);
          setLoading(false);
        });
    } else {
      console.error('Email or password is not defined in environment variables');
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);