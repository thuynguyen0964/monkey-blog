import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-left: auto;

  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  ${(props) =>
    props.color &&
    props.color === 'primary' &&
    css`
      color: ${(props) => props.theme.text};
      margin-left: 0;
    `};

  ${(props) =>
    props.color &&
    props.color === 'secondary' &&
    css`
      color: ${(props) => props.theme.gray6B};
      margin-left: 0;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({ date, author, color, className }) => {
  return (
    <PostMetaStyles color={color} className={className}>
      <span className='post-time'>{date}</span>
      <span className='post-dot'></span>
      <Link to={`profile/${author}`}>
        <span className='post-author hover:text-blue-500'>{author}</span>
      </Link>
    </PostMetaStyles>
  );
};

PostMeta.propTypes = {
  date: PropTypes.any,
  author: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default PostMeta;
