import PropTypes from 'prop-types';

const FieldCheck = ({ children, className = '' }) => {
  return <div className={`flex flex-wrap gap-5 ${className}`}>{children}</div>;
};

FieldCheck.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FieldCheck;
