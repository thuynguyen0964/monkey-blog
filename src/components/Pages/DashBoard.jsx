import { useEffect } from 'react';
import DashboardHeading from '../../module/DashBoard/DashBoardHeading';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div>
      <DashboardHeading
        title='Dashboard'
        desc='Overview dashboard monitor'
      ></DashboardHeading>
    </div>
  );
};

export default Dashboard;
