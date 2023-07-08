import PropTypes from 'prop-types';

const Views = ({ onClick, disabled, id, content }) => {
  return (
    <button
      data-tooltip-id={id}
      data-tooltip-content={content}
      className={`flex items-center text-black justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer ${
        disabled &&
        'disabled:bg-red-300 disabled:text-white disabled:cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
        />
      </svg>
    </button>
  );
};

Views.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  content: PropTypes.string,
};

export default Views;
