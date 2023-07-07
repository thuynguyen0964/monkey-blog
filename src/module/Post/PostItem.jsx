import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post-image {
    height: 202px;
    margin-bottom: 20px;
    width: 100%;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = () => {
  return (
    <PostItemStyles>
      <PostImage
        to='/details/id'
        url='https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80'
        alt='setup'
        className='post-image'
      ></PostImage>
      <PostCategory type='primary' className='mb'>
        Kiến thức
      </PostCategory>
      <PostTitle size='large' className='mb'>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta color='primary' author='Thuy Nguyen' date='June 25'></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
