import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div>
      <h1 className='dashboard-heading'>Dashboard page</h1>
    </div>
  );
};

export default Dashboard;
