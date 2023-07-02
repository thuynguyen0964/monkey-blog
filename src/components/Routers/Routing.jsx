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
import CategoryAddNew from '../../drafts/CategoryAddNews';
import UserAddNew from '../../drafts/UserAddNew';
import CategoryManage from '../../module/Category/CategoryManage';
import UserManage from '../../module/User/UserManage';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='signup' element={<SignUp />}></Route>
      <Route path='signin' element={<SignIn />}></Route>
      <Route path='*' element={<NotFound />}></Route>
      <Route path='/details/:slug' element={<PostDetails />}></Route>
      <Route path='/profile/:user' element={<Profile />}></Route>

      <Route element={<DashboardLayout />}>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='manage/post' element={<PostManage />}></Route>
        <Route path='manage/add' element={<PostAddNew />}></Route>

        <Route path='manage/category' element={<CategoryManage />}></Route>
        <Route path='manage/category/add' element={<CategoryAddNew />}></Route>

        <Route path='manage/user' element={<UserManage />}></Route>
        <Route path='manage/user/add' element={<UserAddNew />}></Route>
      </Route>
    </Routes>
  );
};

export default Routing;
