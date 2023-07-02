import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Table, LabelStatus } from '../../components/import';
import { Remover, Update, Views } from '../../components/action';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

const CategoryManage = () => {
  const { pathname } = useLocation();
  const [categoryList, setCategoryList] = useState([]);

  const getCategoriesInDB = () => {
    const results = [];
    const colRef = collection(db, 'categories');
    onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList(results);
    });
  };

  useEffect(() => {
    getCategoriesInDB();
  }, []);

  return (
    <>
      <div className='flex justify-between items-start gap-3'>
        <DashboardHeading title='Categories' desc='Manage your category' />
        <input
          type='text'
          className='input-global ml-auto'
          placeholder='Enter to search...'
        />
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
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <LabelStatus type='success'>{category.status}</LabelStatus>
                </td>
                <td>
                  <div className='flex gap-5 text-gray-400'>
                    <Views></Views>
                    <Update></Update>
                    <Remover></Remover>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
