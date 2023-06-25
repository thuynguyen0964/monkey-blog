import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostTitleaStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === 'normal' &&
    css`
      font-size: 16px;
    `};

  ${(props) =>
    props.size === 'large' &&
    css`
      font-size: 20px;
    `};
`;

const PostTitle = ({ children, className, size, ...props }) => {
  return (
    <Link to='/details/id' className='link'>
      <PostTitleaStyles size={size} className={className} {...props}>
        {children}
      </PostTitleaStyles>
    </Link>
  );
};

PostTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
};

export default PostTitle;
