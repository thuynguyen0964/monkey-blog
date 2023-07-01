import { useLocation } from 'react-router-dom';
import { Button } from '../../components/import';
import DashboardHeading from '../DashBoard/DashBoardHeading';

const CategoryManage = () => {
  const { pathname } = useLocation();
  return (
    <div className='flex justify-between items-start'>
      <DashboardHeading
        title='Categories'
        desc='Manage your category'
      ></DashboardHeading>
      <Button to={`${pathname}/add`}>New Category</Button>
    </div>
  );
};

export default CategoryManage;
