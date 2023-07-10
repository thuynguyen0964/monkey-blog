import { useCallback, useEffect, useState } from 'react';
import Heading from '../../components/Layout/Heading';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const PostRelated = ({ categoryId }) => {
  const [postFinded, setPostFinded] = useState([]);

  const getPostById = useCallback(() => {
    const docRef = query(
      collection(db, 'posts'),
      where('categoryId', '==', categoryId)
    );
    onSnapshot(docRef, (snapShot) => {
      const results = [];
      snapShot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPostFinded(results);
    });
  }, [categoryId]);

  useEffect(() => {
    getPostById();
  }, [getPostById]);

  if (!categoryId) return;
  return (
    <>
      <Heading>Bài viết liên quan</Heading>
      <div className='grid-layout grid-layout--primary'>
        {postFinded.length > 0 &&
          postFinded.map((post) => (
            <PostItem key={post.id} post={post}></PostItem>
          ))}
      </div>
    </>
  );
};

PostRelated.propTypes = {
  categoryId: PropTypes.string,
};

export default PostRelated;
