import { useState } from 'react';
import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [accounts, setAccounts] = useState({});
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
