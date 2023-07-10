import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';
import PropTypes from 'prop-types';
import { fomatDate } from './PostFeature';

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

const PostItem = ({ post }) => {
  return (
    <PostItemStyles>
      <PostImage
        to={`/details/${post.slug}`}
        url={post.imageStore}
        className='post-image'
      ></PostImage>
      <PostCategory
        type='primary'
        to={`/category/${post.category?.slug}`}
        className='mb'
      >
        {post.category?.name}
      </PostCategory>
      <PostTitle slug={post.slug} size='large' className='mb'>
        {post?.title}
      </PostTitle>
      <PostMeta
        color='primary'
        author={post.author}
        date={fomatDate(post.createAt)}
      />
    </PostItemStyles>
  );
};

PostItem.propTypes = {
  post: PropTypes.object,
};

export default PostItem;
