import { useLocation } from 'react-router-dom';
import { Button } from '../../components/import';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Table } from '../../components/import';
import LabelStatus from '../../drafts/LabelStatus';

const CategoryManage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className='flex justify-between items-start'>
        <DashboardHeading title='Categories' desc='Manage your category' />
        <Button to={`${pathname}/add`}>New Category</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Fontend</td>
            <td>
              <LabelStatus type='success'>Approved</LabelStatus>
            </td>
            <td>
              <span className='text-gray-400'>Using</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
