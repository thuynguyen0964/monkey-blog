import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Button, Table, LabelStatus, toast } from '../../components/import';
import { Remover, Update, Views } from '../../components/action';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  query,
  where,
  getDocs,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import swal from 'sweetalert';
import { debounce } from 'lodash';
import { ITEM_PER_PAGE, roleUser } from '../../utils/constant';
import { Tooltip } from 'react-tooltip';
import { useAuthCtx } from '../../context/AuthContext';

const CategoryManage = () => {
  const { pathname } = useLocation();
  const [categoryList, setCategoryList] = useState([]);
  const [filterValue, setFilterValues] = useState('');
  const [lastDoc, setLastDoc] = useState({});
  const [total, setTotal] = useState(0);

  const handleFilter = debounce((e) => {
    setFilterValues(e.target.value);
  }, 1000);

  // change pathname
  const navigate = useNavigate();
  const handleChangePages = (path, id, name) => {
    navigate(`${pathname}/${path}?id=${id}&name=${name}`);
  };

  // realtime firestore must be in useEffect
  const getCategoriesInDB = async () => {
    const colRef = collection(db, 'categories');
    const newColRef = filterValue
      ? query(
          colRef,
          where('slug', '>=', filterValue),
          where('slug', '<=', filterValue + 'utf8')
        )
      : query(colRef, limit(ITEM_PER_PAGE));
    onSnapshot(colRef, (snapshot) => {
      setTotal(snapshot.size);
    });

    // get the document -> get the last item of document
    const document = await getDocs(newColRef);
    const lastDocItem = document.docs[document.docs.length - 1];

    onSnapshot(newColRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList(results);
      filterValue && toast.success(`${results.length} categories was found`);
    });

    // set the last item of documents
    setLastDoc(lastDocItem);
  };

  // paginate firebase
  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'categories'),
      startAfter(lastDoc || 0),
      limit(ITEM_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documents = await getDocs(nextRef);
    const lastDocItem = documents.docs[documents.docs.length - 1];
    setLastDoc(lastDocItem);
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
  }, [filterValue]);

  const { accounts } = useAuthCtx();
  const isAdmin = accounts?.role === roleUser.ADMIN;

  return (
    <>
      {isAdmin ? (
        <Fragment>
          <div className='flex items-start justify-between gap-3'>
            <DashboardHeading title='Categories' desc='Manage your category' />
            <input
              type='text'
              className='ml-auto input-global'
              onChange={handleFilter}
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
                      <span className='italic text-gray-500'>
                        {category.slug}
                      </span>
                    </td>
                    <td>
                      <LabelStatus type='success'>
                        {category.status}
                      </LabelStatus>
                    </td>
                    <td>
                      <div className='flex gap-5 text-gray-400'>
                        <Views id='action' content='Details' />
                        <Update
                          id='action'
                          content='Update'
                          onClick={() =>
                            handleChangePages(
                              'change',
                              category.id,
                              category.name
                            )
                          }
                        />
                        <Remover
                          id='action'
                          content='Remove'
                          onClick={() => handleDelCategories(category.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className='mt-8'>
            <Button
              disabled={categoryList.length === total}
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
        </Fragment>
      ) : (
        <DashboardHeading title="You don't have permisson in here" />
      )}
    </>
  );
};

export default CategoryManage;
