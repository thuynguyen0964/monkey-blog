import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = query(
          collection(db, 'users'),
          where('email', '==', user.email)
        );
        onSnapshot(colRef, (snapShot) => {
          snapShot.forEach((doc) => {
            setAccounts({ ...user, ...doc.data() });
          });
        });
      } else {
        setAccounts({});
      }
    });
  }, []);

  const users = { accounts, setAccounts };
  return <AuthContext.Provider {...props} value={users}></AuthContext.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (context === 'undefined') {
    toast.warn('Invalid auth value');
  }
  return context;
};

export default AuthProvider;
