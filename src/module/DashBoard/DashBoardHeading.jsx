import PropTypes from 'prop-types';

const DashboardHeading = ({
  title,
  desc,
  classNameofH1 = '',
  classNameofP = '',
}) => {
  return (
    <div className='mb-10'>
      <h1 className={`dashboard-heading ${classNameofH1}`}>{title}</h1>
      <p className={`dashboard-short-desc ${classNameofP}`}>{desc}</p>
    </div>
  );
};

DashboardHeading.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  classNameofH1: PropTypes.string,
  classNameofP: PropTypes.string,
};

export default DashboardHeading;
