import styled from 'styled-components';
import PostNewestLarge from '../Post/PostNewLarge';
import PostNewest from '../Post/PostNewest';
import Heading from '../../components/Layout/Heading';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 30px;
    margin-bottom: 40px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);

  const getPostsLastest = async () => {
    const colRef = query(collection(db, 'posts'), where('large', '==', true));
    onSnapshot(colRef, (snapShot) => {
      const newArr = [];
      snapShot.forEach((doc) => {
        newArr.push({ id: doc.id, ...doc.data() });
      });

      setPosts(newArr);
    });
  };

  useEffect(() => {
    getPostsLastest();
  }, []);

  return (
    <HomeNewestStyles className='home-block'>
      <div className='container'>
        <Heading>Mới nhất</Heading>
        <section className='layout'>
          {posts.length > 0 &&
            posts.map((post) => <PostNewestLarge key={post.id} post={post} />)}
          <div className='sidebar'>
            <PostNewest></PostNewest>
            <PostNewest></PostNewest>
            <PostNewest></PostNewest>
          </div>
        </section>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
