import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAHyG5rYNFe6mrIH7c4akvSfh_r58Mikp4',
  authDomain: 'monkey-blog-c2645.firebaseapp.com',
  projectId: 'monkey-blog-c2645',
  storageBucket: 'monkey-blog-c2645.appspot.com',
  messagingSenderId: '553969015689',
  appId: '1:553969015689:web:57c1cad5be3ea21dff5f58',
  measurementId: 'G-ZY9WWBBVXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
