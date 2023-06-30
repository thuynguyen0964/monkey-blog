import styled from 'styled-components';
import PostFeature from '../Post/PostFeature';
import Heading from '../../components/Layout/Heading';
import { useEffect, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);

  const renderPosts = () => {
    const postRef = collection(db, 'posts');
    const results = query(postRef, where('hot', '==', true), limit(3));
    onSnapshot(results, (snapShot) => {
      const postValues = [];
      snapShot.forEach((item) => {
        postValues.push({ id: item.id, ...item.data() });
      });
      setPosts(postValues);
    });
  };

  useEffect(() => {
    renderPosts();
  }, []);

  return (
    <HomeFeatureStyles className='home-block'>
      <div className='container'>
        <Heading>Bài viết nổi bật</Heading>
        <div className='grid-layout'>
          {posts.length > 0 &&
            posts.map((post) => (
              <PostFeature key={post.id} post={post}></PostFeature>
            ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
