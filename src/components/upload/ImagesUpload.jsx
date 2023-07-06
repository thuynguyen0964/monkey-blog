import PropTypes from 'prop-types';
import { Button } from '../import';

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
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full max-w-[500px] min-h-[200px] ${
        !image ? 'rounded-md' : ''
      } ${className} relative overflow-hidden`}
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
            className='max-w-[80px] mb-5'
          />
          <p className='font-semibold'>Choose photo</p>
        </div>
      )}
      {image && (
        <div className='flex flex-col gap-3'>
          <img
            src={image}
            className='w-full h-[350px] object-cover rounded-md'
            alt=''
          />
          <Button onClick={handleDeleteImg} type='button'>
            Remove
          </Button>
        </div>
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
