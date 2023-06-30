import { DropdownProvider } from './Context';
import PropTypes from 'prop-types';

const Dropdown = ({ children }) => {
  return (
    <DropdownProvider>
      <div className='relative inline-block w-[500px]'>{children}</div>
    </DropdownProvider>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

export default Dropdown;
