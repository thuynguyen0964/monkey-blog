import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';
import NotFound from '../Pages/NotFound';
import PostDetails from '../Pages/PostDetails';
import DashboardLayout from '../../module/DashBoard/DashBoardLayout';
import Dashboard from '../Pages/DashBoard';
import PostManage from '../../module/Post/PostManage';
import PostAddNew from '../../module/Post/PostAddNews';
import Profile from '../Pages/Profile';
import CategoryManage from '../../module/Category/CategoryManage';
import UserManage from '../../module/User/UserManage';
import CategoryUpdate from '../../module/Category/CategoryUpdate';
import CategoryAddNew from '../../module/Category/CategoryAddNews';
import UserAddNew from '../../module/User/UserAddNew';
import UserUpdate from '../../module/User/UserUpdate';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='*' element={<NotFound />} />
      <Route path='details/:slug' element={<PostDetails />} />
      <Route path='profile/:user' element={<Profile />} />

      <Route element={<DashboardLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='manage/post' element={<PostManage />} />
        <Route path='manage/add' element={<PostAddNew />} />

        <Route path='manage/category' element={<CategoryManage />} />
        <Route path='manage/category/add' element={<CategoryAddNew />} />
        <Route path='manage/category/change' element={<CategoryUpdate />} />

        <Route path='manage/user' element={<UserManage />} />
        <Route path='manage/user/add' element={<UserAddNew />} />
        <Route path='manage/user/change' element={<UserUpdate />} />
      </Route>
    </Routes>
  );
};

export default Routing;
