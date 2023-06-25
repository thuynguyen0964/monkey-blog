import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useController } from 'react-hook-form';

const InputStyles = styled.div`
  position: relative;
  max-width: 100%;
  .input {
    width: 600px;
    padding: ${(props) => (props.hasIcon ? '16px 60px 16px 16px' : '16px')};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    font-size: 17px;
    border: 2px solid transparent;
    :focus {
      background-color: #fff;
      border-color: #2cccff;
    }
  }
  .eye {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

// eslint-disable-next-line react/prop-types
const Input = ({ name, placeholder, control, children, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <InputStyles hasIcon={children ? true : false}>
      <input
        className='input'
        id={name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {children}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  hasIcon: PropTypes.bool,
  children: PropTypes.node,
};

export default Input;
