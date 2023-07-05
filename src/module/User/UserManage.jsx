import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button, LabelStatus, Table } from '../../components/import';
import { Remover, Update } from '../../components/action';

const UserManage = () => {
  const { pathname } = useLocation();
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();
  const handleChangeURL = (path) => {
    navigate(path);
  };

  const getUserInDB = async () => {
    const colRef = collection(db, 'users');
    onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUserList(users);
    });
  };

  useEffect(() => {
    getUserInDB();
  }, []);

  return (
    <>
      <div className='flex justify-between items-start'>
        <DashboardHeading title='Users' desc='Manage your user' />
        <Button to={`${pathname}/add`}>Add User</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id.slice(0, 10) + '...'}</td>
                <td>{user.username}</td>
                <td>
                  <span className='italic text-gray-500'>{user.email}</span>
                </td>
                <td>
                  <img
                    src='/src/assets/doraemon.jpg'
                    className='w-8 h-8 object-cover rounded-full'
                    alt={user.name}
                  />
                </td>
                <td>
                  <LabelStatus type='success'>Active</LabelStatus>
                </td>
                <td>
                  <div className='flex gap-5 text-gray-400'>
                    <Update
                      onClick={() =>
                        handleChangeURL(`/profile/${user.username}`)
                      }
                    />
                    <Remover />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserManage;
