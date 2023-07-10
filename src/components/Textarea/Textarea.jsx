import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useController } from 'react-hook-form';

const InputStyles = styled.div`
  position: relative;
  max-width: 100%;
  .textarea {
    width: 600px;
    padding: ${(props) => (props.hasIcon ? '16px 60px 16px 16px' : '16px')};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    font-size: 17px;
    border: 2px solid transparent;
  }
`;

const Textarea = ({
  name,
  placeholder,
  // eslint-disable-next-line react/prop-types
  control,
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
    <InputStyles>
      <textarea
        className={`textarea ${className} read-only:cursor-not-allowed`}
        id={name}
        readOnly={read}
        placeholder={placeholder}
        {...field}
        {...props}
      ></textarea>
    </InputStyles>
  );
};

Textarea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  hasIcon: PropTypes.bool,
  className: PropTypes.string,
  read: PropTypes.bool,
};

export { Textarea };
