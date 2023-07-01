import { useLocation } from 'react-router-dom';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button } from '../../components/import';

const UserManage = () => {
  const { pathname } = useLocation();
  return (
    <div className='flex justify-between items-start'>
      <DashboardHeading
        title='Users'
        desc='Manage your user'
      ></DashboardHeading>
      <Button to={`${pathname}/add`}>Add User</Button>
    </div>
  );
};

export default UserManage;
