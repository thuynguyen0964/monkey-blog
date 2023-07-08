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
  }
  .eye {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name,
  placeholder,
  // eslint-disable-next-line react/prop-types
  control,
  children,
  className,
  read,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <InputStyles hasIcon={children ? true : false}>
      <input
        className={`input ${className} read-only:cursor-not-allowed`}
        id={name}
        readOnly={read}
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
  className: PropTypes.string,
  read: PropTypes.bool,
};

export default Input;
