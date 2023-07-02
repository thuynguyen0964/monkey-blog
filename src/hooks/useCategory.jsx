import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

function useCategories(setCategoryList) {
  const newArr = [];
  const colRef = collection(db, 'categories');
  onSnapshot(colRef, (snapshot) => {
    snapshot.forEach((doc) => {
      newArr.push({ id: doc.id, ...doc.data() });
    });
    setCategoryList(newArr);
  });
}

export { useCategories };
