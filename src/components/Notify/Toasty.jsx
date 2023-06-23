import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Toasty = () => {
  return (
    <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme='light'
    />
  );
};

export default Toasty;
