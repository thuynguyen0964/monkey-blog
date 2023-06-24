import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
const AuthContext = createContext();
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthProvider = (props) => {
  const [accounts, setAccounts] = useState({});
  const users = { accounts, setAccounts };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (users) {
        setAccounts(user);
      }
    });
  }, []);
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
