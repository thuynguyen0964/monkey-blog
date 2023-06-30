import styled from 'styled-components';
import PropTypes from 'prop-types';

import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      mix-blend-mode: multiply;
      opacity: 0.6;
      background-color: rgba(0, 0, 0, 0.75);
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 5;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeature = ({ post }) => {
  const { title, imageStore, author, category, id } = post;
  return (
    <PostFeatureItemStyles>
      <img src={imageStore} alt={title} className='post-image' />
      <div className='post-overlay'></div>
      <div className='post-content'>
        <div className='post-top'>
          <PostCategory>{category}</PostCategory>
          <PostMeta author={author} date='June 25'></PostMeta>
        </div>
        <PostTitle postId={id} size='large'>
          {title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

PostFeature.propTypes = {
  post: PropTypes.object,
};

export default PostFeature;
