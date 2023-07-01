import PropTypes from 'prop-types';

const FieldCheck = ({ children }) => {
  return <div className='flex flex-wrap gap-5'>{children}</div>;
};

FieldCheck.propTypes = {
  children: PropTypes.node,
};

export default FieldCheck;
