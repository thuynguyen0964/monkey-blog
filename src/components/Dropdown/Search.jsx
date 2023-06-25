import PropTypes from 'prop-types';
import { useDropdown } from './Context';

const Search = ({ placeholder, ...props }) => {
  const { onChange } = useDropdown();
  return (
    <div className='p-2'>
      <input
        type='text'
        placeholder={placeholder}
        className='p-4 outline-none w-full border border-gray-200 rounded'
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
};

export default Search;
