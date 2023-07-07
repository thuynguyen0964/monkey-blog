import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;

const PostCategory = ({ children, type, className, ...props }) => {
  return (
    <PostCategoryStyles type={type} className={className} {...props}>
      {children}
    </PostCategoryStyles>
  );
};

PostCategory.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default PostCategory;
