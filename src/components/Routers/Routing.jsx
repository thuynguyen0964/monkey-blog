import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='signup' element={<SignUp />}></Route>
      <Route path='signin' element={<SignIn />}></Route>
    </Routes>
  );
};

export default Routing;
