import PropTypes from 'prop-types';
import { Fragment } from 'react';

const ImagesUpload = (props) => {
  const {
    name,
    className,
    progress,
    image,
    onChange,
    handleDeleteImg,
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer w-[400px] flex items-center justify-center border border-dashed 
      min-h-[250px] rounded-lg ${className} relative overflow-hidden group`}
    >
      <input
        type='file'
        name={name}
        className='hidden-input'
        onChange={onChange}
        {...rest}
      />
      {!image && (
        <div className='flex flex-col items-center text-center pointer-events-none'>
          <img
            src={'/src/assets/bg.jpg'}
            alt='preview'
            className='max-w-[100px] mb-5'
          />
          <p className='font-semibold'>Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img src={image} className='object-cover w-full h-full' alt='' />
          <button
            type='button'
            className='absolute z-10 flex items-center justify-center invisible w-20 h-20 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible'
            onClick={handleDeleteImg}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className='absolute w-0 h-1.5 bg-green-400 bottom-0 left-0 transition-all image-upload-progress'
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

ImagesUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
  onChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
};

export default ImagesUpload;
