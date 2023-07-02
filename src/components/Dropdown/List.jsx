import PropTypes from 'prop-types';
import { useDropdown } from './Context';

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className='absolute top-full left-0 w-full bg-white shadow-lg z-10'>
          {children}
        </div>
      )}
    </>
  );
};

List.propTypes = { children: PropTypes.node };

export default List;
