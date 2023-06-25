import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const DropdownContext = createContext();
function DropdownProvider(props) {
  return (
    <DropdownContext.Provider value={props}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === 'undefined')
    throw new Error('useDropdown must be used within DropdownProvider');
  return context;
}

DropdownProvider.propTypes = {
  children: PropTypes.node,
};
export { useDropdown, DropdownProvider };
