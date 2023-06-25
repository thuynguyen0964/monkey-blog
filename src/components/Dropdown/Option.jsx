import { useDropdown } from './Context';
import PropTypes from 'prop-types';

const Option = ({ children }) => {
  const { onClick } = useDropdown();
  return (
    <div
      className='px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Option.propTypes = {
  children: PropTypes.node,
};
export default Option;
