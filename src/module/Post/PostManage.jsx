import Table from '../../components/Table/Table';
import { useEffect } from 'react';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button, toast } from '../../components/import';
import { Remover, Update, Views } from '../../components/action';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
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
import { fomatDate } from './PostFeature';
import { debounce } from 'lodash';
import { shortValue } from '../User/UserManage';
import avatar from '/src/assets/doraemon.jpg';
import { ITEM_PER_PAGE } from '../../utils/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filterValue, setFilterValues] = useState('');
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState({});
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const handleChangeURL = (path) => {
    navigate(path);
  };

  const handleSearchPost = debounce((e) => {
    setFilterValues(e.target.value);
  }, 1000);

  const getPostInDB = async () => {
    const colRef = collection(db, 'posts');
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
    const lastDoc = document.docs[document.docs.length - 1];

    onSnapshot(newColRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPostList(results);
      filterValue.length > 0 &&
        toast.success(`${results.length} posts was found`);
    });

    // set the last item of document
    setLastDoc(lastDoc);
  };

  useEffect(() => {
    getPostInDB();
  }, [filterValue]);

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'posts'),
      startAfter(lastDoc || 0),
      limit(ITEM_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPostList([...postList, ...results]);
    });
    const documents = await getDocs(nextRef);
    const lastDocItem = documents.docs[documents.docs.length - 1];
    setLastDoc(lastDocItem);
  };

  const handleDeletePost = (id) => {
    const singleDoc = doc(db, 'posts', id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteDoc(singleDoc);
        swal('Remove post successsfully!!', {
          icon: 'success',
        });
      }
    });
  };

  useEffect(() => {
    document.title = 'Manage Post';
  }, []);
  return (
    <>
      <div className='container nopadding'>
        <div className='flex items-center justify-between py-5'>
          <DashboardHeading
            title='All posts'
            desc='Manage all posts'
          ></DashboardHeading>
          <div className='w-full mr-5 max-w-[300px]'>
            <input
              type='text'
              onChange={handleSearchPost}
              className='w-full p-3 border border-gray-300 border-solid rounded-lg bg-slate-100 focus:bg-white'
              placeholder='Enter name to search...'
            />
          </div>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td data-tooltip-id='action' data-tooltip-content={post.id}>
                  {shortValue(post?.id, 8)}
                </td>
                <td>
                  <div className='flex items-center gap-x-3'>
                    <img
                      src={post.imageStore || avatar}
                      alt={post.author}
                      className='w-[66px] h-[55px] rounded object-cover'
                    />
                    <div className='flex-1'>
                      <h3
                        data-tooltip-id='action'
                        data-tooltip-content={post.title}
                        className='font-semibold'
                      >
                        {shortValue(post.title, 12)}
                      </h3>
                      <time className='text-sm text-gray-500'>
                        {fomatDate(post.createAt)}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-gray-500'>{post?.category?.name}</span>
                </td>
                <td>
                  <div className='flex items-center gap-2'>
                    <img
                      src={post?.user?.avatar || avatar}
                      className='w-10 h-10 rounded-full object-cover'
                      alt={post.author}
                    />
                    <span className='text-gray-500'>{post?.author}</span>
                  </div>
                </td>
                <td>
                  {/* Icon action */}
                  <div className='flex gap-5 text-gray-400'>
                    <Views
                      id='action'
                      content='View'
                      onClick={() => handleChangeURL(`/details/${post.slug}`)}
                    />
                    <Update
                      id='action'
                      content='Update'
                      onClick={() =>
                        handleChangeURL(`${pathname}/change?id=${post.id}`)
                      }
                    />
                    <Remover
                      id='action'
                      content='Remove'
                      onClick={() => handleDeletePost(post.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='mt-10'>
        <Button
          onClick={handleLoadMore}
          disabled={postList.length === total}
          className='mx-auto'
        >
          Load More
        </Button>
      </div>
      <Tooltip id='action' render={({ content }) => <span>{content}</span>} />
    </>
  );
};

export default PostManage;
