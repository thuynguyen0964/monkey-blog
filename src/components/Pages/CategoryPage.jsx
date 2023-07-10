import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PostItem from '../../module/Post/PostItem';
import Heading from '../Layout/Heading';

const CategoryPage = () => {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  const getCategoryOfPost = async () => {
    const docRef = query(
      collection(db, 'posts'),
      where('category.slug', '==', name)
    );
    onSnapshot(docRef, (snapShot) => {
      const newArr = [];
      snapShot.forEach((doc) => {
        newArr.push({ id: doc.id, ...doc.data() });
      });
      setPosts(newArr);
    });
  };

  useEffect(() => {
    getCategoryOfPost();
  }, [name]);

  useEffect(() => {
    document.title = 'Category Pages';
  }, []);
  return (
    <Layout>
      <main className='mt-28'>
        <section className='container'>
          <Heading>
            Bài viết chủ đề <span className='text-black italic'>{name}</span>
          </Heading>
          <div className='grid-layout grid-layout--primary'>
            {posts.length > 0 &&
              posts.map((post) => (
                <PostItem key={post.id} post={post}></PostItem>
              ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CategoryPage;
