import styled from 'styled-components';
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
const PostFeature = () => {
  return (
    <PostFeatureItemStyles>
      <img
        src='https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80'
        alt='unsplash'
        className='post-image'
      />
      <div className='post-overlay'></div>
      <div className='post-content'>
        <div className='post-top'>
          <PostCategory>Kiến Thức</PostCategory>
          <PostMeta author='Thuy Nguyen' date='June 25'></PostMeta>
        </div>
        <PostTitle size='large'>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeature;
