import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DropdownContext = createContext();
function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  const valuesExport = { show, setShow, handleToggleDropdown };
  return (
    <DropdownContext.Provider value={valuesExport}>
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
