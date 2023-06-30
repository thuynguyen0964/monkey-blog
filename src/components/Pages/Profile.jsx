import { useParams } from 'react-router-dom';

const Profile = () => {
  const { user } = useParams();
  return (
    <>
      <h1>This is Profile Page of {user}</h1>
    </>
  );
};

export default Profile;
