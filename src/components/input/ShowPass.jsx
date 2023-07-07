import React, { useState } from 'react';
import Input from './Input';
import { EyeClose, EyeIcon } from '../Icon';

// eslint-disable-next-line react/prop-types
const ShowPass = ({ control, className }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <React.Fragment>
      <Input
        type={showPass ? 'text' : 'password'}
        name='password'
        placeholder='Enter your password...'
        control={control}
        className={className}
      >
        {showPass ? (
          <EyeIcon className='eye' onClick={() => setShowPass(false)}></EyeIcon>
        ) : (
          <EyeClose
            className='eye'
            onClick={() => setShowPass(true)}
          ></EyeClose>
        )}
      </Input>
    </React.Fragment>
  );
};

export default ShowPass;
