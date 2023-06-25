import { useState } from 'react';
import { DropdownProvider } from './Context';
import PropTypes from 'prop-types';

const Dropdown = ({
  placeholder = 'Please select an option',
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  return (
    <DropdownProvider {...props}>
      <div className='relative inline-block w-[500px]'>
        <div
          className='flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium'
          onClick={handleToggleDropdown}
        >
          <span>{placeholder}</span>
          <span>
            {show ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 15l7-7 7 7'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            )}
          </span>
        </div>
        {show && (
          <div className='absolute top-full left-0 w-full bg-white shadow-sm'>
            {children}
          </div>
        )}
      </div>
    </DropdownProvider>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

export default Dropdown;
