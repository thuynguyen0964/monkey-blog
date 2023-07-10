import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostCategory from './components/PostCategory';
import PostTitle from './components/PostTitle';
import PostMeta from './components/PostMeta';
import PostImage from './components/PostImage';
import { fomatDate } from './PostFeature';
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      margin-bottom: 16px;
      height: 433px;
      width: auto;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({ post }) => {
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={post.imageStore}
        alt={post.author}
        className='post-image'
      />
      <PostCategory
        type='primary'
        to={`/category/${post?.category?.slug}`}
        className='mb'
      >
        {post.category?.name}
      </PostCategory>
      <PostTitle slug={post.slug} size='large' className='mb'>
        {post.title}
      </PostTitle>
      <PostMeta
        author={post.author}
        date={fomatDate(post.createAt)}
        color='primary'
      />
    </PostNewestLargeStyles>
  );
};

PostNewestLarge.propTypes = {
  post: PropTypes.object,
};

export default PostNewestLarge;
