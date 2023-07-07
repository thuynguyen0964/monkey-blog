import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  &-content {
    flex: 1;
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
const PostNewest = () => {
  return (
    <PostNewestItemStyles>
      <PostImage
        url='https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2294&amp;q=80'
        alt='setup'
        className='post-image'
      ></PostImage>
      <div className='post-content'>
        <PostCategory type='secondary' className='mb'>
          Kiến Thức
        </PostCategory>
        <PostTitle size='normal' className='mb'>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta
          author='Thuy Nguyen'
          date='June 25'
          color='secondary'
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewest;
