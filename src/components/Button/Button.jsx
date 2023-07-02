import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonStyles = styled.button`
  display: block;
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

const Button = ({
  type,
  children,
  isLoading = false,
  to,
  onClick,
  className,
  ...props
}) => {
  if (to && typeof to === 'string') {
    return (
      <Link to={to} {...props} className={`btn-link ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <ButtonStyles
      type={type}
      {...props}
      onClick={onClick}
      className={className}
    >
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
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
