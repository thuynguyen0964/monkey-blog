import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonStyles = styled.button`
  display: block;
  cursor: pointer;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.blue};

  :disabled {
    opacity: 0.5;
  }
`;

/**
 *
 * @param {string} children Type of children is any
 * @param {string} type Type of 'type' can 'submit' | 'button','reset'
 * @returns
 */

const Button = ({ type, children, isLoading, onClick, ...props }) => {
  return (
    <ButtonStyles type={type} {...props} onClick={onClick}>
      {isLoading ? 'Loading...' : children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
