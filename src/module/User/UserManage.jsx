import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button, LabelStatus, Table } from '../../components/import';
import { Remover, Update } from '../../components/action';
import defaultImg from '/src/assets/doraemon.jpg';
import { UserProps } from '../../utils/constant';
import swal from 'sweetalert';

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

  const shortName = (string, index) => {
    if (typeof string !== 'string' || typeof index !== 'number') return;
    const newString = string.slice(0, index) + '...';
    return newString;
  };

  useEffect(() => {
    getUserInDB();
  }, []);

  const renderLabelStatus = (status) => {
    switch (status) {
      case UserProps.ACTIVE:
        return <LabelStatus type='success'>{UserProps.ACTIVE}</LabelStatus>;
      case UserProps.PENDING:
        return <LabelStatus type='warning'>{UserProps.PENDING}</LabelStatus>;
      case UserProps.BANNER:
        return <LabelStatus type='danger'>{UserProps.BANNER}</LabelStatus>;
      default:
        break;
    }
  };

  // delete users
  const handleDeleteUser = async (user) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteDoc(doc(db, 'users', user.id));
        swal('Remove user successsfully!!', {
          icon: 'success',
        });
      }
    });
  };

  return (
    <>
      <div className='flex justify-between items-start gap-3'>
        <DashboardHeading title='Users' desc='Manage your user' />
        <input
          type='text'
          className='input-global ml-auto'
          defaultValue=''
          placeholder='Enter to search...'
        />
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
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{shortName(user.id, 10)}</td>
                <td>{user.username}</td>
                <td title={user.email}>
                  <span className='italic text-gray-500'>
                    {shortName(user.email, 12)}
                  </span>
                </td>
                <td>
                  <img
                    src={user?.avatar || defaultImg}
                    className='w-8 h-8 object-cover rounded-full'
                    alt={user.name}
                  />
                </td>
                <td>{renderLabelStatus(user.status)}</td>
                <td>{user?.role}</td>
                <td>
                  <div className='flex gap-5 text-gray-400'>
                    <Update
                      onClick={() =>
                        handleChangeURL(`${pathname}/change?id=${user.id}`)
                      }
                    />
                    <Remover onClick={() => handleDeleteUser(user)} />
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
