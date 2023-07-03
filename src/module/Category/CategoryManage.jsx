import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Table, LabelStatus } from '../../components/import';
import { Remover, Update, Views } from '../../components/action';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import swal from 'sweetalert';

const CategoryManage = () => {
  const { pathname } = useLocation();
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();
  const handleChangePages = (path, id, name) => {
    navigate(`${pathname}/${path}?id=${id}&name=${name}`);
  };

  // realtime firestore must be in useEffect
  const getCategoriesInDB = () => {
    const colRef = collection(db, 'categories');
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList(results);
    });
  };

  const handleDelCategories = (id) => {
    const singleDoc = doc(db, 'categories', id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteDoc(singleDoc);
        swal('Remove cotegories successsfully!!', {
          icon: 'success',
        });
      }
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
            <th>Slug</th>
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
                  <span className='italic text-gray-500'>{category.slug}</span>
                </td>
                <td>
                  <LabelStatus type='success'>{category.status}</LabelStatus>
                </td>
                <td>
                  <div className='flex gap-5 text-gray-400'>
                    <Views></Views>
                    <Update
                      onClick={() =>
                        handleChangePages('change', category.id, category.name)
                      }
                    />
                    <Remover onClick={() => handleDelCategories(category.id)} />
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
