import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const PostImage = ({ className, url, alt, to }) => {
  if (to) {
    return (
      <PostImageStyles className={className}>
        <Link to={to}>
          <img src={url} alt={alt} loading='lazy' />
        </Link>
      </PostImageStyles>
    );
  }
  return (
    <PostImageStyles className={className}>
      <img src={url} alt={alt} loading='lazy' />
    </PostImageStyles>
  );
};

PostImage.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  url: PropTypes.string,
  to: PropTypes.string,
};

export default PostImage;
