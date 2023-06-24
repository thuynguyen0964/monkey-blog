import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Button, toast } from '../import';

const Home = () => {
  const handleSignOut = () => {
    signOut(auth);
    toast.success('Sign out successfully');
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default Home;
