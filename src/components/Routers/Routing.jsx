import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../Pages/NotFound';
import DashboardLayout from '../../module/DashBoard/DashBoardLayout';
import PostAddNew from '../../module/Post/PostAddNews';
import PostUpdate from '../../module/Post/PostUpdate';

import CategoryUpdate from '../../module/Category/CategoryUpdate';
import CategoryAddNew from '../../module/Category/CategoryAddNews';

import UserAddNew from '../../module/User/UserAddNew';
import UserUpdate from '../../module/User/UserUpdate';
import Loading from '../../effect/Loading';

const Home = lazy(() => import('../Pages/Home'));
const SignUp = lazy(() => import('../Pages/SignUp'));
const SignIn = lazy(() => import('../Pages/SignIn'));
const CategoryPage = lazy(() => import('../Pages/CategoryPage'));
const Profile = lazy(() => import('../Pages/Profile'));
const Dashboard = lazy(() => import('../Pages/DashBoard'));
const PostDetails = lazy(() => import('../Pages/PostDetails'));

const CategoryManage = lazy(() =>
  import('../../module/Category/CategoryManage')
);
const UserManage = lazy(() => import('../../module/User/UserManage'));
const PostManage = lazy(() => import('../../module/Post/PostManage'));

const Routing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='*' element={<NotFound />} />
        <Route path='details/:slug' element={<PostDetails />} />
        <Route path='profile/:user' element={<Profile />} />

        <Route path='category/:name' element={<CategoryPage />} />

        <Route element={<DashboardLayout />}>
          <Route path='dashboard' element={<Dashboard />} />

          <Route path='manage/post' element={<PostManage />} />
          <Route path='manage/add' element={<PostAddNew />} />
          <Route path='manage/post/change' element={<PostUpdate />} />

          <Route path='manage/category' element={<CategoryManage />} />
          <Route path='manage/category/add' element={<CategoryAddNew />} />
          <Route path='manage/category/change' element={<CategoryUpdate />} />

          <Route path='manage/user' element={<UserManage />} />
          <Route path='manage/user/add' element={<UserAddNew />} />
          <Route path='manage/user/change' element={<UserUpdate />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
