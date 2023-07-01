import PropTypes from 'prop-types';

const DashboardHeading = ({ title, desc }) => {
  return (
    <div className='mb-10'>
      <h1 className='dashboard-heading'>{title}</h1>
      <p className='dashboard-short-desc'>{desc}</p>
    </div>
  );
};

DashboardHeading.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default DashboardHeading;
