import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';
import PropTypes from 'prop-types';
import { fomatDate } from './PostFeature';

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

const PostNewest = ({ post }) => {
  return (
    <PostNewestItemStyles>
      <PostImage
        url={post.imageStore}
        alt={post.author}
        className='post-image'
      />
      <div className='post-content'>
        <PostCategory
          type='secondary'
          to={`/category/${post?.category?.slug}`}
          className='mb'
        >
          {post?.category?.name}
        </PostCategory>
        <PostTitle slug={post.slug} size='normal' className='mb'>
          {post.title}
        </PostTitle>
        <PostMeta
          author={post.author}
          date={fomatDate(post.createAt)}
          color='secondary'
        />
      </div>
    </PostNewestItemStyles>
  );
};

PostNewest.propTypes = {
  post: PropTypes.object,
};

export default PostNewest;
