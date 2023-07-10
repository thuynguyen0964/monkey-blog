import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button, LabelStatus, Table, toast } from '../../components/import';
import { Remover, Update } from '../../components/action';
import defaultImg from '/src/assets/doraemon.jpg';
import { ITEM_PER_PAGE, UserProps, roleUser } from '../../utils/constant';
import swal from 'sweetalert';
import { debounce } from 'lodash';
import { Tooltip } from 'react-tooltip';
import { useAuthCtx } from '../../context/AuthContext';

export const shortValue = (string, index) => {
  if (typeof string !== 'string' || typeof index !== 'number') return;
  const newString = string.slice(0, index) + '...';
  return newString;
};

const UserManage = () => {
  const { pathname } = useLocation();
  const [userList, setUserList] = useState([]);
  const [filterValue, setFilterValues] = useState('');
  const [lastUser, setLastUser] = useState({});
  const [totalUser, setTotalUser] = useState(0);

  const navigate = useNavigate();
  const handleChangeURL = (path) => {
    navigate(path);
  };

  const handleFilter = debounce((e) => {
    setFilterValues(e.target.value);
  }, 1000);

  const getUserInDB = async () => {
    const colRef = collection(db, 'users');
    const colRefFilted = filterValue
      ? query(
          colRef,
          where('email', '>=', filterValue),
          where('email', '<=', filterValue + 'utf8')
        )
      : query(colRef, limit(ITEM_PER_PAGE));

    onSnapshot(colRef, (snapshot) => {
      setTotalUser(snapshot.size);
    });

    // get the last user until call api
    const document = await getDocs(colRefFilted);
    const lastDoc = document.docs[document.docs.length - 1];
    setLastUser(lastDoc);

    onSnapshot(colRefFilted, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUserList(users);
      filterValue && toast.success(`${users.length} userd was found`);
    });
  };

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'users'),
      startAfter(lastUser || 0),
      limit(ITEM_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUserList([...users, ...userList]);
    });

    const document = await getDocs(nextRef);
    const lastDoc = document.docs[document.docs.length - 1];
    setLastUser(lastDoc);
  };

  useEffect(() => {
    getUserInDB();
  }, [filterValue]);

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

  const { accounts } = useAuthCtx();
  const isAdmin = accounts?.role !== roleUser.ADMIN;

  return (
    <>
      {isAdmin ? (
        <DashboardHeading title="You don't have permisson in here" />
      ) : (
        <>
          <div className='flex items-start justify-between gap-3'>
            <DashboardHeading title='Users' desc='Manage your user' />
            <input
              type='text'
              className='ml-auto input-global'
              placeholder='Enter email to search...'
              onChange={handleFilter}
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
                    <td data-tooltip-id='action' data-tooltip-content={user.id}>
                      {shortValue(user.id, 10)}
                    </td>
                    <td>{user.username}</td>
                    <td
                      data-tooltip-id='action'
                      data-tooltip-content={user.email}
                    >
                      <span className='italic text-gray-500'>
                        {shortValue(user.email, 12)}
                      </span>
                    </td>
                    <td>
                      <img
                        src={user?.avatar || defaultImg}
                        className='object-cover w-8 h-8 rounded-full'
                        alt={user.name}
                      />
                    </td>
                    <td>{renderLabelStatus(user.status)}</td>
                    <td>{user?.role}</td>
                    <td>
                      <div className='flex gap-5 text-gray-400'>
                        <Update
                          id='action'
                          content='Update'
                          disabled={user?.role === roleUser.ADMIN}
                          onClick={() =>
                            handleChangeURL(`${pathname}/change?id=${user.id}`)
                          }
                        />
                        <Remover
                          id='action'
                          content='Remove'
                          disabled={user?.role === roleUser.ADMIN}
                          onClick={() => handleDeleteUser(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className='mt-8'>
            <Button
              disabled={userList.length === totalUser}
              onClick={handleLoadMore}
              className='mx-auto'
            >
              Load More
            </Button>
          </div>
          <Tooltip
            id='action'
            render={({ content }) => <span>{content}</span>}
          />
        </>
      )}
    </>
  );
};

export default UserManage;
