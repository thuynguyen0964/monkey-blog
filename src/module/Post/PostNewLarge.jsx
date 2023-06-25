import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      margin-bottom: 16px;
      height: 433px;
      width: auto;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <PostImage
        url='https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80'
        alt=''
        className='post-image'
      ></PostImage>
      <PostCategory type='primary' className='mb'>
        Kiến Thức
      </PostCategory>
      <PostTitle size='large' className='mb'>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta author='Thuy Nguyen' date='June 25' color='primary'></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
