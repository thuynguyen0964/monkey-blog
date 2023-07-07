import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelStyle = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 500;
  cursor: pointer;
`;

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <LabelStyle htmlFor={htmlFor} className='label' {...props}>
      {children}
    </LabelStyle>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
