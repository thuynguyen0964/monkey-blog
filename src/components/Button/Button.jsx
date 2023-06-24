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

const Button = ({ type, children, isLoading, onClick, ...props }) => {
  return (
    <ButtonStyles type={type} {...props} onClick={onClick}>
      {isLoading ? 'Loading...' : children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
