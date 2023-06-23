import './App.css';
import Routing from './components/Routers/Routing';
import Toasty from './components/Notify/Toasty';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Routing />
        <Toasty></Toasty>
      </div>
    </AuthProvider>
  );
}

export default App;
