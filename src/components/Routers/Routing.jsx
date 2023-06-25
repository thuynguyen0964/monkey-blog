import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';
import NotFound from '../Pages/NotFound';
import PostDetails from '../Pages/PostDetails';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='signup' element={<SignUp />}></Route>
      <Route path='signin' element={<SignIn />}></Route>
      <Route path='*' element={<NotFound />}></Route>
      <Route path='/details/:id' element={<PostDetails />}></Route>
    </Routes>
  );
};

export default Routing;
